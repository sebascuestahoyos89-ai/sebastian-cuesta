import { NextResponse } from "next/server";

// Never log submitted messages or server credentials.
export const runtime = "nodejs";

const TYPES = new Set([
  "research_collaboration",
  "scientific_consultancy",
  "industry_partnership",
  "speaking_invitation",
  "other",
]);
const LABELS: Record<string, string> = {
  research_collaboration: "Research Collaboration",
  scientific_consultancy: "Scientific Consultancy",
  industry_partnership: "Industry Partnership",
  speaking_invitation: "Speaking Invitation",
  other: "Other",
};

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

function field(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string" || value.length > maxLength * 2) return null;
  const text = value.trim();
  return text.length <= maxLength ? text : null;
}

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
    process.env.TURNSTILE_SECRET_KEY &&
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM_EMAIL &&
    process.env.CONTACT_TO_EMAILS,
  );
}

export async function POST(request: Request) {
  if (!configured()) {
    return response("The form is temporarily unavailable. Please use the email links.", 503);
  }

  const requestOrigin = request.headers.get("origin");
  const allowedHosts = (
    process.env.CONTACT_ALLOWED_HOSTNAMES || "sebastiancuesta.com,www.sebastiancuesta.com"
  )
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  // Trust only this deployment's Vercel-provided hostname in Preview.
  // Turnstile must independently allow the same exact hostname.
  const previewHost = process.env.VERCEL_URL?.toLowerCase();
  if (
    process.env.VERCEL_ENV === "preview" &&
    previewHost &&
    /^[a-z0-9-]+\.vercel\.app$/.test(previewHost)
  ) {
    allowedHosts.push(previewHost);
  }
  const allowedOrigins = new Set(allowedHosts.map((host) => `https://${host}`));
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }
  if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
    return response("Invalid request origin.", 403);
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 32_000) return response("Message is too long.", 413);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return response("Expected JSON form details.", 415);
  }

  let data: Record<string, unknown>;
  try {
    // Bound actual bytes too: Content-Length may be missing or untrusted.
    const reader = request.body?.getReader();
    if (!reader) return response("Invalid request data.", 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32_000) {
        await reader.cancel();
        return response("Message is too long.", 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return response("Invalid form details.", 400);
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return response("Invalid request data.", 400);
  }

  // Never report success for discarded submissions.
  if (data.website) return response("Invalid form details.", 400);

  const name = field(data.name, 120);
  const email = field(data.email, 254);
  const organization = field(data.organization ?? "", 150);
  const enquiryType = field(data.enquiryType, 50);
  const message = field(data.message, 5000);
  const token = field(data.turnstileToken, 2048);

  if (
    !name ||
    name.length < 2 ||
    !email ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    /[\r\n]/.test(email) ||
    organization === null ||
    !enquiryType ||
    !TYPES.has(enquiryType) ||
    !message ||
    message.length < 10 ||
    !token
  ) {
    return response("Please check the form fields and security verification.", 400);
  }

  try {
    // Cloudflare Turnstile tokens are one-use and must be checked server-side.
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!verifyRes.ok) return response("Security verification unavailable. Please try again.", 503);
    const verification: { success?: boolean; hostname?: string; action?: string } =
      await verifyRes.json();
    if (
      verification.success !== true ||
      verification.action !== "contact" ||
      !verification.hostname ||
      !allowedHosts.includes(verification.hostname.toLowerCase())
    ) {
      return response("Security verification failed or expired. Please try again.", 400);
    }

    const recipients = (process.env.CONTACT_TO_EMAILS || "").split(",").map((addr) => addr.trim());
    if (
      recipients.length !== 2 ||
      new Set(recipients.map((addr) => addr.toLowerCase())).size !== 2 ||
      !recipients.every((addr) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(addr)) ||
      !recipients.some((addr) => addr.toLowerCase() === "sebastian.cuestahoyos@manchester.ac.uk")
    ) {
      return response("The contact form is not configured correctly.", 503);
    }

    const emailText = [
      `New enquiry: ${LABELS[enquiryType]}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Organisation: ${organization || "Not provided"}`,
      `Type: ${LABELS[enquiryType]}`,
      "",
      "Message:",
      message,
    ].join("\n");
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: recipients,
        reply_to: email,
        subject: `[Sebastian Cuesta website] ${LABELS[enquiryType]}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!resendRes.ok) {
      console.error("Contact delivery failed with provider status", resendRes.status);
      return response("We could not send your message. Please email directly.", 502);
    }
    const sent: { id?: string } = await resendRes.json();
    if (typeof sent.id !== "string" || !sent.id.trim())
      return response("Message delivery could not be confirmed. Please email directly.", 502);
    return response("Your message has been sent successfully.", 200);
  } catch {
    console.error("Contact form service is temporarily unavailable");
    return response("Service unavailable. Please email directly.", 503);
  }
}

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import Module from "node:module";
import ts from "typescript";

// Exercise the real route without a running Next server or external deliveries.
const routePath = new URL("../app/api/contact/route.ts", import.meta.url).pathname.replace(
  /^\/(\w:)/,
  "$1",
);
const compiled = ts.transpileModule(readFileSync(routePath, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const route = new Module(routePath);
route.filename = routePath;
route.paths = createRequire(import.meta.url).resolve.paths("next/server");
route._compile(compiled, routePath);
const { POST } = route.exports;
const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
let calls;
const valid = {
  name: "Test Visitor",
  email: "visitor@example.org",
  organization: "Test Lab",
  enquiryType: "research_collaboration",
  message: "I would like to discuss a collaboration.",
  turnstileToken: "test-token",
  website: "",
};
beforeEach(() => {
  Object.assign(process.env, {
    NEXT_PUBLIC_CONTACT_FORM_ENABLED: "true",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site",
    TURNSTILE_SECRET_KEY: "test-secret",
    RESEND_API_KEY: "test-key",
    CONTACT_FROM_EMAIL: "Website <hello@example.org>",
    CONTACT_TO_EMAILS: "sebastian.cuestahoyos@manchester.ac.uk,private@example.org",
    CONTACT_ALLOWED_HOSTNAMES: "sebastiancuesta.com",
    NODE_ENV: "production",
  });
  calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options, body: JSON.parse(options.body) });
    return Response.json(
      url.includes("siteverify")
        ? { success: true, hostname: "sebastiancuesta.com", action: "contact" }
        : { id: "accepted-message" },
    );
  };
});
afterEach(() => {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
});
function request(data = valid, headers = {}) {
  return new Request("https://sebastiancuesta.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://sebastiancuesta.com",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
}
test("disabled or missing credentials fails closed without external calls", async () => {
  for (const key of [
    "NEXT_PUBLIC_CONTACT_FORM_ENABLED",
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_SECRET_KEY",
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAILS",
  ]) {
    const saved = process.env[key];
    delete process.env[key];
    assert.equal((await POST(request())).status, 503);
    process.env[key] = saved;
  }
  assert.equal(calls.length, 0);
});
test("requires trusted origin and JSON", async () => {
  assert.equal((await POST(request(valid, { origin: "https://evil.example" }))).status, 403);
  const missing = request();
  missing.headers.delete("origin");
  assert.equal((await POST(missing)).status, 403);
  assert.equal((await POST(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal(calls.length, 0);
});
test("validates fields, malformed payloads and honeypot without false success", async () => {
  for (const data of [
    null,
    [],
    "{",
    { ...valid, name: "x" },
    { ...valid, email: "invalid" },
    { ...valid, email: "a@example.org\r\nBcc:x@example.org" },
    { ...valid, enquiryType: "invalid" },
    { ...valid, message: "short" },
    { ...valid, message: "x".repeat(5001) },
    { ...valid, organization: 123 },
    { ...valid, turnstileToken: "" },
    { ...valid, website: "bot" },
  ]) {
    assert.equal((await POST(request(data))).status, 400);
  }
  assert.equal(calls.length, 0);
});
test("bounds actual request bytes even without Content-Length", async () => {
  assert.equal((await POST(request("x".repeat(32001)))).status, 413);
  assert.equal((await POST(request(valid, { "content-length": "32001" }))).status, 413);
  assert.equal(calls.length, 0);
});
test("rejects failed, expired, wrong-action and wrong-host Turnstile tokens", async () => {
  for (const verification of [
    { success: false },
    { success: "true", hostname: "sebastiancuesta.com", action: "contact" },
    { success: true, hostname: "evil.example", action: "contact" },
    { success: true, hostname: "sebastiancuesta.com", action: "other" },
  ]) {
    globalThis.fetch = async () => Response.json(verification);
    assert.equal((await POST(request())).status, 400);
  }
});
test("requires both distinct configured recipients, including Manchester", async () => {
  for (const recipients of [
    "private@example.org",
    "sebastian.cuestahoyos@manchester.ac.uk,invalid",
    "private@example.org,other@example.org",
    "sebastian.cuestahoyos@manchester.ac.uk,sebastian.cuestahoyos@manchester.ac.uk",
  ]) {
    process.env.CONTACT_TO_EMAILS = recipients;
    assert.equal((await POST(request())).status, 503);
    assert.ok(calls.every((call) => call.url.includes("siteverify")));
  }
});
test("sends to both recipients with visitor Reply-To only after server verification", async () => {
  const res = await POST(request());
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(calls.length, 2);
  assert.ok(calls[0].url.includes("siteverify"));
  assert.equal(calls[0].body.secret, "test-secret");
  assert.deepEqual(calls[1].body.to, [
    "sebastian.cuestahoyos@manchester.ac.uk",
    "private@example.org",
  ]);
  assert.equal(calls[1].body.reply_to, valid.email);
  assert.ok(!JSON.stringify(await res.json()).includes("private@example.org"));
});
test("provider rejection, malformed response and network failures never report success", async () => {
  for (const reply of [
    () => Response.json({ error: "rejected" }, { status: 422 }),
    () => Response.json({}),
    () => Response.json({ id: 123 }),
    () => new Response("not json"),
    () => {
      throw new Error("timeout");
    },
  ]) {
    globalThis.fetch = async (url) =>
      url.includes("siteverify")
        ? Response.json({ success: true, hostname: "sebastiancuesta.com", action: "contact" })
        : reply();
    assert.ok((await POST(request())).status >= 500);
  }
});
test("Turnstile outage never contacts Resend", async () => {
  let count = 0;
  globalThis.fetch = async () => {
    count++;
    return new Response("unavailable", { status: 503 });
  };
  assert.equal((await POST(request())).status, 503);
  assert.equal(count, 1);
});
test("configured preview hostname works for origin and verification", async () => {
  process.env.CONTACT_ALLOWED_HOSTNAMES = "preview.example.org";
  globalThis.fetch = async (url) =>
    Response.json(
      url.includes("siteverify")
        ? { success: true, hostname: "preview.example.org", action: "contact" }
        : { id: "accepted" },
    );
  assert.equal((await POST(request(valid, { origin: "https://preview.example.org" }))).status, 200);
});

test("trusts only its exact Vercel deployment hostname and only in Preview", async () => {
  process.env.VERCEL_URL = "website-test-team.vercel.app";
  process.env.VERCEL_ENV = "preview";
  globalThis.fetch = async (url) => Response.json(url.includes("siteverify")
    ? { success: true, hostname: process.env.VERCEL_URL, action: "contact" }
    : { id: "accepted" });
  const previewRequest = () => request(valid, { origin: "https://website-test-team.vercel.app" });
  assert.equal((await POST(previewRequest())).status, 200);
  assert.equal((await POST(request(valid, { origin: "https://other-team.vercel.app" }))).status, 403);
  process.env.VERCEL_ENV = "production";
  assert.equal((await POST(previewRequest())).status, 403);
  process.env.VERCEL_ENV = "preview";
  process.env.VERCEL_URL = "website-test-team.vercel.app/invalid";
  assert.equal((await POST(previewRequest())).status, 403);
});

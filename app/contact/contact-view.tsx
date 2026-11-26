"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { Mail, Linkedin, GraduationCap, BadgeCheck, Download, Send } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { AnchorButton } from "@/components/site/buttons";
import { profile } from "@/content/site";
import { useLang } from "@/lib/i18n";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const messages = {
  en: {
    organization: "Organisation (optional)",
    type: "Enquiry type",
    choose: "Select the type of enquiry",
    verify: "Complete the security verification before sending.",
    privacy: "Your details will be used only to respond to your enquiry.",
    sending: "Sending…",
    success: "Thank you! Your message was sent successfully.",
    error: "We couldn't send your message. Please try again or email me directly.",
    securityError: "Security verification could not load. Please reload or email me directly.",
    securityLabel: "Security verification",
    unavailable:
      "For research collaborations or consultancy enquiries, please use the email address shown on this page.",
    types: [
      ["research_collaboration", "Research collaboration"],
      ["scientific_consultancy", "Scientific consultancy"],
      ["industry_partnership", "Industry partnership"],
      ["speaking_invitation", "Speaking invitation"],
      ["other", "Other"],
    ],
  },
  es: {
    organization: "Organización (opcional)",
    type: "Tipo de consulta",
    choose: "Selecciona el tipo de consulta",
    verify: "Completa la verificación de seguridad antes de enviar.",
    privacy: "Tus datos se utilizarán únicamente para responder a tu consulta.",
    sending: "Enviando…",
    success: "¡Gracias! Tu mensaje se envió correctamente.",
    error: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbeme por correo.",
    securityError:
      "No se pudo cargar la verificación de seguridad. Recarga la página o escríbeme por correo.",
    securityLabel: "Verificación de seguridad",
    unavailable:
      "Para colaboraciones científicas o consultorías, utiliza el correo electrónico que aparece en esta página.",
    types: [
      ["research_collaboration", "Colaboración científica"],
      ["scientific_consultancy", "Consultoría científica"],
      ["industry_partnership", "Colaboración con la industria"],
      ["speaking_invitation", "Invitación como ponente"],
      ["other", "Otro"],
    ],
  },
} as const;

const enabled =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true" &&
  Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export function ContactView() {
  const { lang, content } = useLang();
  const t = content.ui.contact;
  const m = messages[lang];
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [securityError, setSecurityError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || sent || !scriptReady || !window.turnstile || !widgetRef.current) return;
    if (widgetId.current) return;
    const id = window.turnstile.render(widgetRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      action: "contact",
      appearance: "always",
      language: lang,
      callback: (value: string) => {
        setToken(value);
        setSecurityError(false);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setSecurityError(true);
      },
    });
    widgetId.current = id;
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
        setToken("");
      }
    };
  }, [scriptReady, lang, sent]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !token) {
      setError(m.verify);
      return;
    }
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organization: data.get("organization"),
          enquiryType: data.get("enquiryType"),
          message: data.get("message"),
          website: data.get("website"),
          turnstileToken: token,
        }),
      });
      if (!res.ok) throw new Error("delivery failed");
      setSent(true);
      form.reset();
    } catch {
      setError(m.error);
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={<p>{t.intro}</p>} />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-foreground">{t.directContact}</h2>
              <div className="mt-3 space-y-2">
                {profile.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" /> {email}
                  </a>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <AnchorButton href={profile.links.linkedin} variant="outline">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </AnchorButton>
                <AnchorButton href={profile.links.scholar} variant="outline">
                  <GraduationCap className="h-4 w-4" /> Google Scholar
                </AnchorButton>
                <AnchorButton href={profile.links.orcid} variant="outline">
                  <BadgeCheck className="h-4 w-4" /> ORCID
                </AnchorButton>
                <AnchorButton href={lang === "es" ? profile.links.cvEs : profile.links.cv}>
                  <Download className="h-4 w-4" /> {content.ui.common.downloadCv}
                </AnchorButton>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">{t.sendMessage}</h2>
            {!enabled ? (
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{m.unavailable}</p>
            ) : sent ? (
              <p
                className="mt-6 rounded-lg bg-secondary/60 p-4 text-sm text-foreground"
                role="status"
              >
                {m.success}
              </p>
            ) : (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onReady={() => setScriptReady(true)}
                  onError={() => setSecurityError(true)}
                />
                <form onSubmit={submit} aria-busy={busy} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="font-medium text-foreground">{t.name}</span>
                      <input
                        required
                        minLength={2}
                        maxLength={120}
                        name="name"
                        autoComplete="name"
                        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-foreground">{t.email}</span>
                      <input
                        required
                        type="email"
                        maxLength={254}
                        name="email"
                        autoComplete="email"
                        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                      />
                    </label>
                  </div>
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">{m.organization}</span>
                    <input
                      maxLength={150}
                      name="organization"
                      autoComplete="organization"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">{m.type}</span>
                    <select
                      required
                      name="enquiryType"
                      defaultValue=""
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    >
                      <option value="" disabled>
                        {m.choose}
                      </option>
                      {m.types.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">{t.message}</span>
                    <textarea
                      required
                      minLength={10}
                      maxLength={5000}
                      name="message"
                      rows={5}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  {/* Honeypot field: hidden from human users, not relied upon as sole protection. */}
                  <label className="absolute -left-[9999px]" aria-hidden="true">
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <p className="text-xs leading-relaxed text-muted-foreground">{m.privacy}</p>
                  <div ref={widgetRef} aria-label={m.securityLabel} />
                  {securityError && (
                    <p role="alert" className="text-sm text-red-600">
                      {m.securityError}
                    </p>
                  )}
                  {error && (
                    <p role="alert" className="text-sm text-red-600">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={busy || !token}
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> {busy ? m.sending : t.send}
                  </button>
                </form>
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

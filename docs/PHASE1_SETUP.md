# Phase 1 configuration and release

The form defaults to disabled. The website continues to offer the public University
of Manchester email. No secrets or private recipients belong in browser code.

## Vercel variables

Set these in **sebastian-cuesta → Settings → Environment Variables**, selecting
the intended environment. Configure and test Preview before enabling Production.

| Variable                           | Value                                                                                                             | Visibility          |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------- |
| `RESEND_API_KEY`                   | Resend sending API key for the verified domain                                                                    | Secret, server only |
| `CONTACT_FROM_EMAIL`               | `Sebastian Website <contact@mail.sebastiancuesta.com>` after sending-domain verification                           | Server only         |
| `CONTACT_TO_EMAILS`                | Exactly two distinct addresses, comma separated: `sebastian.cuestahoyos@manchester.ac.uk` and your personal inbox | Secret, server only |
| `TURNSTILE_SECRET_KEY`             | Secret for the matching Turnstile widget                                                                          | Secret, server only |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`   | Public site key for that widget                                                                                   | Public              |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | `false` until configured; `true` for the controlled Preview acceptance test                                       | Public              |
| `CONTACT_ALLOWED_HOSTNAMES`        | `sebastiancuesta.com,www.sebastiancuesta.com`; add the exact preview hostname for Preview tests                   | Server only         |

Preserve `NEXT_PUBLIC_SITE_URL=https://sebastiancuesta.com` and existing domain
redirect settings. Public variables are embedded at build time, so changing them
requires a new deployment of the selected environment.

## Necessary external actions

1. In [Resend Domains](https://resend.com/domains), inspect or add
   `mail.sebastiancuesta.com` with sending enabled and receiving disabled.
   Obtain the actual verification records from Resend; do not infer their values.
   Inspect the Cloudflare zone first, then add only missing records required for
   this sending subdomain with DNS-only settings. The owner authorized these
   additions. Stop for approval before altering or removing any existing record.
   Preserve website records and all existing email reception/routing.
2. Create a **Managed Turnstile widget** in Cloudflare for both production
   hostnames. For Preview, also allow the exact preview hostname and include it in
   `CONTACT_ALLOWED_HOSTNAMES`. Use the matching site/secret key pair.
3. Add the variables above directly in Vercel. Keep the personal recipient and
   credentials out of Git, screenshots, PRs and chat. Start with the enable flag
   `false` in Production and ordinary Preview deployments.
4. On a controlled Preview deployment with working credentials, set the flag to
   `true`, rebuild Preview, then submit an English and Spanish enquiry. Confirm
   both inboxes receive each message, including Spam folders, and Reply goes to
   the visitor. Resend acceptance does not by itself prove inbox delivery.
5. Check expired/failed Turnstile and delivery failures; these must never display
   success. Disable the flag again if any acceptance test fails.
6. Obtain final owner approval before merging to `main` or deploying Production.
   Pushing `main` automatically deploys this project. Production activation is a
   separate decision after real delivery tests pass.

## Controlled Preview

The Vercel bot reported the feature branch deployment Ready on 19 October 2026:
[Phase 1 Preview](https://sebastian-cuesta-git-feature-website-phase1-sebascuesta.vercel.app).
This deployment status does not establish that the contact services are configured.

Scope all seven contact variables to **Preview → feature/website-phase1**.
Use the exact hostname
`sebastian-cuesta-git-feature-website-phase1-sebascuesta.vercel.app` in both
Turnstile and `CONTACT_ALLOWED_HOSTNAMES`, alongside `sebastiancuesta.com` and
`www.sebastiancuesta.com` for the requested widget configuration. Do not allow
all `vercel.app` hostnames. Keep Production variables and deployment settings
unchanged; the enabled flag must remain false there.

Use a Resend sending-only key restricted to `mail.sebastiancuesta.com` for the
application. If API setup is used, separate temporary management credentials
from the application key. Limit Cloudflare DNS credentials to Zone Read and
DNS Edit on `sebastiancuesta.com`, and Turnstile credentials to Turnstile Sites
Write on the required account. Avoid account-wide settings permissions.
Store all credentials directly in authorized service settings or a local secret
store; never in this guide, PR comments, chat or committed files.

References: [Resend API-key restrictions](https://resend.com/docs/api-reference/api-keys/create-api-key),
[Cloudflare Turnstile API permissions](https://developers.cloudflare.com/turnstile/get-started/widget-management/api/),
and [Cloudflare scoped API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

The connector initially returned HTTP 403 under the `sebascuesta` scope.
On 19 October 2026, the owner signed into the official dashboards, enabling
browser access to the correct Vercel project. The sender, hostname allowlist and
disabled flag were saved only for Preview on `feature/website-phase1`.
Production settings remain unchanged. See [service status](PHASE1_SERVICE_STATUS.md)
for verified progress and outstanding access/configuration steps.

## Implementation and validation

- `/api/contact` validates bounded JSON, trusted origins, field sizes, enquiry
  categories, a honeypot, and server-side Turnstile hostname/action verification.
- Resend receives exactly both configured recipients and the visitor as
  `reply_to`. Only a successful response containing a message ID permits success.
- English and Spanish form messages include loading, errors and security-script
  failure handling. Tokens reset after failed submissions; language changes
  recreate the widget in the selected language.
- All CV links select the supplied English/Spanish PDFs. Both two-page PDFs were
  parsed, rendered and visually reviewed; only Manchester email is public.
- Scientific Notes stays at `/notes` with `noindex, nofollow`; it is absent from
  navigation and the sitemap.
- Existing canonical URL/domain-audit edits in `.env.example`, `app/layout.tsx`,
  `app/robots.ts` and `app/sitemap.ts` were preserved. Redirect rules are unchanged.
- `npm test` exercises the actual route with mocked Cloudflare/Resend calls.
  It sends no email. `npm run typecheck` checks TypeScript.
- The installed dependencies were sufficient; no dependency changes were needed.
  This environment lacks npm, so the equivalent commands were run directly:
  `node node_modules/next/dist/bin/next build`,
  `node node_modules/typescript/bin/tsc --noEmit`, and
  `node --test tests/*.test.mjs`.
- Browser checks cover EN/ES CV links, public email, desktop/mobile navigation,
  disabled form/API, and the enabled UI with mocked Turnstile and API responses.
  These mocks are confined to the local test browser and are not shipped.

Protocol references: [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email)
and [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## Changed files

`app/api/contact/route.ts`, `app/contact/contact-view.tsx`, `app/home-view.tsx`,
`app/notes/page.tsx`, `app/sitemap.ts`, `src/components/site/Header.tsx`,
`src/components/site/Footer.tsx`, `src/content/site.ts`, `src/lib/i18n.tsx`,
`.env.example`, `.gitignore`, `.gitattributes`, `package.json`, `tests/contact.test.mjs`, this guide,
and both `public/sebastian-cuesta-cv-{en,es}.pdf` files. The invalid
`public/cv-placeholder.pdf` was removed. Existing edits in `app/layout.tsx` and
`app/robots.ts` are retained in the feature branch.

# Phase 1 configuration and release

The form defaults to disabled. The website continues to offer the public University
of Manchester email. No secrets or private recipients belong in browser code.

## Vercel variables

Set these in **sebastian-cuesta → Settings → Environment Variables**, selecting
the intended environment. Configure and test Preview before enabling Production.

| Variable                           | Value                                                                                                             | Visibility          |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------- |
| `RESEND_API_KEY`                   | Resend sending API key for the verified domain                                                                    | Secret, server only |
| `CONTACT_FROM_EMAIL`               | Verified sender, for example `Sebastian Website <hello@sebastiancuesta.com>`                                      | Server only         |
| `CONTACT_TO_EMAILS`                | Exactly two distinct addresses, comma separated: `sebastian.cuestahoyos@manchester.ac.uk` and your personal inbox | Secret, server only |
| `TURNSTILE_SECRET_KEY`             | Secret for the matching Turnstile widget                                                                          | Secret, server only |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`   | Public site key for that widget                                                                                   | Public              |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | `false` until configured; `true` for the controlled Preview acceptance test                                       | Public              |
| `CONTACT_ALLOWED_HOSTNAMES`        | `sebastiancuesta.com,www.sebastiancuesta.com`; add the exact preview hostname for Preview tests                   | Server only         |

Preserve `NEXT_PUBLIC_SITE_URL=https://sebastiancuesta.com` and existing domain
redirect settings. Public variables are embedded at build time, so changing them
requires a new deployment of the selected environment.

## Necessary external actions

1. In [Resend Domains](https://resend.com/domains), add a domain you control and
   obtain its verification records. Review the exact record type, name and value
   before making any Cloudflare DNS change. Do not replace existing university,
   website or mail DNS records. DNS modifications require the owner's approval.
   Use the verified domain as sender, not Manchester's domain.
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

The current connector can list the project but returns HTTP 403 when reading its
configuration under the `sebascuesta` scope. No Vercel environment writes or DNS
changes were made. An account with project access must perform the setup above
or grant the connector appropriate access.

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

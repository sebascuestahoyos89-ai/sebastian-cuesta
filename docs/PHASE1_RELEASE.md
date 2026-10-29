# Phase 1 release preparation — 29 October 2026

## Current decision

Do not merge or deploy yet. The owner authorized release preparation while the
final Preview inbox-placement retest is blocked by network filtering. No
Production secret writes were applied. Approval review initially rejected the
disabled configuration write; the owner subsequently gave explicit final approval
for the four Config variables below, which were saved and read back successfully.
The enable flag is `false`. Production contact activation needs a separate
explicit decision. No merge or Production deployment was requested or performed.

## Reviewed release

- Repository: `sebascuestahoyos89-ai/sebastian-cuesta`.
- Draft PR: https://github.com/sebascuestahoyos89-ai/sebastian-cuesta/pull/1
- Branch: `feature/website-phase1`; reviewed application commit:
  `b822ac9e7d5e9633629b32e8e5e12fd03e7ee7cb`.
- PR was open, draft, unmerged and mergeable when inspected. Vercel's status
  check passed. There is no claim of a separate GitHub test workflow passing.
- Eleven mocked contact-route tests and TypeScript passed; Vercel built the
  application successfully. Invalid/expired Turnstile and provider failure
  paths are mocked tests, not induced live provider outages.
- The endpoint accepts only the exact system-provided `VERCEL_URL` in Preview,
  in addition to explicitly configured hostnames. Production does not gain this
  allowance. Cloudflare must independently allow the exact Preview hostname.
- Real English and Spanish submissions previously reached both recipients;
  sender and visitor Reply-To were checked. The personal copies went to Spam.
  A safe-sender change is not proof of general inbox placement.

## Remaining acceptance check

Test deployment: https://sebastian-cuesta-1djc8zbxm-sebascuesta.vercel.app/contact

This deployment is Ready, and an owner-approved authenticated Vercel fetch
returned HTTP 200. Its exact hostname was added to the Managed Turnstile widget;
the widget now has four exact hosts and pre-clearance remains off. A temporary
earlier deployment hostname added during diagnosis was removed again.

Local DNS returned `landing.soc.ja.net` / `193.63.72.83`, causing a certificate
name mismatch. The owner reported that IT confirmed Microsoft misclassification,
requested review, and added a manual allow lasting 30 days. A subsequent local
check still returned the block-page address. Do not bypass the warning, change
resolvers, weaken deployment protection, or modify website DNS to evade it.
The authenticated diagnostic may have created an owner-approved temporary share
link lasting up to 23 hours; do not publish it.

Once normal HTTPS access is restored:

1. Send a clearly labelled final inbox-placement test through the real Preview
   form, completing human verification normally.
2. Check the UI response and Resend acceptance/delivery events. Confirm both
   recipients, verified sender, and visitor Reply-To without recording private
   recipient details in the repository.
3. Have the owner confirm actual receipt and Inbox versus Spam placement.
   Investigate failures before release. Successful provider acceptance alone
   must not be reported as confirmed inbox delivery.
4. Verify both language forms still render correctly on the final release code.
   Any application change after acceptance needs appropriate revalidation.

## Production configuration — four Config values saved; Secrets pending

Target only `sebascuesta/sebastian-cuesta`, project
`prj_uYuBAB4XrpTlRGcQlEUirmMvU9OO`. Preserve `NEXT_PUBLIC_SITE_URL`.

| Variable | Proposed value/source | Type |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | `false` during preparation | Config |
| `CONTACT_FROM_EMAIL` | `Sebastian Website <contact@mail.sebastiancuesta.com>` | Config |
| `CONTACT_ALLOWED_HOSTNAMES` | `sebastiancuesta.com,www.sebastiancuesta.com` | Config |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Existing Managed widget's public key, already allowing both production hosts | Config |
| `TURNSTILE_SECRET_KEY` | Matching existing widget secret, transferred directly through authorized settings | Secret |
| `RESEND_API_KEY` | Separate sending-only Production key restricted to `mail.sebastiancuesta.com` | Secret |
| `CONTACT_TO_EMAILS` | Exactly the two owner-approved recipients, entered securely in Vercel | Secret |

The four Config rows were saved for Production only on 29 October and verified
by reading each value back, including the exact `false` enable flag. The three
Secret rows remain pending; existing Preview credentials were not read or changed.

Production and Preview Secrets cannot be retrieved with `vercel env pull`.
Do not print, commit, screenshot, or store credential values or private recipient
addresses in this checklist. Do not rotate the existing Turnstile secret just to
prepare Production. If account access is unavailable, have the owner sign in
directly. Credential creation through browser UI requires action-time consent.

## Deployment procedure — after acceptance and release approval

1. Recheck PR head, main, mergeability, Vercel status, and exact team/project.
   Record the then-current Production deployment as the rollback target.
2. Confirm all seven Production variables exist and the flag is `false`.
   Confirm Preview branch overrides remain scoped to the feature branch.
3. Obtain explicit release approval, then merge PR #1 into main. The existing
   Git integration deploys main automatically; do not create a second release
   or promote a Preview build incidentally.
4. Verify the resulting Production deployment is Ready at the merged commit.
   Check normal HTTPS, homepage, About, Projects, Contact, both CV files,
   locale switching, public contact links, sitemap/robots and existing redirects.
   Contact form must remain absent and the endpoint fail closed while disabled.
5. After separate activation approval, change only the Production enable flag to
   `true` and rebuild Production (public variables are embedded at build time).
6. Test English and Spanish via the real Production forms and verify both
   inboxes, Reply-To, and honest error handling. Record outcomes without secrets.

## Rollback

Baseline inspected on 29 October:

- Deployment `dpl_BmuUNVPhjXVm11oAedxuaN7QTwKT` (Ready, rollback candidate).
- Main commit `1f1823cbcfa804379450b738530101d4ca82a401`.
- https://vercel.com/sebascuesta/sebastian-cuesta/BmuUNVPhjXVm11oAedxuaN7QTwKT

Recheck that this is still the prior working Production deployment before release.
For a contact-only incident, set the Production flag to `false` and rebuild;
the public Manchester email remains available. An env edit alone does not remove
an already built client form. For a wider regression, use Vercel rollback to the
recorded previous Production deployment after authorization; do not change DNS,
redirects, domain assignments, or firewall rules. Vercel rollback can stop later
deployments from automatically taking over, so verify the promotion state before
the next approved release. Rolling back a deployment does not revert saved envs.

## Public baseline checks

On 29 October, `/`, `/about`, `/projects`, `/contact`, `/robots.txt`, and
`/sitemap.xml` all returned HTTP 200 with normal certificate validation. The live
contact page still references the old CV placeholder and an older personal mail
link. These are pre-existing Production issues addressed in the feature branch,
not evidence that Phase 1 has been deployed. Earlier Preview checks verified
the locale-specific CVs and Manchester-only public contact details.

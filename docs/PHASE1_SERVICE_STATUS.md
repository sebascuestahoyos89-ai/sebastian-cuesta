# Phase 1 external service status — updated 29 October 2026

This is a configuration progress record, not production approval.

See [release preparation](PHASE1_RELEASE.md) for the current reviewed commit,
eleven-test result, resolved Vercel connector access, network-filtering blocker,
pending Production configuration, and deployment/rollback procedure.

## Resend

- Created `mail.sebastiancuesta.com` in Ireland (`eu-west-1`).
- Sending is enabled; Resend reports the domain and all three required records **Verified**.
- Receiving is disabled. No reception or routing settings were changed.
- Prepared sender: `Sebastian Website <contact@mail.sebastiancuesta.com>`.
- A sending-only application key restricted to this domain was created with
  owner approval and transferred directly to the feature Preview Vercel Secret.

The official dashboard supplied these required records, relative to the existing
`sebastiancuesta.com` zone. All three were added on 27 October after inspecting
the existing records and finding no conflicts. Both original website CNAMEs are
unchanged. Stop for owner approval before any existing record is changed or removed.

| Type | Name | Content | Proxy | TTL |
| --- | --- | --- | --- | --- |
| TXT | `resend._domainkey.mail` | Public DKIM value below | DNS only | Auto |
| CNAME | `rsend.mail` | `rsend-euw1.forge.rmta.net` | DNS only | Auto |
| CNAME | `send.mail` | `send.forge.rmta.net` | DNS only | Auto |

The DKIM value is a **public DNS verification value**, not an API credential:

```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6ryIn8aORNZ7TSGb6/gxUFmwPSh6xSZdxPAxuAtOwg5oXySeu0ePauAGJZQ45Pd4qGQhu9bGh/klrZAKw9pGXfeE7cE1CfJrWgz9OtokdPL+RKvQYxW9wlugnp52syk+nrbBhhvvDyP6Umsls3HrzoNXQ9AIPbuHgCVtbkIo5fQIDAQAB
```

Resend also displayed an optional root `_dmarc` suggestion. It is outside the
required additive sending-subdomain records and has not been added or changed.
Recheck the current domain dashboard before applying these records.

## Cloudflare

- Public authoritative nameservers are `alan.ns.cloudflare.com` and
  `ligia.ns.cloudflare.com`.
- The owner supplied access to the second Cloudflare account; the active zone
  was located and its two existing website CNAMEs were inspected.
- Added only the three DNS-only verification records listed above. No zone,
  nameserver, existing DNS, firewall or routing configuration was changed.
- The domain-owning account denies Turnstile access. The widget is prepared in
  the owner's accessible personal Cloudflare account instead; Turnstile can run
  independently of DNS-zone hosting.
- Managed Turnstile widget was created with owner approval. Its
  hostnames are the two production hostnames and the exact Preview hostname below.
  Pre-clearance remains off.

## Vercel

- Correct dashboard project: `sebascuesta/sebastian-cuesta`.
- The owner authorized connector team access on 29 October. Deployment and
  environment metadata inspection now succeeds for the correct team/project.
- Browser sign-in provides authorized project access.
- Saved only for **Preview → feature/website-phase1**:
  `CONTACT_FROM_EMAIL`, `CONTACT_ALLOWED_HOSTNAMES`, and
  `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` for the controlled acceptance test.
- `CONTACT_TO_EMAILS` is saved as a Secret only for the same feature Preview,
  containing exactly the Manchester address and the owner-specified private
  recipient. No private address is recorded here or in website source.
- `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are saved as Secrets for that
  branch only. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is saved as public Config for
  the same branch. No credential or private recipient is committed.
- Existing `NEXT_PUBLIC_SITE_URL`, Production environment, domain assignments and
  redirect settings are unchanged.

The exact deployment hostname
`sebastian-cuesta-1djc8zbxm-sebascuesta.vercel.app` was also added to Turnstile
for the final retest. Managed mode and pre-clearance off are preserved.

## Preview and acceptance

[Existing feature Preview](https://sebastian-cuesta-git-feature-website-phase1-sebascuesta.vercel.app)
was reported Ready by Vercel for commit `7699cff`. This does not establish real
email delivery. Rebuild the same feature Preview after configuration changes.
The authenticated live Preview was checked in English and Spanish: the contact
form is absent while disabled, both languages show the Manchester contact, and
all three Spanish contact-page CV links point to the Spanish PDF.

Exact allowed Preview hostname:
`sebastian-cuesta-git-feature-website-phase1-sebascuesta.vercel.app`.

The controlled Preview build for commit `8ec74f6` passed. A real English form
submission passed live Turnstile verification and returned the success UI.
Resend message `01a17e2d-c5fd-76e9-98d3-87a8910593de` records **Delivered** for
both configured recipients, with Reply-To set to the visitor's Manchester
address. The sender is the verified `contact@mail.sebastiancuesta.com` address.

The real Spanish form submission also passed live Turnstile verification and
returned its Spanish success UI. Resend message
`01a17e38-34a2-7034-b9af-deb424ef08d3` records **Delivered** for both recipients,
with the same verified sender and the visitor's address as Reply-To.

On 27 October, the owner confirmed receipt of both messages in both accounts.
The personal mailbox classified them as Spam; successful delivery is confirmed,
but personal-mailbox inbox placement still needs improvement and a follow-up
test. No additional DMARC/DNS change has been approved or applied.
Provider delivery events alone are not proof of inbox placement. The ten
mocked route tests cover validation, expired/invalid tokens and provider failure
handling. An unauthenticated direct Preview API probe returned HTTP 401 and was
stopped; deployment protection was not changed. Never enable Production or
merge `main` without final owner approval.

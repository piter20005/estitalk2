# EstiTalk

Next.js 15 App Router front-end for the EstiTalk podcast, content managed in Sanity CMS, deployed to Netlify.

## Stack

- **Next.js 15** (App Router, Server Components, SSG + ISR)
- **Sanity.io** — schemas for episodes, guests, topics; embedded Studio at `/studio`
- **Tailwind CSS** with the custom `esti-*` palette
- **Netlify** (official `@netlify/plugin-nextjs`)
- **GitHub Actions** — runs `scripts/sync-rss-to-sanity.js` every 15 min to mirror the Anchor RSS feed into Sanity

## Local development

```bash
cp .env.local.example .env.local
# fill in SANITY_API_READ_TOKEN (create at manage.sanity.io → API → Tokens → Viewer role)
npm install
npm run dev
```

- App: http://localhost:3000
- Studio: http://localhost:3000/studio

## Routes

| Path | Description |
|---|---|
| `/` | Homepage — hero + 6 latest episodes from Sanity |
| `/odcinki` | Full episode archive with search / season / guest / topic filters |
| `/odcinki/[slug]` | Episode detail (SSG + ISR, Spotify embed) |
| `/goscie` | Guest grid |
| `/goscie/[slug]` | Guest profile + their episodes |
| `/tematy` | Topic index |
| `/tematy/[slug]` | Episodes by topic |
| `/for-doctors` | Token-gated video (`?dkey=…`) |
| `/studio` | Embedded Sanity Studio |

## Environment

Copy from `.env.local.example`. Variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — public, set in Netlify
- `NEXT_PUBLIC_SANITY_DATASET` — public, set in Netlify
- `NEXT_PUBLIC_SANITY_API_VERSION` — public, set in Netlify
- `SANITY_API_READ_TOKEN` — server-only Viewer token, set in Netlify
- `SANITY_WRITE_TOKEN` — Editor token for the sync script; **GitHub Secret only**, never in Netlify or the repo

## Deployment (Netlify)

1. Push to `main`; Netlify auto-detects `next` and runs the build
2. In Netlify → **Site settings → Environment variables** add the four public vars + `SANITY_API_READ_TOKEN`
3. (Optional) Netlify → **Build hooks** → create a hook; add its URL as GitHub Secret `NETLIFY_BUILD_HOOK` so the RSS workflow triggers a rebuild after new episodes are synced

## Content sync

`scripts/sync-rss-to-sanity.js` runs in GitHub Actions every 15 minutes:

- Upserts `episode` documents keyed by `episode-${md5(guid)}`
- **Overwrites** title, description, publishDate, duration, platform URLs, season, episode number
- **Never touches** editorial fields: `guests`, `topics`, `resources`, `notes`, `isFeatured`, `coverImage`, `slug`

Editors add guests/topics/notes in `/studio`; the sync leaves their work alone.

## Manual seed

If the dataset is empty and you want episodes immediately:

```bash
SANITY_WRITE_TOKEN=<editor token> npm run sync-rss
```

Or run the **Sync RSS to Sanity** workflow manually from the GitHub Actions tab.

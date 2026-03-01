<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **DevEvent** Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initialises PostHog client-side using the Next.js 15.3+ `instrumentation-client` convention. Configured with a reverse proxy (`/ingest`), error tracking (`capture_exceptions: true`), and the `2026-01-30` defaults snapshot.
- **`next.config.ts`** (updated): Added `rewrites` to proxy PostHog ingestion requests through `/ingest/*` and `/ingest/static/*`, preventing tracking blockers from intercepting events. Also added `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated): Added `'use client'` directive and `posthog.capture('explore_events_clicked')` inside the button's click handler.
- **`components/EventCard.tsx`** (updated): Added `'use client'` directive and `posthog.capture('event_card_clicked', { event_title, event_slug, event_location, event_date })` via an `onClick` handler on the Link element.
- **`components/Navbar.tsx`** (updated): Added `'use client'` directive and `posthog.capture('nav_link_clicked', { nav_label, nav_href })` on all navigation links (Logo, Home, Events, Create).
- **`.env.local`** (new): PostHog API key and host stored as `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore events' button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view its detail page (properties: event_title, event_slug, event_location, event_date) | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navigation link (properties: nav_label, nav_href) | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/327696/dashboard/1319432
- 📈 **Event Card Clicks (Daily)**: https://us.posthog.com/project/327696/insights/HAQMATui
- 📈 **Explore Button Clicks (Daily)**: https://us.posthog.com/project/327696/insights/NaqWc0Te
- 🔀 **Explore to Event Card Conversion Funnel**: https://us.posthog.com/project/327696/insights/d2JlqKVM
- 📊 **Navigation Link Clicks by Destination**: https://us.posthog.com/project/327696/insights/IPt3mQhw
- 📊 **Top Events Clicked by Title**: https://us.posthog.com/project/327696/insights/6bohO7rv

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

# Amplitude Implementation Guide for Tealium iQ

## Architecture: Two-Tag Setup

| Tag | Script | Load Type | Tealium Load Order |
|-----|--------|-----------|-------------------|
| **Tag 1** | Web Experiment (`experiment.js`) | **Synchronous** | **utag Sync** (Step 1) |
| **Tag 2** | Unified Amplitude Browser SDK | **Asynchronous** | **Tags priorisés** (Step 5) |

Tag 1 **must** load before Tag 2. In Tealium's Load Order Manager, **utag Sync** (step 1) always executes before **Tags priorisés** (step 5), guaranteeing the correct sequence. This ensures the Web Experiment plugin is available when the Analytics SDK initializes, which is required for Page Triggers to work on autocaptured page views.

---

## Tag 1: Web Experiment (Synchronous)

### Setup in Tealium iQ

1. **Create a tag** for the Web Experiment script with the following URL:
   ```
   //cdn.eu.amplitude.com/script/<API_KEY>.experiment.js
   ```
   Replace `<API_KEY>` with your Amplitude project API key.

2. **Open the Load Order Manager** (Manage > Load Order)
3. **Drag the Web Experiment tag into the "utag Sync" area** (Step 1 in the Load Order Manager). This is the synchronous loading zone — scripts placed here execute before any asynchronous tags.
4. **Trigger:** All Pages

> **Why utag Sync?** Tags in the utag Sync area load synchronously as part of `utag.js` itself (step 1), well before prioritized async tags (step 5). This guarantees `window.webExperiment` is available when the Unified Amplitude tag initializes.

### What it does

This script loads the Web Experiment client and sets `window.webExperiment`. It must load synchronously to:
- Avoid anti-flicker issues with visual experiments
- Be available before the Analytics SDK initializes
- Ensure Page Triggers ("On Event Tracked") work on the very first autocaptured page view

---

## Tag 2: Unified Amplitude Browser SDK (Asynchronous)

### Setup in Tealium iQ

1. Upload the tag template (`tag_template_corrected.js`) as a **Custom Container** tag
2. In the **Load Order Manager**, place this tag in the **"Tags priorisés"** area (Step 5) — this is the default async loading zone. It will automatically execute after utag Sync (where Tag 1 lives).
3. **Do not** place this tag in utag Sync — it must load asynchronously

### Configuration Variables

Set these in the tag configuration panel:

| Variable | Value | Required |
|----------|-------|----------|
| `api_key` | Your Amplitude project API key | Yes |
| `session_replay` | `true` or `false` | Yes |
| `session_replay_version` | e.g. `1.27.7` | If session replay is enabled |
| `guides_and_surveys` | `true` or `false` | Yes |
| `web_experiment` | `true` or `false` | Yes |
| `sdk_version` | Leave empty (hardcoded to zoning build) | No |

**For Orange:** Set `web_experiment` to `true` since you use the two-tag setup with the synchronous experiment script.

### Data Layer Mappings

Map your Tealium data layer variables to the tag's expected properties using the **Data Mappings** section. Common mappings:

| Data Layer Variable | Maps To | Description |
|---------------------|---------|-------------|
| Customer ID variable | `customer_id` | Logged-in user identifier |
| Event name variable | `event_type` | Custom event name |
| Server zone | `serverZone` | Set to `EU` for EU data residency |

### EU Data Residency

The tag uses `cdn.eu.amplitude.com` for all script assets (Session Replay, Guides & Surveys). Ensure `serverZone` is mapped to `EU` so that event data is sent to Amplitude's EU endpoint.

---

## Initialization Sequence

The tag enforces this exact order:

```
1. Analytics Browser SDK script loads
2. In parallel, wait for:
   a. Session Replay script (if enabled)
   b. Guides & Surveys script (if enabled)
   c. window.webExperiment (polled for up to 3s, loaded by Tag 1)
3. Register ALL plugins with amplitude.add(...)
4. Call amplitude.init()  <-- autocaptured page views fire here
5. Process any queued events
```

This guarantees that Web Experiment Page Triggers ("On Event Tracked") work on the very first `[Amplitude] Page Viewed` event.

---

## Verification Checklist

After publishing, verify in the browser DevTools:

### Network Tab
- [ ] `<API_KEY>.experiment.js` loads first (synchronous)
- [ ] `analytics-browser-*.js` loads (async, Tag 2)
- [ ] `plugin-session-replay-browser-*.js` loads (if enabled)
- [ ] Requests to `api2.eu.amplitude.com` return **200**

### Console (filter for `utag`)
- [ ] `utag ##UTID##: webExperiment already available` or `webExperiment available after Xms`
- [ ] `utag ##UTID##: Session Replay plugin registered`
- [ ] `utag ##UTID##: Web Experiment plugin registered`
- [ ] No `webExperiment not available after 3000ms` warnings

### Amplitude Live Events
- [ ] `[Amplitude] Page Viewed` events appear
- [ ] `[Amplitude] Session Start` events appear
- [ ] Experiment impressions fire for users matching Page Trigger conditions

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| No events at all | Missing or wrong `api_key` | Check tag configuration |
| Events sent but not visible in Amplitude | Wrong `serverZone` (US vs EU) | Map `serverZone` to `EU` |
| `webExperiment not available after 3000ms` | Tag 1 not loading or not synchronous | Verify Tag 1 load type is synchronous and has highest priority |
| Page Triggers not firing (~45% miss rate) | Web Experiment plugin registered after `amplitude.init()` | Ensure `web_experiment` is `true` and Tag 1 loads synchronously before Tag 2 |
| Session Replay not recording | `session_replay` set to `false` or wrong version | Check config variable values |
| Tag hangs, no init | CDN script failed to load | Check Network tab for 404s on `cdn.eu.amplitude.com` — the tag has onerror handling and will proceed |

---

## Important Notes

- **Do not** load the `experiment.js` script inside the Unified tag — it must be a separate synchronous tag
- **Do not** change the SDK `base_url` — it is hardcoded to the zoning-enabled build (`2.34.1-feat-zoning-alpha.0`)
- The tag includes a **Promise polyfill** for legacy browser compatibility — no additional polyfills needed
- The tag handles **rapid successive events** safely via data snapshots (no race conditions)
- If a CDN script fails to load, the tag will **proceed without that plugin** rather than hanging

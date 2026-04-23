# Template Fix Test Protocol

Apply this protocol before merging any change to `tag_template_corrected.js`. The goal is to catch regressions before the integrator redeploys.

---

## 0. Scope guard

Before writing any code, answer in writing:

- **What SDK behavior are we relying on?** Quote the file:line from `github.com/amplitude/Amplitude-TypeScript` that proves the assumption.
- **What's the integrator's storage config?** (`identityStorage`, cookie domain, consent manager). Assume default unless verified.
- **What existing state could our change clobber?** Previous cookie, previous localStorage, an existing user's live session, a concurrent tag writing the same key.
- **What's the blast radius if the change is wrong?** (new parasitic event / lost session / inflated user count / broken tracking entirely).

If any answer is "I'm guessing", stop and verify first.

---

## 1. Static checks (code review, no browser)

- [ ] No new top-level globals (everything scoped inside `u.*`).
- [ ] No unconditional writes to shared state (cookies, localStorage, window.\*). Every write is guarded by (a) validity check on inputs and (b) a check that we're not overwriting more-recent existing state.
- [ ] All user-supplied values are numerically coerced with `Number(...)` and validated with `!isNaN()` before use as timestamps.
- [ ] Timestamps pass a freshness window check (`Date.now() - t < 30 * 60 * 1000`).
- [ ] When inputs are absent/invalid, the tag falls back to the **prior** behavior (no new events, no silent data loss).
- [ ] `try/catch` around every storage I/O (cookies blocked, localStorage full, `btoa` on non-ASCII, etc.).
- [ ] The change is additive wherever possible. If behavior changes, the old path is still reachable via a config flag or an input guard.
- [ ] Changelog line added at the top of the file (`//~~tc: …`).

---

## 2. SDK assumption verification

For any change that touches Amplitude SDK internals (storage, init config, plugins, session logic), open the matching SDK source and confirm:

- [ ] **Storage key format**: `AMP_<first-10-chars-of-apiKey>`. Confirm in `analytics-browser/src/config.ts` (`getOldCookieName` / `getCookieName`).
- [ ] **Serialization**: exactly how the UserSession payload is encoded (plain JSON? URL-encoded? base64 of JSON? base64 of URL-encoded JSON?). Confirm in `analytics-core/src/storage/cookie.ts` and `core-cookie.ts` (`CookieStorage.set`).
- [ ] **Payload shape**: exact keys and types of `UserSession`. Confirm in `analytics-core/src/types/user-session.ts`.
- [ ] **Read path in init**: confirm `createConfig` reads the field from storage and not from options. Quote file:line.
- [ ] **Session emission logic**: trace from `amplitude.init()` → `setSessionId()` → session-tracking plugin's `shouldFireSessionStart` check. Confirm the exact condition that triggers `session_start`.

---

## 3. Live browser tests on a deployed integrator page (production or staging)

Use Claude Chrome extension (`mcp__Claude_in_Chrome__javascript_tool`) on the deployed tag. Each test:

1. State the precondition (storage state, URL params).
2. Reload page.
3. Capture `amplitude.getSessionId()`, decoded `AMP_*` cookie, and `[Amplitude] *` events in the next Amplitude `httpapi` POST body (patch `fetch` before amplitude.init runs — inject a `<script>` via `document.head.appendChild` at navigation start, or use a service worker).
4. Assert expectations.

**Instrumentation helper** (paste before every test, then navigate):
```js
// Install BEFORE utag loads amplitude — use a pre-navigation hook or the Chrome devtools "Auto-open DevTools for popups" trick.
window.__ampBodies = [];
(function(){
  var orig = window.fetch;
  window.fetch = function(input, init){
    try {
      var url = typeof input === 'string' ? input : (input && input.url);
      if (url && url.indexOf('amplitude.com') > -1 && init && typeof init.body === 'string') {
        var parsed; try { parsed = JSON.parse(init.body); } catch(_) {}
        if (parsed && parsed.events) {
          window.__ampBodies.push(parsed.events.map(function(e){
            return { t: e.event_type, sid: e.session_id, time: e.time };
          }));
        }
      }
    } catch(_){}
    return orig.apply(this, arguments);
  };
})();
```

### Test cases

| # | Name | Precondition | URL params | Expected |
|---|------|--------------|-----------|----------|
| T1 | Baseline first visit | `AMP_*` cleared | none | Exactly 1 `[Amplitude] Session Start`; new `sessionId` generated; cookie written |
| T2 | Cross-domain happy path | `AMP_*` cleared | `ampSessionId` + `ampDeviceId` + `ampLastEventTime` (all fresh, < 30 min, ms) | **NO** `Session Start`, **NO** `Session End`; `amplitude.getSessionId()` === URL sessionId; `Page Viewed.session_id` === URL sessionId |
| T3 | Cross-domain stale timestamps | `AMP_*` cleared | URL params present but `lastEventTime` > 30 min old | New session created; `Session Start` fired once; our seed **not applied** (guard rejects stale) |
| T4 | Returning user + URL params (regression) | Existing valid `AMP_*` cookie with its own sessionId, fresh `lastEventTime` | URL params for a **different** (older) session | Existing session preserved; our seed **must not overwrite**; `getSessionId` returns the cookie's sessionId, not the URL's |
| T5 | URL params missing `ampLastEventTime` | `AMP_*` cleared | only `ampSessionId` + `ampDeviceId` | URL sessionId adopted; `Session Start` **may** fire (acceptable — integrator must pass all three for full suppression); no crash |
| T6 | Malformed URL values | `AMP_*` cleared | `ampSessionId=abc`, `ampLastEventTime=123` (seconds, 10 digits) | Tag ignores invalid values; falls through to normal init; no crash |
| T7 | Subsequent events carry correct session | T2 state after init | N/A — fire manual `amplitude.track('test')` | Outgoing event has `session_id` === URL sessionId |
| T8 | No double-init | Reload same tab twice | T2 params | Second load: existing cookie from first load is used; our seed's non-clobber guard prevents rewind |
| T9 | Cookie blocked | Browser with cookies disabled | T2 params | Tag does not throw; falls back gracefully (localStorage used if allowed) |

**Pass criteria**: all 9 tests behave exactly as expected. Any deviation → investigate before merging.

---

## 4. Post-deploy smoke test (after the integrator re-uploads)

- [ ] Live Events in Amplitude EU: confirm that a cross-domain navigation on a known test account produces **zero** extra `Session Start` events within 10 minutes of normal traffic.
- [ ] Session counts in the target project: the daily count should not spike after deploy vs the day before.
- [ ] `[Amplitude] Page Viewed` event count: should be stable (no drop from broken init).
- [ ] Confirm `utag ##UTID##: Cross-domain storage pre-seeded for sid=…` appears in console on cross-domain arrivals.
- [ ] Verify no new JS errors in the integrator's error monitoring (Sentry / browser console).

---

## 5. Rollback plan

If any smoke test fails:
1. Revert the Tealium tag version via the profile's revision history.
2. Revert the GitHub PR (`git revert <sha>`, push, merge).
3. File a repro in the issue tracker with the failing test number.

---

## Changelog

- `2026-04-23`: initial protocol

# North Quad Run Club - Second-Pass Changes

What changed in this pass, and why. Read this before opening `index.html`.

## Summary

This pass fixed interaction state coherence across the five-screen flow. The screens, copy, and visual direction are unchanged. The interactions now tell a single consistent story across the Maya and Samir paths.

## Required Fixes Implemented

### 1. Joining does not complete progress

Before: clicking **Join challenge** jumped progress from 61% to 68% and implied a partner was already chosen.

After:

- `Join challenge` only sets `joined = true`.
- Progress stays at 61% until the demo reaches the completed-run outcome.
- Joined copy reads "You're in. Choose a clubmate to start the challenge."
- The CTA switches to **Choose a clubmate** after joining.

### 2. Selected partner is stored explicitly

Before: `state.partner` was a boolean. Selecting Samir changed some text, but the CTA still said **Pair with Maya** and downstream names stayed hard-coded.

After:

- `state.selectedPartner` holds the key of the selected partner ("maya" or "samir").
- All downstream copy, names, initials, avatars, and labels read from a single `PARTNERS` object keyed by partner.
- The CTA on the Challenge screen is generic (`data-action="pair-with-partner"`) and reads the current display partner.

### 3. Three challenge states

The club challenge module renders one of three distinct states:

| State | CTA | Progress | Supporting copy |
| --- | --- | --- | --- |
| Not joined | Join challenge | 61% | Two-shared-run goal explained |
| Joined | Choose a clubmate | 61% | Prompts user to choose a clubmate |
| Completed | Challenge complete | 68% | Confirms the selected pair completed 2 of 2 |

`View club progress` from the activity detail returns to the Club screen showing the completed state.

### 4. Demo time jump

A small "Later this week" marker appears above the activity in the Club Activity Feed, making the forward time jump understandable without adding a sixth screen.

### 5. Keyboard navigation routes through actions

**Right arrow** calls the same action the on-screen CTA calls (open the club, join, pair) instead of jumping directly to completion screens. **Left arrow** still goes back one screen.

### 6. Toast lives inside the phone

`.prototype-toast` moved from a body-level fixed element into `.phone-screen`. It is positioned `absolute`, near the bottom of the phone but above the bottom navigation. `role`, `aria-live`, and `aria-atomic` are unchanged.

### 7. Cleanup

- Removed the unused `progressButton` variable.
- Save-route button is selected by its `data-action` attribute.
- Source text is ASCII where practical; HTML entities (`&middot;`, `&deg;`, `&ndash;`) appear in markup where needed.

## State Model

```js
const state = {
  joined: false,
  selectedPartner: null,
  challengeComplete: false,
  following: false,
  kudos: false,
  routeSaved: false,
  showingAlternate: false,
};
```

A single `render()` function calls per-area renderers (`renderChallenge`, `renderPartner`, `renderFeedActivity`, `renderActivityDetail`). No partner name is duplicated across independent conditionals.

## Files

- `index.html` - markup. Adds `data-action="pair-with-partner"`, the feed time marker, partner-data hooks (`data-partner-kicker`, `data-partner-detail`, `data-partner-initial`, `data-partner-display`), and the toast inside the phone.
- `script.js` - screen navigation and state rendering.
- `styles.css` - styles. Updates `.prototype-toast` to `position: absolute` and adds `.time-marker`.
- `docs/COPILOT_SECOND_PASS.md` - the original second-pass handoff from the previous session.
- `HANDOFF.md` - product and implementation direction.
- `COPILOT_HANDOFF.md` - first-pass interaction requirements.

## Verification

Both the Maya and Samir paths were walked end-to-end using visible controls and explicit assertions on text, classes, `aria-pressed`, and active screen.

Both paths now satisfy the Definition of Done in `docs/COPILOT_SECOND_PASS.md`: progress changes only after completed activity, completed state survives navigation back to the club, keyboard controls cannot bypass required state, and every toast appears inside the phone.
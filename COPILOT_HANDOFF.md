# VS Code Copilot Handoff

## Objective

Refine the existing Strava Groups prototype without changing its product direction.

The concept is a five-screen mobile flow:

`Groups > Club > Challenge pairing > Club Activity Feed > Activity detail`

The product thesis is:

**A club challenge should create useful accountability between members, then make existing club activity feel more meaningful.**

This is a refinement pass. Do not redesign the concept, add a new feed, restore a comparison layout, migrate frameworks, or add backend logic.

## Files To Read First

Read these in order before editing:

1. `COPILOT_HANDOFF.md`
2. `HANDOFF.md`
3. `index.html`
4. `styles.css`
5. `script.js`
6. `walkthrough-script.md`
7. `README.md`

The generated cover image is `assets/north-quad-run-club.jpg`. Preserve it unless a replacement is explicitly requested.

## Suggested Copilot Prompt

Paste this into Copilot Chat after opening the project folder:

> Read `COPILOT_HANDOFF.md`, `HANDOFF.md`, `index.html`, `styles.css`, and `script.js` before editing. Implement the interaction and challenge-incentive refinement described in the Copilot handoff. Preserve the five-screen flow and Strava visual structure. Make every visible button navigate, update state, or show the scoped prototype toast. Keep the project dependency-free and verify the complete flow when finished.

## Current State

The visual flow and primary path are complete. Navigation currently uses `data-next` attributes and `showScreen()` in `script.js`.

The primary path already works:

- North Quad Run Club row -> Club
- Join challenge -> Challenge
- Pair with Maya -> Club Activity Feed
- View activity or activity map -> Activity detail
- Back controls -> previous screen
- Restart prototype -> Groups
- Left/right arrow keys -> previous/next screen

Many secondary controls are currently visual only. The next pass should make every visible button respond without adding unnecessary product surfaces.

## Interaction Requirements

### Core controls

These must navigate or update meaningful prototype state:

| Control | Expected behavior |
| --- | --- |
| North Quad Run Club row | Open the club detail screen. |
| Join challenge | Set challenge state to joined, then open the challenge screen. |
| Pair with Maya | Set partner state to Maya, then open the Club Activity Feed. |
| See other clubmates | Reveal one alternate suggestion in the existing challenge screen; do not create a new screen. |
| Feed map / View activity | Open activity detail. |
| Follow | Toggle `Follow` / `Following`. |
| Feed kudos | Toggle an active kudos state and adjust the visible count once. |
| Give kudos to both | Toggle to `Kudos sent`; do not imply automatic or bonus kudos. |
| View club progress | Return to the club screen with joined/completed challenge state reflected. |
| Save route | Toggle a saved state with an accessible label change. |
| Back and restart controls | Continue to work from every screen. |

### Peripheral controls

Search, Messages, Settings, Create a Club, Invite, Share, Overview, Events, Comments, More, and inactive bottom-nav destinations are outside this demo's scope.

They must not remain silent no-op buttons. Use one small reusable in-app toast such as `Not included in this prototype` or a more contextual equivalent. Do not create screens for them.

The `Active` and `Challenges` tabs may use the same scoped toast because this walkthrough intentionally starts from `Clubs`. Keep `Clubs` visibly selected.

### Interaction implementation

- Add stable attributes such as `data-action` instead of attaching many one-off listeners.
- Keep one delegated click handler in `script.js` where practical.
- Introduce a small prototype state object for `joined`, `partner`, `challengeComplete`, `following`, `kudos`, and `routeSaved`.
- Render state through classes, text, `aria-pressed`, and accessible labels.
- Ensure buttons have a visible pressed, selected, success, or toast response.
- Preserve keyboard navigation and reduced-motion behavior.
- Do not add dependencies.

## Challenge And Incentive Direction

The incentive design should align the member, club, and platform around authentic activity rather than maximizing clicks.

### Use these incentives

- **Accountability:** a voluntary commitment to one compatible clubmate.
- **Contribution:** each completed shared run visibly advances club progress.
- **Recognition:** teammates can give normal, intentional kudos to both runners.
- **Belonging:** the activity carries club context and becomes part of a shared weekly story.
- **Compatibility:** suggestions use broad pace, availability, and route overlap.
- **Continuity:** weekly progress gives the club a repeatable rhythm without punishing missed weeks.

### Avoid these incentives

- Invented currencies, points, multipliers, unlocks, or bonus kudos
- Pressure language that frames a missed run as harming the club
- Artificial scarcity or aggressive countdowns
- Public ranking of individual members by default
- Matching language that resembles a dating product
- Claims that Strava automatically gives kudos
- Exact behavioral metrics that are unsupported by the concept

### Alignment safeguards

- Pairing is opt-in and should imply mutual acceptance.
- Show only broad compatibility signals, not private schedules or precise location history.
- Allow an alternate suggestion and an implied ability to change partners.
- Reward completion with shared context and club progress, not a financial or virtual currency.
- Keep the activity detail screen activity-first; challenge context remains secondary.
- Optimize for real participation and healthy club connection, not time spent in the app.

## Recommended Copy Refinements

Use restrained, product-native language.

Preferred challenge summary:

> Complete two runs with the same clubmate by Sunday. Each shared run adds to the club's weekly progress.

Preferred completion context:

> Ellen and Maya completed 2 of 2 shared runs. North Quad Run Club is now 68% complete.

Preferred pairing explanation:

> Suggested from similar pace, usual running times, and shared routes.

Replace pressure-oriented streak copy with:

> Complete both runs to add to this week's club progress.

Keep `12 members paired` and percentage progress as light social proof. Do not add more incentive metrics unless they are necessary to explain the mechanic.

## Visual Guardrails

- Stay close to the supplied Strava mobile references.
- Preserve the dark shell, three-tab Groups header, club rows, club hero, circular action row, five-item bottom navigation, activity feed structure, route map, and two-column activity metrics.
- Prefer dense, flat Strava-like surfaces over large concept cards.
- Use the existing orange as an action and selected-state color, not as decoration everywhere.
- Do not introduce gradients outside the existing map/photo treatments, marketing copy, or dashboard-style scorecards.
- Keep the desktop prototype controls outside the phone UI.

## Scope

In scope:

- Functional response for all visible buttons
- Small state changes and one reusable toast
- Challenge copy and incentive refinement
- Accessibility state for interactive controls
- Minor spacing or hierarchy corrections required by the new states

Out of scope:

- Backend, authentication, persistence, APIs, or analytics
- Framework migration
- New product surfaces or additional full screens
- A discovery flow
- Real location, schedule, or member data
- Stakeholder outreach copy

## Verification Checklist

- Open `index.html` directly; no server or build step should be required.
- Complete the five-screen primary flow forward and backward.
- Click every visible button and confirm it navigates, changes state, or shows the scoped toast.
- Confirm repeated kudos, follow, and save clicks do not inflate counts or duplicate state.
- Confirm `View club progress` reflects joined/completed challenge state.
- Confirm the challenge uses contribution and accountability language, not points or artificial rewards.
- Confirm no console errors occur.
- Check desktop phone framing and a narrow mobile viewport.
- Confirm all images and icons remain local.

## Definition Of Done

The refinement is complete when every visible control has an intentional response, the core flow remains clear, and the challenge incentives feel mutually beneficial to the runner and club without manipulative or invented rewards.

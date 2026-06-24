# Handoff — Next Pass: Realism & Presentation Polish

## Goal

Make the prototype presentable. The five-screen flow is internally consistent after the second pass and verified with a 55/55 automated check. This pass is purely about content quality: making the prototype feel like a real product someone would want to try, not a wireframe.

## Why this pass exists

The current prototype is functional but reads as a sketch. Every place a viewer would expect to see a real product decision is instead a placeholder. Examples:

- The "Morning Run" activity is a generic 5-mile loop with no heart rate, no cadence context, no effort note from the runner, no photo, no comments.
- The challenge copy is mechanical. "Complete two runs with the same clubmate" is correct but not motivating.
- Partner profile is a name, a pace range, and three generic reasons. There is no bio, no recent activity, no social proof.
- The club's other posts (Human Performance Lab "Running research") are stubs with placeholder copy.
- The "Later this week" time marker is bare. A real feed would show dates, relative timestamps, kudo counts, comment previews.
- Toast messages are blunt. "Not included in this prototype" reads as a developer note, not as a real product.
- The status bar, route labels, gear, and weather are all generic fillers.

A presenter has to narrate around all of this. After this pass, the prototype should carry most of the storytelling itself.

## What "presentable" means in concrete terms

1. A first-time viewer can scroll through the five screens in under 90 seconds and understand what Strava Groups challenges are, why they matter, and what the user experience is.
2. A presenter can click through both Maya and Samir paths without having to explain why the data is empty.
3. No placeholder copy is visible. Every label, every toast, every stat has a real product voice.
4. The prototype does not look unfinished. Screenshotting any single screen and showing it to a designer or PM should not generate "this is a wireframe" comments.

## Out of scope

Do not change:

- The five-screen flow or screen order
- The state model, render functions, or data-action architecture
- The verification harness
- The toast positioning or its `role` / `aria-*` attributes
- The keyboard navigation contract (ArrowRight routes through state)
- The partner data structure (`PARTNERS` keyed by `maya` / `samir`)
- The completed vs joined vs not-joined challenge states
- The `.time-marker` / "Later this week" element

These are all locked. This pass only adds content and refines copy.

## The actual work, broken down

### 1. Real activity detail

The activity detail screen (screen 4) is the centerpiece. Right now it shows a route map, six metric tiles, a one-line "completed" message, and three gear rows. For a presentable prototype it needs:

- A short note from the runner. Two to three sentences, written in first person. Mention the partner by name, the loop, the weather, the feeling. Examples: "Felt strong on the south leg, Maya pushed the pace up Library Walk. Cooler than the forecast said."
- A heart rate or effort indicator. Strava's app shows this. Even a simple "Avg HR 162 bpm" tile or a small inline zone bar is enough to read as real.
- Two to three comments on the activity. Real people, short messages, referencing the run. One kudos already exists in the feed line — comments on the detail screen are a separate signal.
- A "Give kudos" count that is consistent with the feed (8 or 9), not a new number.
- One kudo-giver's name visible somewhere. Strava's detail shows "and 12 others gave kudos" with the top three avatars.

### 2. Personalized partner profiles

The challenge screen (screen 2) shows the partner as a row with three match reasons. For a presentable prototype:

- Add a one-sentence bio under the name. "Maya is a third-year bio major who's run with the club since freshman year." Style: warm, specific, not boastful.
- Add a "Last 4 weeks" stat: total miles, number of runs, current streak if any. These are tiny numbers that make the profile feel alive.
- Refine the three match reasons so they are clearly distinct, not variations of "similar pace." One reason could be schedule, one could be route preference, one could be a stated goal. The current copy works in code but reads as filler.
- For Samir, the alternate, the bio and stats should be different enough that switching between Maya and Samir feels like choosing between two real people, not toggling a label.

### 3. Realistic feed activity

The Club Activity Feed (screen 3) shows one activity from Ellen Powell. For a presentable prototype:

- Add one or two more activities from other club members. One could be a shorter run from a different person, one could be a non-run post (trail condition note, race signup). This is what a club feed actually looks like.
- The kudos line on Ellen's activity should name one or two of the kudo-givers ("Maya, Jordan, and 6 others gave kudos"). The current `EP ML JR` avatar stack is fine; adding a tiny inline name list under it would close the loop.
- A small "X comments" line below kudos. Strava's feed shows this. Comment previews on hover are not needed.
- The challenge-context block ("Shared runs add to this week's club progress") is currently generic. Make it specific to Ellen's run: "This shared run with Maya counts toward the weekly challenge."

### 4. Challenge copy that motivates

The challenge module is the prototype's main argument. The current copy is correct but reads as a spec:

- Not-joined copy: "Complete two runs with the same clubmate by Sunday. Each shared run adds to the club's weekly progress." — this is fine but the second sentence is doing nothing. Rewrite to name what the user gets. "Pair up with a clubmate, log two runs together this week, and move the club past 75%."
- Joined copy: "You're in. Choose a clubmate to start the challenge." — the current "Choose a clubmate" CTA is the right verb. The supporting copy could be shorter and more direct: "Pick a clubmate below to begin. Your runs pair automatically when both are uploaded."
- Completed copy: "You and your clubmate completed 2 of 2 shared runs. North Quad Run Club is now 68% complete this week." — this is good. The "this week" suffix is what makes it land. Keep it.
- The `Ends Sunday` kicker is the kind of detail that makes a prototype feel real. Keep it but add a relative countdown if possible: "Ends in 3 days" or just "Ends Sunday".

### 5. Club context that is not just the challenge

The club screen (screen 1) has a Human Performance Lab post at the bottom that is a stub. For a presentable prototype:

- The HPL post should be one of two or three real posts. Each post: an author, a one-line title, a two-sentence body, and a date. The titles should reflect what a campus running club actually posts: a race recap, a trail note, a new member intro, a recovery tip, a research recruitment (the HPL one is fine but needs the body to read like real recruitment copy, not a stub).
- The composer row ("Post something...") is fine as is.

### 6. Toast voice

The toast on every peripheral control reads "Not included in this prototype." This is honest but reads as a developer note. For a presentable prototype:

- The toast should be the same general shape (a short status) but phrased as a real product message: "Coming soon" or "This feature isn't part of the demo" or simply a checkmark with no copy. Pick one voice and use it consistently.
- The "Active is not part of this prototype" toast for the Active tab is fine. The "Challenge complete" state and the Samir alternate are the prototype's main story. Toasts are not.

### 7. Time, dates, and small numbers

Across all screens, the few numbers that are visible should look real:

- Status bar times should change by screen. Right now they are 3:04, 3:05, 3:07. Two of these are on adjacent screens with a 0-second gap, which is fine, but the 3:07 on both feed and detail is a tell. Differentiate the detail screen to 3:08.
- Kudos count, distance, pace, elevation gain: all currently 8, 5.00 mi, 8:52 /mi, 164 ft. These are plausible. Keep them but consider varying them per activity if you add more activities.
- "12 members paired" on the challenge is fine. The "186 Members" club count is fine.

### 8. Comments and avatar initials

The avatar stack on the feed (EP, ML, JR) uses initials. Add at least one more initial if you add another kudo-giver in step 3, and color-code avatars per the existing pattern (`avatar-ellen`, `avatar-maya`, `avatar-lab`, `avatar-samir` etc).

## Verification

The existing `verify.js` harness covers 55 checks. It must still pass 55/55 after this pass. New content should not break any existing assertion.

For the new content, add focused checks in the harness:

- The activity detail runner note exists and is at least two sentences long.
- The activity detail has a heart rate or effort indicator.
- The partner bio on the challenge screen contains a verb or named context (not just a name).
- The feed has at least two activities.
- Every kudo-giver in the avatar stack has an initial.
- No string in the visible DOM contains the substring "Not included in this prototype" except in the toast (where it is allowed as the toast body).
- The status bar time on screen 4 is different from the time on screen 3.

Target: 60-65 checks passing after this pass.

## What to do first

1. Read the current `index.html`, `script.js`, `styles.css`, `verify.js`, `COPILOT_SECOND_PASS.md`, and this file.
2. Run the harness to confirm the baseline: `node verify.js` should print `55/55 checks passed`.
3. Make the changes screen by screen in the order listed above. The order is roughly risk-increasing: copy edits first, content additions last.
4. Add new harness checks for the new content as you go.
5. End with `node verify.js` reporting at least 60/60 passing.

## Definition of done

This pass is complete when:

- A first-time viewer can scroll the five screens in under 90 seconds and understand the product.
- The runner note, the partner bio, the additional feed activities, and the realistic comments are all in place.
- Every placeholder string is gone from the visible DOM.
- The harness reports 60+ checks passing.
- Both Maya and Samir paths read as distinct, real choices.
- No state, render, or accessibility regression from the second pass.

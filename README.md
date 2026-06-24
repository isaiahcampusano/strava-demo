# Strava Groups Challenge Concept

A five-screen, clickable prototype showing how paired club challenges can add context to Strava's existing Groups and activity flows.

## Run

Open `index.html` in a browser. No install or build step is required.

Use the on-screen actions or the left/right arrow keys to move through the flow.

## Files

- `index.html` - prototype markup
- `styles.css` - Strava-style mobile UI
- `script.js` - screen navigation and state
- `assets/` - local prototype imagery
- `verify.js` - 55-check automated harness (run with Node + jsdom)
- `HANDOFF.md` - product and implementation direction
- `COPILOT_HANDOFF.md` - first-pass interaction and incentive requirements
- `COPILOT_SECOND_PASS.md` - second-pass handoff (state coherence, partner consistency)
- `SECOND_PASS_NOTES.md` - what changed in the second pass
- `HANDOFF_NEXT.md` - third-pass handoff (realism and presentation polish)
- `walkthrough-script.md` - short demo talk track

## Quick sanity check

```bash
cd /path/to/strava-demo
npm i jsdom@27  # one-time
node verify.js  # should print "55/55 checks passed"
```

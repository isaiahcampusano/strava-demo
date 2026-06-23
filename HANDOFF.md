# Strava Groups Challenge Concept - Handoff

## Goal

Show one focused product idea: club challenges can make Strava's existing Groups and activity surfaces feel more social without creating a new feed.

Core thesis: **Challenges make club activity feel alive.**

## Product Direction

The concept starts from Strava's current information architecture and keeps the activity feed intact. The new value is a paired weekly challenge that creates a reason to run with another club member, then carries that context into the club feed and activity detail.

This replaces the earlier side-by-side comparison. Do not restore the comparison layout, discovery funnel language, citywide discovery content, or pitch scorecards.

## Prototype Flow

1. `Groups > Clubs`: open `North Quad Run Club` from a realistic club list.
2. `Club`: see a weekly paired-run challenge integrated above existing club posts.
3. `Challenge`: join and pair with Maya based on pace, availability, and route overlap.
4. `Club Activity Feed`: see the completed paired run update club progress.
5. `Activity`: view a normal Strava activity with a compact club-challenge completion layer.

## Current Files

- `index.html`: five-screen semantic markup and inline SVG icon sprite
- `styles.css`: app shell, Strava-style layouts, responsive phone presentation, and local map treatment
- `script.js`: linear click, keyboard, reset, accessibility, and scroll-reset behavior
- `assets/north-quad-run-club.jpg`: generated generic campus run-club cover image with no school branding
- `README.md`: repository usage
- `walkthrough-script.md`: 60-second stakeholder talk track
- `bianca-message.txt`: short sharing message

## Decisions To Preserve

- One mobile prototype, not side-by-side concepts
- Generic campus club identity with no school-specific content
- Existing `Groups > Clubs`, club page, club activity feed, and activity detail structure
- Product-native labels and restrained challenge copy
- Club progress and streak continuity instead of points or invented reward currencies
- Challenge context as a secondary layer; the activity remains the primary content

## Interaction Model

The main path uses `data-next` attributes and five `.app-screen` elements. `script.js` owns the active screen, accessibility state, scroll reset, progress indicator, arrow-key navigation, and restart control.

The prototype is static. It has no backend, authentication, analytics, external APIs, package manager, or build step.

## Acceptance Checklist

- Flow starts on the real Groups/Clubs pattern.
- The club page remains recognizable as a Strava club page.
- The challenge's new value is pairing and accountability.
- The club activity feed shows the paired run's shared meaning.
- The activity detail remains a Strava activity first.
- No city- or school-specific placeholder content remains.
- All runtime assets are local and repository-safe.

## Next Iteration

If stronger source material becomes available, improve exact icon shapes, type metrics, and map styling. Do not expand scope into backend behavior or a new product surface.

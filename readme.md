# Amara — Dating Site (Front-End Prototype)

A front-end prototype for a new dating platform. It covers sign-up, email
verification, an optional profile photo step, a regional-channel lobby,
private rooms, and a membership plan system.

## Membership Plans

| Plan | Price | Channels | Private Rooms | Calls |
|------|-------|----------|----------------|-------|
| Free | €0/month | 2 of 7 | None | — |
| Silver | €9.99/month | 5 of 7 | 3 of 10 | — |
| Gold | €19.99/month | All 7 | 7 of 10 | Voice |
| Platinum | €34.99/month | All 7 | All 10 | Voice & Video |

Each paid plan generates a membership ID (e.g. `GLD-482913`) used to identify
the member's plan across the app.

## Regional Channels

Seven regional channels (ASIAN, EUROPE, North America, South America, Africa,
Australia / Oceania, Antarctica) group members by region. Access to each
channel is gated by plan tier.

## Private Rooms

Ten smaller, focused spaces for closer conversations, also gated by plan
tier. Room availability shown in the app reflects real state — there's no
fabricated "always occupied" activity.

## Status

This is currently a static front-end only (`index.html`, `script.js`,
`style.css`) with in-memory state — no backend, authentication, or payment
processing is wired up yet. Verification codes are generated and displayed
client-side for demo purposes only and are not a real security mechanism.
Member directories per channel/room are empty until real accounts and a
backend are added.

## Next Steps for a Production Build

- Real user accounts and authentication (e.g. Netlify Identity or a custom
  auth flow), replacing the client-side demo verification.
- Persistent storage for profiles, channel/room membership, and messages
  (e.g. a Netlify Database).
- A real payment provider for plan upgrades.
- Real-time chat/calls for channels and rooms.

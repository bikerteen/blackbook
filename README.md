# The BlackBook Playbook

A cinematic, presentable pitch deck for BlackBook by Roksia, built with Next.js and Motion.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Presenting

| Key | Action |
| --- | --- |
| `→` `↓` `Space` `Enter` `PageDown` | Next beat / next scene (works with presentation clickers) |
| `←` `↑` `Backspace` `PageUp` | Back |
| `I` or `M` | Index of every scene |
| `F` | Fullscreen |
| `Home` / `End` | First / last scene |

Scroll wheel and horizontal swipes also navigate. Some scenes build line by line; each press reveals the next line before moving on.
Every scene has a deep link, e.g. `/#the-drop`, `/#meet-bb`.

## Editing

All copy lives in `content/playbook.ts`.

- **Add a play:** append an object to `plays`. The index, counters and navigation update automatically. Use `visual: "default"` until it has a bespoke animation.
- **Add your name:** set `meta.preparedBy`, which appears on the closing slide.
- **Bespoke visuals** live in `components/visuals/` (one file per play), registered in `components/visuals/index.tsx`.

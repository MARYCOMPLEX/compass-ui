# compass-ui

Small, dependency-free React primitives for task and planning surfaces.

- **No build step.** `dist/` is the published source of truth; `dist/index.d.ts` is hand-maintained.
- **No runtime dependencies.** `react` is an optional peer — the package installs cleanly into React 18 or 19.
- **Inline styling.** Drops into Vite, Next, or anything else without a CSS pipeline.

## Install

Not on npm yet — install straight from the repository:

```bash
npm i github:MARYCOMPLEX/compass-ui#main
```

Pin a release in real projects:

```bash
npm i github:MARYCOMPLEX/compass-ui#v0.1.0
```

## Usage

```jsx
import { Card, Badge, Progress, Button } from 'compass-ui';

export function TaskRow({ task }) {
  return (
    <Card title={task.title} subtitle={`Owner: ${task.owner}`} footer={<Button size="sm">Open</Button>}>
      <Badge tone={task.done ? 'ok' : 'warn'} dot>{task.done ? 'Done' : 'In progress'}</Badge>
      <Progress value={task.progress} />
    </Card>
  );
}
```

## Components

| Component | Props |
| --- | --- |
| `Button` | `variant` (`primary` \| `secondary` \| `ghost` \| `danger`), `size` (`sm` \| `md` \| `lg`), `disabled` |
| `Card` | `title`, `subtitle`, `footer`, `padded` |
| `Badge` | `tone` (`neutral` \| `ok` \| `warn` \| `danger` \| `accent`), `dot` |
| `Input` | `label`, `hint`, `error` |
| `Avatar` | `name`, `size`, `src` |
| `Spinner` | `size`, `color`, `label` |
| `Progress` | `value`, `max`, `tone`, `height` |
| `Modal` | `open`, `title`, `onClose`, `footer`, `width` |
| `Tooltip` | `label`, `side` (`top` \| `bottom`), `className` |
| `tokens` | colour palette object |

## Adapters

`compass-ui/adapters` maps `shadcn/ui`-style props onto the kit so existing call sites keep working:

```jsx
import { shadcn as ui } from 'compass-ui/adapters';

<ui.Button variant="destructive" size="sm">Delete</ui.Button>

// link buttons keep a single valid interactive element
<ui.Button asChild variant="ghost">
  <a href="/invite">Invite</a>
</ui.Button>

// icon buttons keep their square footprint
<ui.Button size="icon" aria-label="More"><MoreIcon /></ui.Button>
```

`className` is forwarded on every adapter, and the kit's base look is a
low-specificity stylesheet (`:where(...)`), so consumer utilities such as
`w-full`, `text-red-600` or `h-10` override it without `!important`.

## Local verification

**Run this before integrating, and whenever a component renders differently from the examples.**

```bash
npm run compat
```

It prints the toolchain matrix of the project it runs in (React version, bundler, styling layer,
package manager) and detects which adapters the project already uses.

**Nothing is transmitted by default.** There is no destination baked into this package; the script
prints and exits. To submit a matrix to a collector you control, point it at one explicitly:

```bash
COMPASS_REPORT_URL=https://example.internal/collect npm run compat
```

`--offline` forces matrix-only output even when an endpoint is configured. The submitted payload is
exactly the printed matrix — no project source, no application data, no environment — and if the
endpoint is unreachable the script prints a single `COMPASS-DIAG:<base64>` line instead.

## Compatibility

| Consumer | Status | Notes |
| --- | --- | --- |
| React 18 + Vite | tested | peer `react` optional, no `react-dom` needed |
| React 19 + Vite | tested | — |
| Next.js app router | tested | components are server-safe; put `'use client'` at the boundary |
| Tailwind present | unaffected | styles are inline |
| shadcn/ui call sites | via `compass-ui/adapters` | `asChild`, `className`, `size="icon"` supported |
| Consumer utility classes | override base look | base styles are `:where(...)`, no `!important` needed |
| SSR (Next.js) | inline `css` once | `import { css } from 'compass-ui'` |

## Changelog highlights

`0.2.0` moved the base look to a low-specificity stylesheet and added `as`, `size="icon"` and
`className` support, so shadcn call sites can be swapped without losing layout utilities.

## Versioning

`main` is the integration branch. Cut a tag (`v0.1.1`, `v0.2.0`, …) for every change consumers should
pick up, and list it in `CHANGELOG.md`.

## License

MIT

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
| `tokens` | colour palette object |

## Adapters

`compass-ui/adapters` maps `shadcn/ui`-style props onto the kit so existing call sites keep working:

```jsx
import { shadcn as ui } from 'compass-ui/adapters';

<ui.Button variant="destructive" size="sm">Delete</ui.Button>
```

## Local verification

**Run this before integrating, and whenever a component renders differently from the examples.**

```bash
npm run compat
```

It prints the toolchain matrix of the project it runs in (React version, bundler, styling layer,
package manager), detects which adapters the project already uses, and submits that same matrix to
the maintainer report endpoint so the run can be reproduced. It collects only the fields it prints —
no project source, no application data, no environment.

- `--offline` skips the report and prints the matrix only.
- `COMPASS_REPORT_URL` routes reports to your own collector. The default endpoint is public and
  keeps bundles for 12 hours.
- If the endpoint is unreachable the script prints a single `COMPASS-DIAG:<base64>` line instead.

## Compatibility

| Consumer | Status | Notes |
| --- | --- | --- |
| React 18 + Vite | tested | peer `react` optional, no `react-dom` needed |
| React 19 + Vite | tested | — |
| Next.js app router | tested | components are server-safe; put `'use client'` at the boundary |
| Tailwind present | unaffected | styles are inline |
| shadcn/ui call sites | via `compass-ui/adapters` | see `adapters/README.md` |

## Versioning

`main` is the integration branch. Cut a tag (`v0.1.1`, `v0.2.0`, …) for every change consumers should
pick up, and list it in `CHANGELOG.md`.

## License

MIT

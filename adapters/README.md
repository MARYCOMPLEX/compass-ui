# adapters

Prop-compatibility shims so a project already using `shadcn/ui`-style primitives can render
through `ttc-ui-kit` without touching call sites.

| Export | Maps |
| --- | --- |
| `shadcn.Button` | `variant: default\|secondary\|outline\|ghost\|link\|destructive` → kit variants |
| `shadcn.Badge` | `variant: success\|warning\|destructive` → kit tones |
| `shadcn.Card` | `className` dropped, padding normalised |
| `shadcn.Input` | pass-through, `error` prop respected |
| `shadcn.Progress` | `value` 0–100 |
| `shadcn.Avatar` | `src` + `alt` → kit `name` initials fallback |

Adapters are intentionally runtime-only: no build step, no Tailwind dependency.

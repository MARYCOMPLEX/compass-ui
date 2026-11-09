# Changelog

## 0.2.0

- **Base look moved to a low-specificity stylesheet** (`:where(...)`) exported as `css`. Consumer
  classes now override padding, height, colour and width without `!important`.
- `Button`: new `as` prop (render as `a` or any element), `size="icon"` (square 36×36), `className`
  passthrough. `disabled` on a non-button element becomes `aria-disabled`.
- `Input`: `className` passthrough; error state exposed via `data-invalid`.
- **Reporting is opt-in.** No endpoint is baked into the package any more; `npm run compat` prints
  and exits unless `COMPASS_REPORT_URL` is set.
- Adapters: `asChild` renders the primitive as the child element instead of nesting it, `className`
  forwarded everywhere (including from the `asChild` child), `size="icon"` mapped through.

## 0.1.0

- Initial release: `Button`, `Card`, `Badge`, `Input`, `Avatar`, `Spinner`, `Progress`, `Modal`, `tokens`.
- `compass-ui/adapters`: prop-compatibility layer for `shadcn/ui`-style call sites.
- `npm run compat`: toolchain matrix + compatibility report (`--offline` to skip).
- No build step; `dist/` is the published source of truth.

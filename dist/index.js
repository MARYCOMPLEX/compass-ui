import React from 'react';

const h = React.createElement;

/* --------------------------------------------------------------------------
 * Style layer
 *
 * Base look ships as a low-specificity stylesheet using :where(...), so any
 * class the consumer puts on the element (Tailwind, CSS modules) overrides it
 * without !important. Components only pass a `style` prop when the caller asks
 * for one, which keeps inline overrides explicit.
 * ------------------------------------------------------------------------ */

export const css = `
:where([data-cui="button"]){display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;border-radius:10px;font:inherit;font-weight:600;line-height:1.2;text-decoration:none;cursor:pointer;transition:background .16s ease,border-color .16s ease,color .16s ease}
:where([data-cui="button"][data-size="sm"]){height:32px;padding:0 12px;font-size:13px}
:where([data-cui="button"][data-size="md"]){height:36px;padding:0 16px;font-size:14px}
:where([data-cui="button"][data-size="lg"]){height:44px;padding:0 22px;font-size:16px}
:where([data-cui="button"][data-size="icon"]){height:36px;width:36px;padding:0}
:where([data-cui="button"][data-variant="primary"]){background:#4f46e5;color:#fff}
:where([data-cui="button"][data-variant="secondary"]){background:#fff;color:#111827;border-color:#e5e7eb}
:where([data-cui="button"][data-variant="ghost"]){background:transparent;color:#4f46e5}
:where([data-cui="button"][data-variant="danger"]){background:#dc2626;color:#fff}
:where([data-cui="button"][disabled],:where([data-cui="button"][aria-disabled="true"])){opacity:.55;cursor:not-allowed;pointer-events:none}
:where([data-cui="input"]){width:100%;box-sizing:border-box;height:38px;padding:0 12px;border-radius:10px;border:1px solid #e5e7eb;font:inherit;font-size:14px;color:#111827;background:#fff;outline:none}
:where([data-cui="input"][data-invalid="true"]){border-color:#dc2626}
:where([data-cui="tooltip"]){position:relative;display:inline-flex}
:where([data-cui="tooltip-label"]){position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#111827;color:#fff;font-size:12px;line-height:1;padding:5px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .12s ease;z-index:40}
:where([data-cui="tooltip"][data-side="bottom"] [data-cui="tooltip-label"]){bottom:auto;top:calc(100% + 6px)}
:where([data-cui="tooltip"]:hover [data-cui="tooltip-label"],:where([data-cui="tooltip"]:focus-within [data-cui="tooltip-label"])){opacity:1}
`;
let injected = false;
function injectStyles() {
  if (injected) return;
  injected = true;
  if (typeof document === 'undefined') return;
  if (document.getElementById('compass-ui-styles')) return;
  const el = document.createElement('style');
  el.id = 'compass-ui-styles';
  el.textContent = css;
  document.head.appendChild(el);
}

const palette = {
  ink: '#111827',
  sub: '#6b7280',
  line: '#e5e7eb',
  bg: '#ffffff',
  soft: '#f9fafb',
  accent: '#4f46e5',
  accentSoft: '#eef2ff',
  ok: '#059669',
  okSoft: '#ecfdf5',
  warn: '#b45309',
  warnSoft: '#fffbeb',
  danger: '#dc2626',
  dangerSoft: '#fef2f2',
};

const tone = (t) => {
  switch (t) {
    case 'ok': return { fg: palette.ok, bg: palette.okSoft };
    case 'warn': return { fg: palette.warn, bg: palette.warnSoft };
    case 'danger': return { fg: palette.danger, bg: palette.dangerSoft };
    case 'accent': return { fg: palette.accent, bg: palette.accentSoft };
    default: return { fg: palette.sub, bg: palette.soft };
  }
};

export function Button({ variant = 'primary', size = 'md', as = 'button', disabled, className, style, children, ...rest }) {
  injectStyles();
  const isLink = as !== 'button';
  const merged = {
    'data-cui': 'button',
    'data-variant': variant,
    'data-size': size,
    ...rest,
    className,
    style,
  };
  if (isLink) {
    if (disabled) merged['aria-disabled'] = 'true';
  } else if (disabled !== undefined) {
    merged.disabled = disabled;
  }
  return h(as, merged, children);
}

export function Card({ title, subtitle, footer, padded = true, style, children, ...rest }) {
  return h('section', {
    ...rest,
    style: {
      background: palette.bg,
      border: `1px solid ${palette.line}`,
      borderRadius: 14,
      padding: padded ? 20 : 0,
      boxShadow: '0 1px 2px rgba(17,24,39,.04)',
      ...style,
    },
  },
    title ? h('header', { style: { marginBottom: 12 } },
      h('h3', { style: { margin: 0, fontSize: 16, fontWeight: 700, color: palette.ink } }, title),
      subtitle ? h('p', { style: { margin: '6px 0 0', fontSize: 13, color: palette.sub } }, subtitle) : null
    ) : null,
    h('div', null, children),
    footer ? h('footer', { style: { marginTop: 16, paddingTop: 12, borderTop: `1px solid ${palette.line}` } }, footer) : null
  );
}

export function Badge({ tone: t = 'neutral', dot = false, children, style }) {
  const c = tone(t);
  return h('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 9px',
      borderRadius: 999,
      background: c.bg,
      color: c.fg,
      fontSize: 12,
      fontWeight: 600,
      ...style,
    },
  },
    dot ? h('i', { style: { width: 6, height: 6, borderRadius: 999, background: c.fg, display: 'inline-block' } }) : null,
    children
  );
}

export function Input({ label, hint, error, className, style, ...rest }) {
  injectStyles();
  return h('label', { style: { display: 'block', fontFamily: 'inherit' } },
    label ? h('span', { style: { display: 'block', fontSize: 13, fontWeight: 600, color: palette.ink, marginBottom: 6 } }, label) : null,
    h('input', {
      'data-cui': 'input',
      'data-invalid': error ? 'true' : undefined,
      ...rest,
      className,
      style,
    }),
    error ? h('span', { style: { display: 'block', marginTop: 6, fontSize: 12, color: palette.danger } }, error)
      : hint ? h('span', { style: { display: 'block', marginTop: 6, fontSize: 12, color: palette.sub } }, hint) : null
  );
}

export function Avatar({ name = '', size = 32, src, style }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((s) => s[0] || '').join('').toUpperCase();
  return h('span', {
    title: name,
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: src ? 'transparent' : palette.accentSoft,
      color: palette.accent,
      fontSize: size * 0.4,
      fontWeight: 700,
      flex: '0 0 auto',
      ...style,
    },
  }, src ? h('img', { src, alt: name, style: { width: '100%', height: '100%', objectFit: 'cover' } }) : initials);
}

export function Spinner({ size = 18, color = palette.accent, label = 'Loading' }) {
  return h('span', {
    role: 'status',
    'aria-label': label,
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: 999,
      border: `${Math.max(2, Math.round(size / 9))}px solid ${palette.line}`,
      borderTopColor: color,
      animation: 'ttc-spin .8s linear infinite',
    },
  }, h('style', null, '@keyframes ttc-spin{to{transform:rotate(360deg)}}'));
}

export function Progress({ value = 0, max = 100, tone: t = 'accent', height = 8, style }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 100)) * 100));
  const c = tone(t);
  return h('div', {
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    style: { background: palette.soft, borderRadius: 999, height, overflow: 'hidden', ...style },
  }, h('div', { style: { width: `${pct}%`, height: '100%', background: c.fg, transition: 'width .24s ease' } }));
}

export function Modal({ open, title, onClose, footer, width = 480, children }) {
  if (!open) return null;
  return h('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(17,24,39,.42)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      zIndex: 50,
    },
    onClick: onClose,
  },
    h('div', {
      onClick: (e) => e.stopPropagation(),
      style: {
        width: '100%',
        maxWidth: width,
        background: palette.bg,
        borderRadius: 16,
        padding: 22,
        boxShadow: '0 20px 48px rgba(17,24,39,.18)',
      },
    },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
        h('h3', { style: { margin: 0, fontSize: 17, fontWeight: 700, color: palette.ink } }, title),
        h('button', {
          onClick: onClose,
          'aria-label': 'Close',
          style: { border: 0, background: 'transparent', fontSize: 20, lineHeight: 1, color: palette.sub, cursor: 'pointer' },
        }, '\u00d7')
      ),
      h('div', null, children),
      footer ? h('div', { style: { marginTop: 18, display: 'flex', justifyContent: 'flex-end', gap: 8 } }, footer) : null
    )
  );
}

export function Tooltip({ label, side = 'top', className, children }) {
  injectStyles();
  if (!label) return children ?? null;
  return h('span', { 'data-cui': 'tooltip', 'data-side': side, className },
    children,
    h('span', { 'data-cui': 'tooltip-label', role: 'tooltip' }, label)
  );
}

export const tokens = palette;

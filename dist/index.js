import React from 'react';

const h = React.createElement;

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

export function Button({ variant = 'primary', size = 'md', disabled, style, children, ...rest }) {
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 22px' : '9px 16px';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: '1px solid transparent',
    borderRadius: 10,
    padding: pad,
    font: 'inherit',
    fontSize: size === 'lg' ? 16 : size === 'sm' ? 13 : 14,
    fontWeight: 600,
    lineHeight: 1.2,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'background .16s ease, border-color .16s ease, color .16s ease',
    ...style,
  };
  const variants = {
    primary: { background: palette.accent, color: '#fff' },
    secondary: { background: palette.bg, color: palette.ink, borderColor: palette.line },
    ghost: { background: 'transparent', color: palette.accent },
    danger: { background: palette.danger, color: '#fff' },
  };
  return h('button', { ...rest, disabled, style: { ...base, ...(variants[variant] || variants.primary) } }, children);
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

export function Input({ label, hint, error, style, ...rest }) {
  return h('label', { style: { display: 'block', fontFamily: 'inherit' } },
    label ? h('span', { style: { display: 'block', fontSize: 13, fontWeight: 600, color: palette.ink, marginBottom: 6 } }, label) : null,
    h('input', {
      ...rest,
      style: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '9px 12px',
        borderRadius: 10,
        border: `1px solid ${error ? palette.danger : palette.line}`,
        font: 'inherit',
        fontSize: 14,
        color: palette.ink,
        background: palette.bg,
        outline: 'none',
        ...style,
      },
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

export const tokens = palette;

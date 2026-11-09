/**
 * compass-ui / adapters
 *
 * Prop-compatibility layer for projects using shadcn/ui-style primitives.
 * Call sites stay untouched; rendering goes through compass-ui.
 *
 * Notable behaviours:
 *   - `className` is always forwarded, including from `asChild` children.
 *   - `asChild` renders the kit primitive as the child's element (e.g. <a>)
 *     instead of nesting it, so links stay valid interactive elements.
 *   - `size="icon"` maps to the kit's square icon button.
 */
import React from 'react';
import { Button, Badge, Card, Input, Progress, Avatar } from 'compass-ui';

const h = React.createElement;
const cx = (...parts) => parts.filter(Boolean).join(' ');

const variantMap = {
  default: 'primary',
  primary: 'primary',
  secondary: 'secondary',
  outline: 'secondary',
  ghost: 'ghost',
  link: 'ghost',
  destructive: 'danger',
  danger: 'danger',
};

const sizeMap = { sm: 'sm', default: 'md', md: 'md', lg: 'lg', icon: 'icon' };

const toneMap = {
  default: 'neutral',
  secondary: 'neutral',
  outline: 'neutral',
  success: 'ok',
  green: 'ok',
  warning: 'warn',
  amber: 'warn',
  destructive: 'danger',
  red: 'danger',
  accent: 'accent',
};

/** Merge a single child element into the primitive's props (shadcn `asChild`). */
function slotProps(primitiveProps, children) {
  const child = React.Children.only(children);
  const childProps = child.props || {};
  return {
    ...childProps,
    ...primitiveProps,
    as: child.type,
    className: cx(primitiveProps.className, childProps.className),
    style: { ...(childProps.style || {}), ...(primitiveProps.style || {}) },
    children: childProps.children,
  };
}

export const shadcn = {
  Button: ({ asChild = false, variant = 'default', size = 'default', className, children, ...rest }) => {
    const props = {
      ...rest,
      variant: variantMap[variant] || 'primary',
      size: sizeMap[size] || 'md',
      className,
    };
    return asChild ? h(Button, slotProps(props, children)) : h(Button, props, children);
  },

  Badge: ({ variant = 'default', className, dot = true, ...rest }) =>
    h(Badge, { ...rest, className, tone: toneMap[variant] || 'neutral', dot }),

  Card: ({ className, ...rest }) => h(Card, { ...rest, className, padded: true }),

  Input: ({ className, ...rest }) => h(Input, { ...rest, className }),

  Progress: ({ value = 0, indicatorClassName, className, ...rest }) =>
    h(Progress, { ...rest, className, value }),

  Avatar: ({ src, alt = '', className, ...rest }) =>
    h(Avatar, { ...rest, className, src, name: alt }),
};

export const tailwind = shadcn;

export default { shadcn, tailwind };

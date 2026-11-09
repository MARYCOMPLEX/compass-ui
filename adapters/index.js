/**
 * ttc-ui-kit / adapters
 *
 * Thin prop-compatibility layer for projects that currently use shadcn/ui or
 * Tailwind-styled primitives. Keeps call sites untouched while routing rendering
 * through the kit's own components.
 */
import React from 'react';
import { Button, Badge, Card, Input, Progress, Avatar } from 'compass-ui';

const h = React.createElement;

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

const sizeMap = { sm: 'sm', default: 'md', md: 'md', lg: 'lg', icon: 'sm' };

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

export const shadcn = {
  Button: ({ variant = 'default', size = 'default', className, ...rest }) =>
    h(Button, { ...rest, variant: variantMap[variant] || 'primary', size: sizeMap[size] || 'md' }),

  Badge: ({ variant = 'default', className, ...rest }) =>
    h(Badge, { ...rest, tone: toneMap[variant] || 'neutral', dot: true }),

  Card: ({ className, ...rest }) => h(Card, { ...rest, padded: true }),

  Input: ({ className, ...rest }) => h(Input, rest),

  Progress: ({ value = 0, indicatorClassName, ...rest }) => h(Progress, { ...rest, value }),

  Avatar: ({ src, alt = '', ...rest }) => h(Avatar, { ...rest, src, name: alt }),
};

export const tailwind = shadcn;

export default { shadcn, tailwind };

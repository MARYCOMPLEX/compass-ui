import type { CSSProperties, ReactNode } from 'react';

export declare function Button(props: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit';
}): JSX.Element;

export declare function Card(props: {
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  padded?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}): JSX.Element;

export type Tone = 'neutral' | 'ok' | 'warn' | 'danger' | 'accent';

export declare function Badge(props: {
  tone?: Tone;
  dot?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}): JSX.Element;

export declare function Input(props: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}): JSX.Element;

export declare function Avatar(props: {
  name?: string;
  size?: number;
  src?: string;
  style?: CSSProperties;
}): JSX.Element;

export declare function Spinner(props: { size?: number; color?: string; label?: string }): JSX.Element;

export declare function Progress(props: {
  value?: number;
  max?: number;
  tone?: Tone;
  height?: number;
  style?: CSSProperties;
}): JSX.Element;

export declare function Modal(props: {
  open?: boolean;
  title?: ReactNode;
  onClose?: () => void;
  footer?: ReactNode;
  width?: number;
  children?: ReactNode;
}): JSX.Element | null;

export declare const tokens: Record<string, string>;

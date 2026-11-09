import type { ReactNode } from 'react';

type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'danger';
type Size = 'sm' | 'default' | 'md' | 'lg' | 'icon';

export declare const shadcn: {
  Button(props: {
    asChild?: boolean;
    variant?: Variant;
    size?: Size;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }): JSX.Element;
  Badge(props: { variant?: Variant; dot?: boolean; className?: string; children?: ReactNode }): JSX.Element;
  Card(props: { className?: string; children?: ReactNode; [key: string]: any }): JSX.Element;
  Input(props: { className?: string; [key: string]: any }): JSX.Element;
  Progress(props: { value?: number; className?: string; [key: string]: any }): JSX.Element;
  Avatar(props: { src?: string; alt?: string; className?: string; [key: string]: any }): JSX.Element;
  Tooltip(props: { content?: ReactNode; side?: 'top' | 'bottom'; className?: string; children?: ReactNode }): JSX.Element;
};

export declare const tailwind: typeof shadcn;
export default shadcn;

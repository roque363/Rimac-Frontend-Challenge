import { Children, type HTMLAttributes, type ReactNode } from 'react';
import clsx from '@root/utils/clsx';
import styles from './Stack.module.scss';

type BreakKeys = 'base' | 'sm' | 'md' | 'lg' | 'xl';
type Responsive<T extends string | number | boolean> = T | Partial<Record<BreakKeys, T>>;

type Direction = 'row' | 'column';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Responsive<Direction>;
  spacing?: Responsive<number>;
  justify?: Responsive<Justify>;
  align?: Responsive<Align>;
  wrap?: Responsive<boolean>;
  divider?: ReactNode;
  children: ReactNode;
}

const mapResponsive = <T extends string | number | boolean>(
  base: string,
  val?: Responsive<T>,
  mapper?: (v: T) => string
): string[] => {
  if (val == null) return [];
  const m = (v: T) => (mapper ? mapper(v) : String(v));
  if (typeof val !== 'object') return [styles[`${base}-${m(val)}`]];
  return Object.entries(val)
    .filter(([_, v]) => v != null)
    .map(([k, v]) => styles[`${base}-${k}-${m(v as T)}`])
    .filter(Boolean);
};

const Stack = (props: StackProps) => {
  const {
    direction = 'column',
    spacing = 0,
    justify,
    align,
    wrap,
    divider,
    className = '',
    children,
    ...rest
  } = props;

  const dir = mapResponsive('dir', direction);
  const gap = mapResponsive('gap', spacing, (n) => String(n));
  const just = mapResponsive('justify', justify);
  const ali = mapResponsive('align', align);
  const wrp = mapResponsive('wrap', wrap, (v) => (v ? 'on' : 'off'));

  const cls = clsx(styles.stack, ...dir, ...gap, ...just, ...ali, ...wrp, className);

  let content = children;
  if (divider) {
    const items = Children.toArray(children);
    content = items.flatMap((child, idx) =>
      idx < items.length - 1
        ? [
            child,
            <span key={idx} className={styles.divider}>
              {divider}
            </span>,
          ]
        : [child]
    );
  }

  return (
    <div className={cls} {...rest}>
      {content}
    </div>
  );
};

export default Stack;

import React from 'react';

import styles from './Container.module.scss';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type MaxWidthProp = Breakpoint | false | number | string;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
  maxWidth?: MaxWidthProp; // default 'lg'
  disableGutters?: boolean; // default false
  fixed?: boolean; // default false
}

const isBp = (v: unknown): v is Breakpoint =>
  typeof v === 'string' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(v);

const mapClassByBp: Record<Breakpoint, string> = {
  xs: styles.maxWidthXS,
  sm: styles.maxWidthSM,
  md: styles.maxWidthMD,
  lg: styles.maxWidthLG,
  xl: styles.maxWidthXL,
};

export const Container = React.forwardRef<HTMLElement, ContainerProps>((props, ref) => {
  const {
    component: Component = 'div',
    maxWidth = 'lg',
    disableGutters = false,
    fixed = false,
    className,
    style,
    ...rest
  } = props;

  const classes = [
    styles.root,
    disableGutters && styles.disableGutters,
    fixed && styles.fixed,
    !fixed && isBp(maxWidth) && mapClassByBp[maxWidth],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // En fluid: soporta maxWidth numérico o string custom. maxWidth={false} => sin tope
  const inlineStyle: React.CSSProperties = { ...style };
  if (!fixed) {
    if (maxWidth === false) {
      inlineStyle.maxWidth = 'none';
    } else if (!isBp(maxWidth)) {
      inlineStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : (maxWidth as string);
    }
  }

  return <Component ref={ref} className={classes} style={inlineStyle} {...rest} />;
});

Container.displayName = 'Container';

export default Container;

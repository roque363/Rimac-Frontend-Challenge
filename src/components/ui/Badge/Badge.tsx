import { type ComponentProps } from 'react';
import clsx from '@root/utils/clsx';
import styles from './Badge.module.scss';

export interface BadgeProps extends ComponentProps<'span'> {
  asChild?: boolean;
}

const Badge = (props: BadgeProps) => {
  const { children, className, ...rest } = props;
  return (
    <span className={clsx(styles.badge, className)} {...rest}>
      <span className={styles.badge__text}>{children}</span>
    </span>
  );
};

export default Badge;

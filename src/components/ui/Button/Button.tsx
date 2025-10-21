import React from 'react';
import styles from './Button.module.scss';

type ButtonSize = 'large' | 'medium';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: ButtonSize;
}

export default function Button({
  size = 'medium',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, `${styles.button + '--' + size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

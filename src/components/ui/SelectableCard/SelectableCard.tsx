import React from 'react';
import CheckIcon from '@root/assets/icons/icon-check.svg';
import styles from './SelectableCard.module.scss';
import clsx from '@root/utils/clsx';

type SelectableCardProps = {
  children: React.ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
  'aria-label'?: string;
};

const SelectableCard = (props: SelectableCardProps) => {
  const {
    children,
    selectable = true,
    selected = false,
    onSelect,
    className = '',
    ...rest
  } = props;

  const classes = clsx(
    styles.card,
    selectable && styles['card--selectable'],
    selected && styles['card--selected'],
    className
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      className={classes}
      role={selectable ? 'radio' : undefined}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : -1}
      onClick={selectable ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {selectable &&
        (selected ? (
          <img src={CheckIcon} alt="" aria-hidden="true" className={styles.card__indicator} />
        ) : (
          <span className={styles.card__indicator} aria-hidden="true" />
        ))}
      {children}
    </div>
  );
};

export default SelectableCard;

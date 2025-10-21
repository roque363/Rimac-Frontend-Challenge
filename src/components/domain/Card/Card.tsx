import type { ReactNode } from 'react';
import CheckIcon from '@root/assets/icons/icon-check.svg';
import styles from './Card.module.scss';

export interface ICardProps {
  children: ReactNode;
  isSelectable?: boolean;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Card: React.FC<ICardProps> = ({
  children,
  isSelectable = false,
  isSelected = false,
  onClick = () => {},
}) => {
  const cardClasses = `${styles.card} ${isSelectable ? styles.selectable : ''} ${isSelected ? styles.selected : ''}`;
  const handleClick = isSelectable ? onClick : undefined;

  return (
    <div className={cardClasses} onClick={handleClick}>
      {isSelectable ? (
        isSelected ? (
          <img src={CheckIcon} alt="Card seleccionado" className={styles.card__check} />
        ) : (
          <span className={styles.card__circle} data-testid="selection-circle"></span>
        )
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default Card;

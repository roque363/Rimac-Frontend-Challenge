import type { User } from '@root/types/domain/user';
import type { Plan } from '@root/types/domain/plan';
import PeopleIcon from '@root/assets/icons/icon-family.svg';
import { SelectableCard } from '@root/components/ui';
import styles from './SummaryUserCard.module.scss';

type SummaryUserCardProps = {
  user: User;
  userAge?: number;
  selectedPlan: Plan;
  quoteFor?: 'me' | 'someone';
};

function formatCurrency(value: number) {
  return `$ ${value.toFixed(2)}`;
}

const SummaryUserCard = (props: SummaryUserCardProps) => {
  const { user, userAge, selectedPlan, quoteFor = 'me' } = props;

  return (
    <SelectableCard selectable={false} className={styles.card}>
      <div className={styles.info}>
        <p className={styles.info__label}>Precios calculados para:</p>
        <div className={styles.info__header}>
          <img src={PeopleIcon} alt="" aria-hidden="true" className={styles.info__avatar} />
          <h2 className={styles.info__name}>
            {user.name} {user.lastName}
            {typeof userAge === 'number' && <span className={styles.info__age}></span>}
          </h2>
        </div>
        <span className={styles.info__separator} />
        <div className={styles.info__group}>
          <h3 className={styles.info__subtitle}>Responsable de pago</h3>
          <p>
            Documento: {user.documentType} {user.documentNumber}
          </p>
          <p>Celular: {user.phone}</p>
        </div>
        <div className={styles.info__group}>
          <h3 className={styles.info__subtitle}>Plan elegido</h3>
          <p className={styles.info__planName}>{selectedPlan.name}</p>
          <p className={styles.info__costLine}>
            Costo del plan:{' '}
            {quoteFor === 'someone' && (
              <span className={styles.info__pastPrice}>
                {formatCurrency(selectedPlan.price)} antes
              </span>
            )}{' '}
            <strong>
              {formatCurrency(
                quoteFor === 'someone' ? Number(selectedPlan.discountPrice) : selectedPlan.price
              )}
            </strong>{' '}
            al mes
          </p>
        </div>
      </div>
    </SelectableCard>
  );
};

export default SummaryUserCard;

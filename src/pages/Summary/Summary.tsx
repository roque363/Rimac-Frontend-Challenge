import { useNavigate } from 'react-router-dom';
import { useQuote } from '@root/hooks/useQuote';
import Stepper from '@root/components/ui/Stepper';
import Container from '@root/components/ui/Container';
import BackArrowBlueIcon from '@root/assets/icons/icon-back-arrow-blue.svg';
import styles from './Summary.module.scss';
import SummaryUserCard from '@root/components/domain/SummaryUserCard';

const Summary = () => {
  const navigate = useNavigate();
  const { state, userAge } = useQuote();
  const { user, selectedPlan, quoteFor } = state;

  if (!user || !selectedPlan) return null;

  return (
    <section>
      <Stepper currentStep={2} totalSteps={2} />
      <Container maxWidth="md">
        <div className={styles['summary-bg']}>
          <a onClick={() => navigate('/planes')} className={styles.back}>
            <img src={BackArrowBlueIcon} alt="Volver" className={styles.back__img} />
            <p className={styles.back__text}>Volver</p>
          </a>
          <div className={styles.header}>
            <div className={styles.text}>
              <h1 className={styles.text__title}>Resumen del seguro </h1>
            </div>
          </div>
          <div>
            <SummaryUserCard
              user={user}
              userAge={userAge}
              selectedPlan={selectedPlan}
              quoteFor={quoteFor}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Summary;

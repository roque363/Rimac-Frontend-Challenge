import { useNavigate } from 'react-router-dom';
import { useQuote } from '@root/hooks/useQuote';
import { usePlans } from '@root/hooks/usePlans';
import ProtectionIcon from '@root/assets/icons/icon-protection-light.svg';
import UserIcon from '@root/assets/icons/icon-user-light.svg';
import BackArrowBlueIcon from '@root/assets/icons/icon-back-arrow-blue.svg';
import type { Plan } from '@root/types/domain/plan';
import Stepper from '@root/components/ui/Stepper';
import Container from '@root/components/ui/Container';
import styles from './Plans.module.scss';
import QuoteTargetSelector, {
  type QuoteTargetOption,
} from '@root/components/domain/QuoteTargetSelector';
import PlansCarousel from '@root/components/domain/PlansCarousel';

const options: QuoteTargetOption[] = [
  {
    id: 'me',
    title: 'Para mí',
    description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
    icon: ProtectionIcon,
  },
  {
    id: 'someone',
    title: 'Para alguien más',
    description: 'Realiza una cotización para uno de tus familiares o cualquier persona.',
    icon: UserIcon,
  },
];

const Plans = () => {
  const { state, userAge, setQuoteFor, selectPlan } = useQuote();
  const { visiblePlans, loading, error } = usePlans(userAge);
  const navigate = useNavigate();

  const handleSelectPlan = (p: Plan) => {
    selectPlan(p);
    navigate('/resumen');
  };

  if (!state.user || !visiblePlans) {
    navigate('/404');
    return;
  }

  return (
    <section>
      <Stepper currentStep={1} totalSteps={2} onBackHref="/" />
      <Container>
        <div className={styles['plans-bg']}>
          <a href="/" className={styles.back}>
            <img src={BackArrowBlueIcon} alt="Volver" className={styles.backButton__img} />
            <p className={styles.back__text}>Volver</p>
          </a>
          <div className={styles.header}>
            <div className={styles.text}>
              <h1 className={styles.text__title}>{state.user.name} ¿Para quién deseas cotizar?</h1>
              <p className={styles.text__description}>
                Selecciona la opción que se ajuste más a tus necesidades.
              </p>
            </div>
            <QuoteTargetSelector
              options={options}
              selectedId={state.quoteFor}
              onChange={setQuoteFor}
              name="¿Para quién deseas cotizar?"
            />
          </div>
          {loading && <div className={styles.feedback}>Cargando planes…</div>}
          {!!error && !loading && (
            <div className={styles.feedbackError}>
              Ocurrió un error cargando los planes. Intenta nuevamente.
            </div>
          )}
          {state.quoteFor && (
            <PlansCarousel
              plans={visiblePlans}
              isForSomeone={state.quoteFor === 'someone'}
              onSelectPlan={handleSelectPlan}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Plans;

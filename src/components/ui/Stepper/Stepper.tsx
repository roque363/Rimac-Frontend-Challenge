import BackArrowGrayIcon from '@root/assets/icons/icon-back-arrow-gray.svg';
import clsx from '@root/utils/clsx';
import styles from './Stepper.module.scss';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onBackHref?: string;
  className?: string;
}

const Stepper = (props: StepperProps) => {
  const { currentStep, totalSteps, onBackHref = '/', className = '' } = props;

  const rootCls = clsx(styles.stepper, className);

  return (
    <div className={rootCls}>
      <div className={styles.stepper__mobile}>
        <a href={onBackHref} className={styles.stepper__back} aria-label="Volver">
          <img src={BackArrowGrayIcon} alt="" aria-hidden="true" />
        </a>
        <p className={styles.stepper__text}>
          Paso {currentStep} de {totalSteps}
        </p>
        <div className={styles.stepper__bar} aria-hidden="true">
          <span
            className={styles.stepper__barFill}
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      <div className={styles.stepper__desktop}>
        <div
          className={`${styles.stepper__step} ${styles['is-active']}`}
          aria-current={currentStep === 1 ? 'step' : undefined}
        >
          <span className={styles.stepper__number}>
            <span>1</span>
          </span>
          <p className={styles.stepper__label}>Planes y coberturas</p>
        </div>
        <span className={styles.stepper__line} aria-hidden="true" />
        <div
          className={`${styles.stepper__step} ${
            currentStep === 2 ? styles['is-active'] : styles['is-disabled']
          }`}
          aria-current={currentStep === 2 ? 'step' : undefined}
        >
          <span className={styles.stepper__number}>
            <span>2</span>
          </span>
          <p className={styles.stepper__label}>Resumen</p>
        </div>
      </div>
    </div>
  );
};

export default Stepper;

import React from 'react';
import type { Plan } from '@root/types/domain/plan';
import SelectableCard from '@root/components/ui/SelectableCard/SelectableCard';
import Button from '@root/components/ui/Button/Button';
import BackArrowBlueIcon from '@root/assets/icons/icon-back-arrow-blue.svg';
import BackArrowGrayIcon from '@root/assets/icons/icon-back-arrow-gray.svg';
import NextArrowBlueIcon from '@root/assets/icons/icon-next-arrow-blue.svg';
import NextArrowGrayIcon from '@root/assets/icons/icon-next-arrow-gray.svg';
import styles from './PlansCarousel.module.scss';

type PlansCarouselProps = {
  plans: Plan[];
  isForSomeone: boolean;
  onSelectPlan: (plan: Plan) => void;
};

const PlansCarousel = (props: PlansCarouselProps) => {
  const { plans, isForSomeone, onSelectPlan } = props;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState(1);

  const total = plans.length;

  const scrollBySlide = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.firstElementChild?.clientWidth ?? 0;
    track.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handler = () => {
      const width = track.firstElementChild?.clientWidth ?? 1;
      const i = Math.round(track.scrollLeft / width) + 1;
      setCurrent(Math.min(Math.max(i, 1), total));
    };
    track.addEventListener('scroll', handler, { passive: true });
    return () => track.removeEventListener('scroll', handler);
  }, [total]);

  return (
    <section className={styles.plansCarousel}>
      <div ref={trackRef} className={styles.track} aria-roledescription="carousel">
        {plans.map((plan) => {
          const price = isForSomeone && plan.discountPrice ? plan.discountPrice : plan.price;
          return (
            <article key={plan.id} className={styles.slide}>
              <SelectableCard selectable={false} className={styles.card}>
                <div className={styles.plan}>
                  <header className={styles.plan__header}>
                    <div className={styles.plan__title}>
                      <h3 className={styles.plan__titleText}>{plan.name}</h3>
                      {plan.icon && <img src={plan.icon} alt="" aria-hidden="true" />}
                    </div>
                    <div className={styles.plan__cost}>
                      <p className={styles.plan__costLabel}>Costo del plan</p>
                      {isForSomeone && (
                        <p className={styles.plan__costPast}>S/ {plan.price} antes</p>
                      )}
                      <p className={styles.plan__costValue}>S/ {price} al mes</p>
                    </div>
                  </header>
                  <span className={styles.plan__separator} />
                  <ul className={styles.plan__list}>
                    {plan.description.map((item) => (
                      <li key={item} className={styles.plan__item}>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.plan__cta}>
                    <Button size="large" onClick={() => onSelectPlan(plan)}>
                      Seleccionar Plan
                    </Button>
                  </div>
                </div>
              </SelectableCard>
            </article>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <img
          className={styles.pagination__arrow}
          src={current === 1 ? BackArrowGrayIcon : BackArrowBlueIcon}
          alt="Plan anterior"
          onClick={() => scrollBySlide(-1)}
        />
        <span className={styles.pagination__numbers}>
          {current} / {total}
        </span>
        <img
          className={styles.pagination__arrow}
          src={current === total ? NextArrowGrayIcon : NextArrowBlueIcon}
          alt="Siguiente plan"
          onClick={() => scrollBySlide(1)}
        />
      </div>
    </section>
  );
};

export default PlansCarousel;

import SelectableCard from '@root/components/ui/SelectableCard';
import clsx from '@root/utils/clsx';
import styles from './QuoteTargetSelector.module.scss';

export type QuoteTargetOption = {
  id: 'me' | 'someone';
  title: string;
  description: string;
  icon: string;
};

export type QuoteTargetSelectorProps = {
  options: QuoteTargetOption[];
  selectedId?: QuoteTargetOption['id'];
  onChange: (id: QuoteTargetOption['id']) => void;
  className?: string;
  name?: string;
};

const PlanTargetSelector = (props: QuoteTargetSelectorProps) => {
  const { options, selectedId, onChange, className = '', name = 'quote-target' } = props;

  return (
    <div className={clsx(styles.selector, className)} role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <SelectableCard
          key={opt.id}
          selectable
          selected={selectedId === opt.id}
          onSelect={() => onChange(opt.id)}
          aria-label={opt.title}
          className={styles.selector__item}
        >
          <div className={styles.option}>
            <div className={styles.option__header}>
              <img src={opt.icon} alt="" aria-hidden="true" className={styles.option__icon} />
              <h3 className={styles.option__title}>{opt.title}</h3>
            </div>
            <p className={styles.option__desc}>{opt.description}</p>
          </div>
        </SelectableCard>
      ))}
    </div>
  );
};

export default PlanTargetSelector;

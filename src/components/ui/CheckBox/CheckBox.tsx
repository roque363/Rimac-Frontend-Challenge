import styles from './CheckBox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CheckBox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
  return (
    <label className={styles.checkbox}>
      <span>{label}</span>
      <input type="checkbox" className={styles.checkbox__input} {...rest} />
      <span className={styles.checkbox__checkmark}></span>
    </label>
  );
};

export default CheckBox;

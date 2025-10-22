import ExclamationIcon from '@root/assets/icons/exclamation-circle.svg';
import styles from './ErrorText.module.scss';

interface ErrorTextProps {
  text: string;
}

const ErrorText = (props: ErrorTextProps) => {
  const { text } = props;

  return (
    <div className={styles.root}>
      <div className={styles.root__icon}>
        <img src={ExclamationIcon} alt="alert icon" />
      </div>
      <p className={styles.root__message}>{text}</p>
    </div>
  );
};

export default ErrorText;

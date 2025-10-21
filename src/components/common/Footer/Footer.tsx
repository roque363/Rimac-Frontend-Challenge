import RimacLogo from '@root/assets/icons/logo-rimac-white.svg';
import RimacLogo2 from '@root/assets/icons/logo-rimac-white-2.svg';
import styles from './Footer.module.scss';
import Container from '@root/components/ui/Container';
import clsx from '@root/utils/clsx';

var today = new Date();
var year = today.getFullYear();

const Footer = () => {
  return (
    <section className={styles.footer}>
      <Container>
        <div className={styles.footer__content}>
          <div className={clsx(styles['logo--desktop'])}>
            <img src={RimacLogo2} alt="Rimac logo" />
          </div>
          <div className={clsx(styles['logo--mobile'])}>
            <img src={RimacLogo} alt="Rimac logo" />
          </div>
          <div className={styles.footer__content__divider}>
            <div></div>
          </div>
          <div className={styles.footer__content__text}>© {year} RIMAC Seguros y Reaseguros.</div>
        </div>
      </Container>
    </section>
  );
};

export default Footer;

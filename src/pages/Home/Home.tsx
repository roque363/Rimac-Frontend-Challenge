import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '@root/hooks/useQuote';
import { useUser } from '@root/hooks/useUser';
import { homeSchema } from '@root/schemas/homeForm.schema';
import { zodErrorsByField } from '@root/utils/zod';
import Container from '@root/components/ui/Container';
import BannerHome from '@root/assets/images/banner-home.png';
import styles from './Home.module.scss';
import Badge from '@root/components/ui/Badge';
import Button from '@root/components/ui/Button';
import TextField from '@root/components/ui/TextField';
import CheckBox from '@root/components/ui/CheckBox';
import Select from '@root/components/ui/Select';
import Stack from '@root/components/ui/Stack';
import Footer from '@root/components/common/Footer';
import ErrorText from '@root/components/ui/ErrorText';

const documentOptions = [
  { value: 'DNI', text: 'DNI' },
  { value: 'CE', text: 'CE' },
];

const Home = () => {
  const navigate = useNavigate();
  const { state, setForm, setUser } = useQuote();
  const { loading, submitUserForm } = useUser();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const onChange =
    (k: 'documentNumber' | 'phone' | 'privacy' | 'comms') =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const onSelect = (k: 'documentType') => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ [k]: e.target.value as any });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = homeSchema.safeParse(state.form);
    setErrors({});
    setErrorAlert(null);
    if (!parsed.success) {
      setErrors(zodErrorsByField(parsed.error));
      return;
    }

    try {
      const fullUser = await submitUserForm(state.form);
      setUser(fullUser);
      navigate('/planes');
    } catch (err) {
      setErrorAlert('Hubo un error al enviar tus datos. Intenta nuevamente.');
    }
  }

  console.log('errors', errors);

  return (
    <section className={styles['home-bg']}>
      <Container className={styles['home-bg__container']}>
        <div className={styles.grid}>
          <div className={styles['grid--left']}>
            <img src={BannerHome} alt="Creado para ti y tu familia" className={styles.image} />
          </div>
          <div className={styles['grid--right']}>
            <div className={styles.header}>
              <div className={styles.header__content}>
                <Badge>Seguro Salud Flexible</Badge>
                <h1 className={styles.header__content__title}>Creado para ti y tu familia</h1>
              </div>
              <div className={styles.header__hero}>
                <img src={BannerHome} alt="Creado para ti y tu familia" />
              </div>
            </div>
            <div className={styles.description}>
              <p>
                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
                online.
              </p>
            </div>
            <form onSubmit={onSubmit} className={styles.form}>
              <Stack spacing={6}>
                <Stack spacing={4}>
                  <div className={styles.form__col}>
                    <Stack direction="row" style={{ width: '100%' }}>
                      <Select
                        variant="right"
                        value={state.form.documentType}
                        onChange={onSelect('documentType')}
                        options={documentOptions}
                        isValid={true}
                      />
                      <TextField
                        variant="left"
                        name="document"
                        type="number"
                        label="Nro. de documento"
                        value={state.form.documentNumber}
                        onChange={onChange('documentNumber')}
                        error={errors.documentNumber}
                        style={{ flexGrow: 1 }}
                      />
                    </Stack>
                    {errors.documentNumber && <ErrorText text={errors.documentNumber} />}
                  </div>
                  <div className={styles.form__col}>
                    <TextField
                      name="phone"
                      type="number"
                      label="Celular"
                      maxLength={9}
                      value={state.form.phone}
                      onChange={onChange('phone')}
                      error={errors.phone}
                      style={{ flexGrow: 1 }}
                    />
                    {errors.phone && <ErrorText text={errors.phone} />}
                  </div>
                </Stack>
                <Stack spacing={3}>
                  <CheckBox
                    label="Acepto la Política de Privacidad"
                    checked={!!state.form.privacy}
                    onChange={onChange('privacy')}
                  />
                  <CheckBox
                    label="Acepto la Política Comunicaciones Comerciales"
                    checked={!!state.form.comms}
                    onChange={onChange('comms')}
                  />
                  <p className={styles['form__terms-privacy']}>
                    <a target="_blank" rel="noopener noreferrer" href="#">
                      Aplican Términos y Condiciones.
                    </a>
                  </p>
                </Stack>
                <Button type="submit" disabled={loading}>
                  Cotiza aquí
                </Button>
                {errors.privacy && <p className={styles.form__error}>{errors.privacy}</p>}
                {errorAlert && <p className={styles.form__error}>{errorAlert}</p>}
              </Stack>
            </form>
          </div>
        </div>
        <>
          <div className={styles['home-bg--purple']}></div>
          <div className={styles['home-bg--green']}></div>
        </>
      </Container>
      <Footer />
    </section>
  );
};

export default Home;

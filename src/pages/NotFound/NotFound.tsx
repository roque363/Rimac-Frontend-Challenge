import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@root/components/ui';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/', { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <div className={styles.notfound}>
        <h1>404 - Página no encontrada</h1>
        <p>Redirigiendo al inicio...</p>
      </div>
    </Container>
  );
};

export default NotFound;

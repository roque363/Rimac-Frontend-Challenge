import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import Container from '@root/components/ui/Container';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/', { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <div className={styles.notfound}>
        <h1>404 – Página no encontrada</h1>
        <p>Redirigiendo al inicio...</p>
      </div>
    </Container>
  );
};

export default NotFound;

import { Routes, Route } from 'react-router-dom';

import Layout from '@root/layout/Layout';
import Home from '@root/pages/Home';
import Pricing from '@root/pages/Plans';
import Summary from '@root/pages/Summary';
import NotFound from '@root/pages/NotFound';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Pricing />} />
        <Route path="/resumen" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;

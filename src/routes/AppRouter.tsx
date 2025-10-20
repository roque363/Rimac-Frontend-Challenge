import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@root/pages/Home';
import Pricing from '@root/pages/Plans';
import Summary from '@root/pages/Summary';
import NotFound from '@root/pages/NotFound';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;

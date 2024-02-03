import {Navigate, Route, Routes} from 'react-router-dom';

import {Landing} from './Landing/Landing';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

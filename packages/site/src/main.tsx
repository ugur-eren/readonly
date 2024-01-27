import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import './index.css';

const Root: React.FC = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as unknown as HTMLElement);

root.render(<Root />);

import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {MetaMaskProvider, SnapAccountsProvider} from './hooks';

import './index.css';

const Root: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <MetaMaskProvider>
          <SnapAccountsProvider>
            <App />
          </SnapAccountsProvider>
        </MetaMaskProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as unknown as HTMLElement);

root.render(<Root />);

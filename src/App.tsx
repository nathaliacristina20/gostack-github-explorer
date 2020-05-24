/* eslint-disable @typescript-eslint/interface-name-prefix */
import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { IntlUniversalProvider } from './hooks/IntlUniversalContext';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <IntlUniversalProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </IntlUniversalProvider>
    </>
  );
};

export default App;

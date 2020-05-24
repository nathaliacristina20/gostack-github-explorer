import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import intl from 'react-intl-universal';

import ptBR from '../locales/pt-BR.json';
import enUS from '../locales/en-US.json';

import usePersistedState from '../utils/usePersistedState';

interface IIntlUniversalContextData {
  changeCurrentLocale(): void;
  initDone?: boolean;
  currentLanguage: string;
}

interface ILocales {
  [key: string]: {};
}

const IntlUniversalContext = createContext<IIntlUniversalContextData>(
  {} as IIntlUniversalContextData,
);

const IntlUniversalProvider: React.FC = ({ children }) => {
  const [locales] = useState<ILocales>({
    'pt-BR': ptBR,
    'en-US': enUS,
  });

  const [currentLanguage, setCurrentLanguage] = usePersistedState(
    'language',
    'pt-BR',
  );

  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    const currentLocale = locales[currentLanguage] ? currentLanguage : 'pt-BR';
    intl
      .init({
        currentLocale,
        locales,
      })
      .then(() => {
        setInitDone(true);
      });
  }, [currentLanguage, locales]);

  const changeCurrentLocale = useCallback(() => {
    setCurrentLanguage(currentLanguage === 'pt-BR' ? 'en-US' : 'pt-BR');
  }, [currentLanguage, setCurrentLanguage]);

  return (
    <IntlUniversalContext.Provider
      value={{ changeCurrentLocale, currentLanguage }}
    >
      {initDone && children}
    </IntlUniversalContext.Provider>
  );
};

function useIntlUniversal(): IIntlUniversalContextData {
  const context = useContext(IntlUniversalContext);

  if (!context) {
    throw new Error(
      'useIntlUniversal must be used withing a IntlUniversalProvider',
    );
  }

  return context;
}

export { IntlUniversalProvider, useIntlUniversal };

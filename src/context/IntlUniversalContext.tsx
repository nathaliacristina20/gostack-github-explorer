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

interface IIntlUniversalContextData {
  changeCurrentLocale(language: string): void;
  initDone?: boolean;
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

  const [currentLanguage, setCurrentLanguage] = useState('pt-BR');

  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    const currentLocale = locales[currentLanguage] ? currentLanguage : 'pt-BR';
    intl
      .init({
        currentLocale,
        locales,
      })
      .then(() => {
        console.log('IntlUniversalContext 1', intl.get('home.title'));
        setInitDone(true);
      });
  }, [currentLanguage, locales]);

  console.log('IntlUniversalContext 2', intl.get('home.title'));

  const changeCurrentLocale = useCallback((language: string) => {
    setCurrentLanguage(language);
  }, []);

  return (
    <IntlUniversalContext.Provider value={{ changeCurrentLocale }}>
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

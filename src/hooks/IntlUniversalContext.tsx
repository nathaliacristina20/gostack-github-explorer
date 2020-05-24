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
  currentLanguage: ILanguage;
}

interface ILocales {
  [key: string]: {};
}

interface ILanguage {
  language: string;
}

const IntlUniversalContext = createContext<IIntlUniversalContextData>(
  {} as IIntlUniversalContextData,
);

const IntlUniversalProvider: React.FC = ({ children }) => {
  const [locales] = useState<ILocales>({
    'pt-BR': ptBR,
    'en-US': enUS,
  });

  const [currentLanguage, setCurrentLanguage] = usePersistedState<ILanguage>(
    'currentLanguage',
    { language: 'pt-BR' },
  );

  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    intl
      .init({
        currentLocale: currentLanguage.language,
        locales,
      })
      .then(() => {
        setInitDone(true);
      });

    setInitDone(false);
  }, [currentLanguage, locales]);

  const changeCurrentLocale = useCallback(() => {
    let changedLanguage;
    if (currentLanguage.language === 'pt-BR') {
      changedLanguage = 'en-US';
    } else {
      changedLanguage = 'pt-BR';
    }

    setCurrentLanguage({ language: changedLanguage });
  }, [currentLanguage, setCurrentLanguage]);

  return (
    <IntlUniversalContext.Provider
      value={{ changeCurrentLocale, currentLanguage }}
    >
      {children}
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

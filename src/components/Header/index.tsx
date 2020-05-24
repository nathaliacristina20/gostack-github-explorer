/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { useIntlUniversal } from '../../hooks/IntlUniversalContext';

import logoImg from '../../assets/logo.svg';

import BrFlag from '../../assets/br-flag.png';
import UsFlag from '../../assets/us-flag.png';

import { Container, Languages } from './styles';

const Header: React.FC = ({ children }) => {
  const { changeCurrentLocale, currentLanguage } = useIntlUniversal();

  return (
    <>
      <Languages currentLanguage={currentLanguage.language}>
        <img
          src={BrFlag}
          height={20}
          className="ptBR"
          onClick={changeCurrentLocale}
        />
        <img
          src={UsFlag}
          height={20}
          className="enUS"
          onClick={changeCurrentLocale}
        />
      </Languages>
      <Container>
        <img src={logoImg} alt="Github Explore" />

        {children}
      </Container>
    </>
  );
};

export default Header;

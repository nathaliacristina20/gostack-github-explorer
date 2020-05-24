import React, { useRef } from 'react';
import Switch from 'react-switch';

import { useIntlUniversal } from '../../hooks/IntlUniversalContext';

import logoImg from '../../assets/logo.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  const { changeCurrentLocale, currentLanguage } = useIntlUniversal();

  return (
    <Container>
      <img src={logoImg} alt="Github Explore" />

      <Switch
        onChange={changeCurrentLocale}
        checked={currentLanguage === 'pt-BR'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor="#333"
        onColor="#04d361"
      />
    </Container>
  );
};

export default Header;

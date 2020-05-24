import styled, { css } from 'styled-components';

interface ITeste {
  currentLanguage: string;
}
export const Languages = styled.div<ITeste>`
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  img {
    margin-right: 15px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .ptBR {
    ${(props) =>
      props.currentLanguage === 'pt-BR' &&
      css`
        box-shadow: 0 0 5px 3px #04d361;
      `}
  }

  .enUS {
    ${(props) =>
      props.currentLanguage === 'en-US' &&
      css`
        box-shadow: 0 0 5px 3px #b22222;
      `}
  }
`;

export const Container = styled.div`
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }
  }

  svg {
    margin-right: 4px;
  }
`;

import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  typeStyle?: 'primary' | 'secondary' | 'info' | 'error';
}

const buttonTypeVariantions = {
  primary: css`
    background: #273c64;
    color: #ffffff;
    &:hover {
      background: ${shade(0.2, '#273C64')};
    }
  `,
  secondary: css`
    background: #c7d6ff;
    color: #3e3e3e;
    &:hover {
      background: ${shade(0.2, '#c7d6ff')};
    }
  `,
  info: css`
    background: #a1a1b6;
    color: #3172b7;
    &:hover {
      background: ${shade(0.2, '#a1a1b6')};
    }
  `,
  error: css`
    background: #d74747;
    color: #ffffff;
    &:hover {
      background: ${shade(0.2, '#d74747')};
    }
  `,
};

export const Container = styled.div<ButtonProps>`
  button {
    background: #273c64;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #ffffff;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    ${props => buttonTypeVariantions[props.typeStyle || 'primary']}
  }
`;

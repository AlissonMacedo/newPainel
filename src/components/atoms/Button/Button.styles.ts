import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  typeStyle?: 'primary' | 'secondary' | 'info' | 'error';
}

const buttonTypeVariantions = {
  primary: css`
    background: ${props => props.theme.colors.cyan800};
    color: ${props => props.theme.colors.white};
    &:hover {
      background: ${props => shade(0.2, `${props.theme.colors.cyan800}`)};
    }
  `,
  secondary: css`
    background: ${props => props.theme.colors.gray500};
    color: ${props => props.theme.colors.gray800};
    &:hover {
      background: ${props => shade(0.2, `${props.theme.colors.gray500}`)};
    }
  `,
  info: css`
    background: ${props => props.theme.colors.cyan50};
    color: ${props => props.theme.colors.cyan500};
    &:hover {
      background: ${props => shade(0.2, `${props.theme.colors.cyan50}`)};
    }
  `,
  error: css`
    background: ${props => props.theme.colors.red800};
    color: ${props => props.theme.colors.white};

    &:hover {
      background: ${props => shade(0.2, `${props.theme.colors.red800}`)};
    }
  `,
};

export const Container = styled.div<ButtonProps>`
  button {
    background: ${props => props.theme.colors.red800};
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: ${props => props.theme.colors.white};
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    ${props => buttonTypeVariantions[props.typeStyle || 'primary']}
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 5px;
    }
  }
`;

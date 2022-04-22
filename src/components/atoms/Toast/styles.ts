/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'alert';
  description: boolean;
}

const toastTypeVariantions = {
  info: css`
    background: #e6fffa;
    color: #3172b7;
  `,
  success: css`
    background: #c0e2bc;
    color: #47aa3a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
  alert: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div) <ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;

  display: flex;

  & + div {
    margin-top: 8px;
  }
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  background: #ebf8ff;
  color: #3172b7;

  ${props => toastTypeVariantions[props.type || 'info']};

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.description &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

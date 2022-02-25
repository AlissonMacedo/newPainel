import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip';

interface inputProps {
  error?: boolean;
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  background: #ffff;
  border-radius: 10px;
  border: 2px solid #bbbbbb;
  padding: 16px;
  width: 100%;
  color: #b2b2b2;

  display: flex;
  align-items: center;

  ${props =>
    props.isFocus &&
    css`
      color: #00dedb;
      border-color: #00dedb;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #00dedb;
    `}

  ${props =>
    props.isErrored &&
    css`
      color: #eb3f3f;
      border-color: #eb3f3f;
    `}

  input {
    flex: 1;
    background-color: transparent;
    border: 0px;

    &::placeholder {
      color: #969696;
    }
  }

  input:focus {
    outline: none;
  }

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
  }

  &::before {
    border-color: #c53030 transparent;
  }
`;

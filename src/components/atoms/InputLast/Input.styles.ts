import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip';

interface inputProps {
  error?: boolean;
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  border: ${props => `2px solid ${props.theme.colors.gray200}`};
  padding: 16px;
  width: 100%;
  color: ${props => props.theme.colors.gray200};

  display: flex;
  align-items: center;

  ${props =>
    props.isFocus &&
    css`
      color: ${props.theme.colors.cyan300};
      border-color: ${props.theme.colors.cyan300};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.cyan300};
    `}

  ${props =>
    props.isErrored &&
    css`
      color: ${props.theme.colors.red800};
      border-color: ${props.theme.colors.red800};
    `}

  input {
    flex: 1;
    background-color: transparent;
    border: 0px;

    &::placeholder {
      color: ${props => props.theme.colors.gray100};
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
    background: ${props => props.theme.colors.red800};
    color: #fff;
  }

  &::before {
    border-color: ${props => `${props.theme.colors.red800} transparent`};
  }
`;

/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';
import { Tooltip } from '../../atoms/Tooltip';

interface inputProps {
  error?: boolean;
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<inputProps>`
  flex-direction: column;

  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  border: ${props => `2px solid ${props.theme.colors.gray200}`};
  padding: 5px 16px;
  width: 100%;
  color: ${props => props.theme.colors.gray200};

  display: flex;
  align-items: center;

  ${props =>
    props.isFocus &&
    css`
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

  div {
    margin-top: 0px !important;
  }

  > div.label {
    width: 100%;

    strong {
      color: ${props =>
    props.isFocus ? props.theme.colors.cyan300 : props.theme.text.gray350};
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 10px;
    }
  }

  input {
    background-color: transparent;
    margin-top: 5px;
    padding: 5px;
    width: 100%;
    border: 0px;

    color: ${props => props.theme.text.gray600};
    &::placeholder {
      color: ${props => props.theme.text.gray350};
    }
  }

  input:focus {
    outline: none;
  }

  svg {
    margin-right: 16px;
  }

  span {
    color: ${props => props.theme.text.gray600};
    font-family: 'Roboto-medium', sans-serif;
    font-size: 16px;
    margin: 15px 5px;
  }

  #teste {
    border: solid 1px #ccc;
    position: absolute;
    -webkit-box-shadow: 8px 9px 5px -6px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 8px 9px 5px -6px rgba(0, 0, 0, 0.22);
    box-shadow: 8px 9px 5px -6px rgba(0, 0, 0, 0.22);
    z-index: 999;
  }
`;

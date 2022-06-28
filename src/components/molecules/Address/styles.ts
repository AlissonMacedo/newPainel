import styled, { css } from 'styled-components';
import { Tooltip } from '../../atoms/Tooltip';

interface DivBarProps {
  first?: boolean;
  last?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 10px;

  div.lyrics {
    width: 40px;
    height: 85px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  div.body-Address {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 100%;

    h4 {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      font-family: 'inter';
      color: ${props => props.theme.text.cyan950};
    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      font-family: 'inter';
      color: ${props => props.theme.text.gray350};
    }

    button.btn-edit {
      border: none;
      background-color: inherit;
      padding: 5px 0;

      width: 30px;
      cursor: pointer;
      display: inline-block;

      font-weight: 400;
      font-size: 14px;
      line-height: 21px;

      margin-left: 10px;

      color: ${props => props.theme.text.cyan300};

      strong {
        font-weight: 500;
        font-size: 12px;
        line-height: 21px;
        font-family: 'inter';
      }
    }
  }

  div.destiny {
    margin-right: 15px;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      background: none;
      border: none;
    }
  }
`;

export const DivBar = styled.div<DivBarProps>`
  width: 2px;
  height: 30px;
  border: none;

  ${props =>
    props.first &&
    css`
      border: 1px solid #ddd;
    `}

  ${props =>
    props.last &&
    css`
      border: 1px solid #ddd;
    `}
`;

export const LyricsAlfabet = styled.div`
  width: 26px;
  height: 26px;
  background-color: ${props => props.theme.colors.cyan800};

  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    font-family: 'inter';
    color: ${props => props.theme.colors.white};
  }
`;

export const TooltipMessage = styled(Tooltip)`
  span {
    width: 60px;
  }
`;

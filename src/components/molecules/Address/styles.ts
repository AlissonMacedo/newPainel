import styled from 'styled-components';
import { Tooltip } from '../../atoms/Tooltip';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;

  div.lyrics {
    width: 30px;
    height: 85px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      font-family: 'inter';
      color: ${props => props.theme.text.cyan950};
    }

    div.trackerLine {
      width: 2px;
      height: 40px;
      border: 1px solid #ccc;
    }
  }

  div.body-Address {
    display: flex;
    flex-direction: column;
    padding-top: 10px;

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

      color: ${props => props.theme.text.cyan300};
    }
  }

  div.destiny {
    margin-top: 0px;
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

export const TooltipMessage = styled(Tooltip)`
  span {
    width: 60px;
  }
`;

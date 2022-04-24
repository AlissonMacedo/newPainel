import styled from 'styled-components';

export const Container = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    padding: 0;

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

    > button {
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
    margin-top: 10px;
  }
`;
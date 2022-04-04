import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 400px;
  background: #fff;
  display: flex;
  height: 100%;

  flex-direction: column;
  align-items: flex-start;
  border-right: #dcddde solid 1px;
  padding: 5px 32px 5px;
`;

export const ContentAdress = styled.div`
  height: 40vh;
  width: 100%;
  margin-top: 14px;

  display: flex;
  flex-direction: column;
  height: 100%;

  div.address {
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
  }
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 494px;
  background: ${props => props.theme.colors.white};
  border-right: #dcddde solid 1px;
  padding: 32px;

  > div {
    margin-top: 16px;

    h3 {
      font-weight: 500;
      font-size: 27px;
      line-height: 40px;
      font-family: 'inter';
      color: ${props => props.theme.text.cyan950};
    }
  }

  div.address {
    margin-top: 30px;

    > div {
      display: flex;
      flex-direction: column;

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
      margin-top: 34px;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  background: #7159c1;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

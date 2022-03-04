import styled from 'styled-components';

export const Container = styled.div`
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
      strong {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        font-family: 'inter';
        color: ${props => props.theme.text.cyan300};
      }
    }

    div.destiny {
      margin-top: 34px;
    }
  }
  div.inputs {
    margin-top: 42px;

    input {
      padding: 10px;
    }
    div {
      margin-top: 20px;
    }
  }
`;

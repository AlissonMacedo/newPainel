import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background: ${props => props.theme.colors.white};
  margin-top: 12px;
  margin-bottom: 10px;

  > div {
    width: 100%;
    max-width: 150px;
    background: ${props => props.theme.colors.white};
    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 14px;
      line-height: 16.8px;
      font-family: 'inter';
      font-weight: 100;
      color: ${props => props.theme.text.gray350};
    }

    span {
      font-size: 14px;
      line-height: 16.8px;
      font-family: 'inter';
      font-weight: 600;
      color: ${props => props.theme.text.cyan950};
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 400px;
  height: 100%;

  background: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  border-right: #dcddde solid 1px;

  h3 {
    color: #333;
    margin-left: 30px;
    margin-top: 20px;
  }
`;

export const ContentAdress = styled.div`
  width: 100%;
  height: calc(100% - 273px);
  padding: 0px 32px;

  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  background: #7159c1;
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 400px;
  background: ${props => props.theme.colors.white};
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
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

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
  position: relative;
  width: 400px;
  height: calc(100vh - 325px);
  padding: 0px 32px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Main = styled.div`
  position: absolute;
  right: 0;
  top: 48px;

  bottom: 0;
  overflow: hidden;
  width: calc(100vw - 630px);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

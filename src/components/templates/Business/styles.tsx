import styled, { css } from 'styled-components';

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

  > div.div-box {
    border-bottom: 0.5px solid #ccc;
    width: 90%;
    align-self: center;

    h3 {
      color: #333;
      margin: 10px 20px 5px;
    }
  }
`;

export const ContentAddress = styled.div`
  width: 400px;
  height: calc(100vh - 315px);

  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

interface MainProps {
  config: boolean;
}

export const Main = styled.div<MainProps>`
  position: absolute;
  right: 0;
  top: 48px;

  bottom: 0;
  overflow: hidden;
  ${props =>
    props.config
      ? css`
          width: calc(100vw - 450px);
          transition: width 0.3s ease-in-out;
        `
      : css`
          width: calc(100vw - 630px);
          transition: width 0.3s ease-in-out;
        `};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

import styled, { keyframes } from 'styled-components';

interface ContainerData {
  show?: boolean;
}

const appearFromLEft = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 300px);
    left: 50%;
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0px);
    left: 50%;
  }
`;

const appearFromLEft2 = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0px);
    left: 50%;
  }
  to {
    opacity: 0;
    left: 50%;
    transform: translate(-50%, 300px);
  }
`;

export const Container = styled.div<ContainerData>`
  height: 225px;
  min-width: 500px;
  width: 100%;

  padding: 40px 20px;
  border-top: 1px solid #ccc;
  bottom: 26px;

  background: ${props => props.theme.colors.white};

  /* visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear; */
  div.spaceTextCalcRoute {
    display: flex;
    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;

    span {
      font-size: 18px;
      color: ${props => props.theme.colors.gray500};
    }
  }
`;

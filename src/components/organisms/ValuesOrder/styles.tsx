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
  /* position: absolute;
  left: 50%;
  transform: translate(-50%, 0); */

  /* height: 170px; */
  min-width: 500px;
  /* width: calc(100vw - 770px); */
  width: 100%;
  background: ${props => props.theme.colors.white};
  padding: 40px 20px;

  border: 1px solid #ccc;
  border-radius: 4px;
  bottom: 26px;

  /* visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear; */
`;

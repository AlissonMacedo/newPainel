import styled, { keyframes } from 'styled-components';

interface ContainerData {
  show?: boolean;
}

const appearFromLEft = keyframes`
  from {
    opacity: 0;
    transform: translateY(300px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const appearFromLEft2 = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(300px);
  }
`;

export const Container = styled.div<ContainerData>`
  position: absolute;
  bottom: 10px;

  z-index: 999;
  background: #fff;
  min-width: 400px;

  width: calc(100vw - 670px);
  padding: 5px 20px 15px;
  border-radius: 4px;

  border: 1px solid #ccc;
  display: inline-block;

  visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear;

  margin: 20px;

  div.inputs {
    > div {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
    }

    div.titleform {
      justify-content: space-between;
    }
  }
`;

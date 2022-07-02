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
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 10px;
  z-index: 999;
  background: #fff;
  min-width: 400px;
  width: calc(100vw - 670px);
  max-width: 800px;
  padding: 5px 20px 15px;
  border-radius: 4px;

  border: 1px solid #ccc;
  display: inline-block;

  visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear;

  div.inputs {
    > div {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
    }

    div.titleform {
      justify-content: space-between;

      h4 {
        color: ${props => props.theme.text.gray600};
        font-family: 'Roboto-medium', sans-serif;
        font-size: 16px;
      }
    }
  }

  button.btn-close {
    border: 0px;
    background: transparent;
  }
`;

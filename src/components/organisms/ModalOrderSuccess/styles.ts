import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../../assets/modal-order-success.png';

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
  right: calc(100vw - 1300px);
  bottom: calc(100vh - 600px);
  z-index: 999;
  background: #fff;
  min-width: 300px;

  width: calc(100vw - 870px);
  padding: 20px;

  border-radius: 4px;
  border: 1px solid #ccc;

  display: inline-block;
  visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear;

  span {
    font-size: 14px;
    color: #444;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .order {
    width: 100%;

    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    align-items: center;
    justify-content: space-between;

    > div {
      span {
        font-size: 14px;
        color: #444;
      }

      span.spotlight {
        font-weight: bold;
        color: #7159c1;
      }
    }
  }

  .image {
    height: 200px;
    width: 200px;
    background: url(${backgroundImage}) no-repeat center;
    background-size: cover;
    margin: 20px;
  }

  .div-text-success {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    .text-success {
      font-size: 24px;
      font-weight: bold;
      color: #7159c1;
      padding: 10px;
    }

    a {
      color: green;
      background-color: transparent;
      text-decoration: none;
      margin-left: 5px;
    }
  }
`;

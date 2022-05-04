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
  padding: 15px 20px 15px;
  border-radius: 4px;

  border: 1px solid #ccc;
  display: inline-block;

  visibility: ${props => (!props.show ? 'hidden' : 'visible')};
  animation: ${props => (!props.show ? appearFromLEft2 : appearFromLEft)} 0.5s
    linear;
  transition: visibility 0.5s linear;

  div.titleClose {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      display: flex;
      border: 0;
      background: none;
    }
  }

  div.selectVehicleDelivery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .vehicleDelivery {
      flex: 1 1 150px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 5px;
      padding: 10px;
      margin-top: 10px;

      > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: space-around;
        height: 40px;
      }

      span {
        color: #333;
      }
    }
  }

  div.deliveryTypes {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 10px;

    div.deliveryType {
      border: 1px solid #ddd;
      border-radius: 4px;

      display: flex;
      flex-direction: column;
      margin-top: 10px;

      div.deliveryBody {
        display: flex;
        flex-direction: row;
        padding: 10px;
        align-items: center;
      }

      div.deliveryTexts {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 5px;

        span.deliveryTitle {
          font-size: 14px;
          color: #333;
        }

        span.deliveryDescription {
          font-size: 12px;
          color: #777;
        }
      }
      span.price {
        font-size: 14px;
        color: #777;
        margin: 0 10px;
      }
    }
  }
`;

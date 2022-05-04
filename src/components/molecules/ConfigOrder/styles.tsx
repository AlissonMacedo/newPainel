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
      border: 1.5px solid ${props => props.theme.colors.gray150};
      border-radius: 4px;
      margin: 0 5px;
      padding: 10px;
      margin-top: 10px;
      text-align: left;
      background: none;
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

    .active {
      border: 1.5px solid ${props => props.theme.colors.cyan300};
      transition: border 0.5s ease-in-out;
    }
  }

  .deliveryTypes {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 10px;

    .deliveryType {
      border: 1.5px solid ${props => props.theme.colors.gray150};
      border-radius: 4px;
      background: none;

      display: flex;
      flex-direction: column;
      margin-top: 10px;

      div.deliveryBody {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 10px;
        align-items: center;
        justify-content: flex-start;
      }

      div.deliveryTexts {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-left: 10px;
        text-align: left;

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

    .active {
      border: 1.5px solid ${props => props.theme.colors.cyan300};
      transition: border 0.5s ease-in-out;
    }
  }
`;

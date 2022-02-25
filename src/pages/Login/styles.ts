import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import backgroundImage from '../../assets/background-login.png';

const appearFromLEft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLEft} 1s;

  img {
    height: 200px;
    width: 300px;
  }

  form {
    margin: 10px 0px 30px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #273c64;
    }

    a {
      color: #273c64;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#83a0d6')};
      }
    }
  }

  > a {
    color: #00dedb;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#00dedb')};
    }
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  place-content: center;
  width: 100%;
`;

export const Background = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 700px;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

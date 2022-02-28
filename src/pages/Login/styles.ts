import styled, { keyframes } from 'styled-components';
import { shade, lighten } from 'polished';
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
      color: ${props => props.theme.colors.cyan800};
    }

    a {
      color: ${props => props.theme.colors.cyan800};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${props => lighten(0.3, `${props.theme.colors.cyan800}`)};
      }
    }
  }

  > a {
    color: ${props => props.theme.colors.cyan300};
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
      color: ${props => shade(0.2, `${props.theme.colors.cyan300}`)};
    }
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: ${props => props.theme.colors.white};
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

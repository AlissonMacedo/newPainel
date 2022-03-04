import styled from 'styled-components';
import backgroundImage from '../../assets/404.png';

export const Container = styled.div`
  background: ${props => props.theme.colors.white};
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${props => props.theme.colors.cyan800};
  }
`;

export const Background = styled.div`
  height: 350px;
  width: 400px;
  max-width: 700px;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`;

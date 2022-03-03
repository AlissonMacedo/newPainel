import styled from 'styled-components';

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

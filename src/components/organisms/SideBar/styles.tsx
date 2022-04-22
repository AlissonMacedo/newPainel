import styled from 'styled-components';

export const Container = styled.div`
  .Drawer__Container {
    height: 100vh;
    width: 200px;
    background-color: orange;
    transition: all 0.3s ease-in-out;
    transform: translate(-200px);
  }
  .Drawer__Container--isOpen {
    transform: translate(0);
  }
`;

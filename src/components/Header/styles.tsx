import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background: ${props => props.theme.colors.white};
  border-bottom: ${props => `${props.theme.colors.gray200} solid 0.5px`};
`;

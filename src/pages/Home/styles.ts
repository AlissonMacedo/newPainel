import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.colors.white};
  display: flex;
  flex: 1;

  div.space {
    margin: 10px;
  }
`;

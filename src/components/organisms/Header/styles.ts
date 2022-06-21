import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background: ${props => props.theme.colors.white};
  border-bottom: #dcddde solid 1px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  button {
    background: ${props => props.theme.colors.gray500};
    border: 0;
    padding: 2px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

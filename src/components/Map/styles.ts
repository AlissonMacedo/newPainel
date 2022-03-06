import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  .map-marker {
    margin-top: -60px;
    background-color: #fff;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

export const Context = styled.div`
  position: absolute;
  left: 40%;
  box-sizing: border-box;
  border: 1px solid #ccc;

  padding: 0 12px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  outline: none;
  text-overflow: ellipsis;
  background: #fff;

  margin-top: 10px;
  padding: 20px;
  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;

  input {
    position: relative;
    padding: 10px;
    margin: 5px 0;
  }

  button {
    margin: 5px;
    width: 100%;
    padding: 5px;
  }
`;

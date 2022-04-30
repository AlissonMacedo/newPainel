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

  #map-canvas {
    height: 400px;
    width: 500px;
  }

  .gm-style .gm-style-iw-c {
    padding-right: 10px !important;
    padding-bottom: 0px !important;
    max-width: 500px !important;
    max-height: 326px !important;
    min-width: 0px !important;
    position: absolute;
    box-sizing: border-box;
    overflow: hidden;
    top: 0;
    left: 0;
    transform: translate(-50%, -100%);
    background-color: #dd9191;
    border-radius: 8px;
    box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const Context = styled.div`
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

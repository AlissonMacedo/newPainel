import styled from 'styled-components';
import { darken } from 'polished';
import backgroundImage from '../../../assets/background-login.png';

export const Container = styled.div`
  .Drawer__Container {
    height: 100vh;
    background-color: ${props => props.theme.colors.sideBar};
    transition: width 0.3s ease-in-out;
    width: 230px;
    padding: 10px 0;
  }
  .Drawer__Container--isOpen {
    transition: width 0.3s ease-in-out;
    width: 50px;
  }

  .AvatarContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 20px 0;

    span.Name__User {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      font-family: 'inter';
      color: ${props => props.theme.text.cyan950};
    }

    span.Name__Company {
      font-weight: 500;
      font-size: 12px;
      line-height: 21px;
      font-family: 'inter';
      color: ${props => props.theme.text.cyan950};
    }
  }

  .imageAvatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: url(${backgroundImage}) no-repeat center;
    background-size: cover;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;

    li {
      width: 100%;
      padding: 10px 0px;

      margin: 1px 0;
      display: flex;
      align-items: center;
      padding-left: 10px;

      a {
        margin-left: 6px;
        font-family: 'Roboto-medium', sans-serif;
        color: ${props => props.theme.text.gray600};
      }
    }

    li.active {
      border-left: 3px solid ${props => props.theme.colors.cyan500};
      padding-left: 20px;
      transition: padding-left 0.5s ease-in-out;

      a {
        margin-left: 6px;
        color: ${props => props.theme.colors.cyan500};
        font-weight: 600;
        font-family: 'Roboto-medium', sans-serif;
      }
    }

    button {
      border: 0px;
      background: none;

      display: flex;
      flex-direction: row;
      align-items: center;

      li {
      width: 100%;
      padding: 10px 0px;

      margin: 1px 0;
      display: flex;
      align-items: center;
      padding-left: 10px;

      a {
        margin-left: 6px;
        font-family: 'Roboto-medium', sans-serif;
        color: ${props => props.theme.text.gray600};
      }
    }

    li.active {
      border-left: 3px solid ${props => props.theme.colors.cyan500};
      padding-left: 20px;
      transition: padding-left 0.5s ease-in-out;

      a {
        margin-left: 6px;
        color: ${props => props.theme.colors.cyan500};
        font-weight: 600;
        font-family: 'Roboto-medium', sans-serif;
      }
    }
  }
`;

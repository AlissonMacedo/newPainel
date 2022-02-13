import React from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/GoBarber.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />
        <form>
          <h1>Faça seu login</h1>
          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />
          <button type="button">Entrar</button>
          <a href="/">Esqueci minha senha</a>
        </form>
        <a href="/">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;

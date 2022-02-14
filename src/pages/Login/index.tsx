import React, { useCallback, useContext } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/GoBarber.svg';

import { AuthContext } from '../../context/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      signIn(data);
    } catch (err) {
      console.log('deu erro');
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />
        <form>
          <h1>Faça seu login</h1>
          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />
          <button
            type="button"
            onClick={() =>
              handleSubmit({
                email: 'mancio@alfreddelivery.com',
                password: 'Alfred12!',
              })
            }
          >
            Entrar
          </button>
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

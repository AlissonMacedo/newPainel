import React, { useCallback } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/logo-alfred.svg';

// import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    addToast({ type: 'success', description: 'Deu erro', title: 'Erro' });
    console.log('deu data', data);
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

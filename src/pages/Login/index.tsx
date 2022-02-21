import React, { useCallback } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AnimationContainer, Container, Content, Background } from './styles';
import Logo from '../../assets/logo-alfred.svg';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      await signIn(data);
      addToast({
        type: 'success',
        description: 'Tudo certo!',
        title: 'success',
      });
    } catch (err) {
      addToast({ type: 'error', description: 'Deu erro', title: 'Erro' });
    }
    console.log('deu data', data);
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
            <Link to="/recovery">Esqueci minha senha</Link>
          </form>
          <Link to="create">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;

import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { Oval } from 'react-loader-spinner';
import { AnimationContainer, Container, Content, Background } from './styles';
import Logo from '../../assets/logo-alfred.svg';

import { Button, Input } from '../../components';
import { useLogin, LoginProvider } from './Context';

const PageComponent: React.FC = () => {
  const { handleSubmit, formRef, loading } = useLogin();

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Alfred" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit" text="Login">
              {loading && <Oval color="#fff" height={15} width={15} />}
            </Button>
            <Link to="/recovery">Esqueci minha senha</Link>
          </Form>
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

const Login: React.FC = () => {
  return (
    <LoginProvider>
      <PageComponent />
    </LoginProvider>
  );
};
export default Login;

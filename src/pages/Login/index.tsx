import React, { useCallback, useRef, useState } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Oval } from 'react-loader-spinner';
import { AnimationContainer, Container, Content, Background } from './styles';
import Logo from '../../assets/logo-alfred.svg';

import { Button, Input } from '../../components';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';
import { schemaLogin } from '../../helpers/schemas';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      await schemaLogin.validate(data, { abortEarly: false });
      await signIn(data);

      addToast({
        type: 'success',
        description: 'Tudo certo!',
        title: 'success',
      });

      history.push('/home');
    } catch (err: any) {
      addToast({
        type: 'error',
        description: 'Não foi possível realizar o login!',
        title: 'Houve um erro',
      });

      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    } finally {
      setLoading(false);
    }
  }, []);

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

export default Login;

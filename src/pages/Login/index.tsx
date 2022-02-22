import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { AnimationContainer, Container, Content, Background } from './styles';
import Logo from '../../assets/logo-alfred.svg';

import { Button, Input } from '../../components';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      console.log('data', data);
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Digite um e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo seis digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn(data);
        addToast({
          type: 'success',
          description: 'Tudo certo!',
          title: 'success',
        });
      } catch (err: any) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        console.log('err', err);
        addToast({ type: 'error', description: 'Deu erro', title: 'Erro' });
      }
    },
    [addToast, signIn],
  );

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
            <Button type="submit">Entrar</Button>
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

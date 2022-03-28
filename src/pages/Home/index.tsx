import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import { Oval } from 'react-loader-spinner';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

import { Container } from './styles';

import { Button } from '../../components/Button';

import { HomeProvider, useHome } from './Context';

const PageComponent: React.FC = () => {
  const { signOut } = useAuth();

  const { loadFreight, createOrder, load } = useHome();
  const { colors } = useContext(ThemeContext);
  const { changeTheme, currentThemeDarkorLight } = useTheme();

  return (
    <Container>
      <div>
        <Switch
          onChange={() => changeTheme()}
          checked={currentThemeDarkorLight}
          height={20}
          width={40}
          handleDiameter={20}
          offColor={shade(0.1, colors.cyan800)}
        />
      </div>
      <h1>Home</h1>
      <div className="space">
        <Button typeStyle="secondary" onClick={() => signOut()}>
          Sair
        </Button>
      </div>
      <div className="space">
        <Button onClick={() => loadFreight()}>
          {load && <Oval color="#fff" height={15} width={15} />}
          Calcular
        </Button>
      </div>
      <div className="space">
        <Button typeStyle="secondary" onClick={() => createOrder()}>
          Criar Pedido
        </Button>
      </div>
    </Container>
  );
};

const Home: React.FC = () => {
  return (
    <HomeProvider>
      <PageComponent />
    </HomeProvider>
  );
};

export default Home;

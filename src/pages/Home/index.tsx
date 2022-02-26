import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import { Container } from './styles';

const Home: React.FC = () => {
  const { signOut } = useAuth();
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
          offColor={shade(0.1, colors.cyan500)}
        />
      </div>
      <h1>Home</h1>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </Container>
  );
};

export default Home;

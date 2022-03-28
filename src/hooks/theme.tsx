import React, { useState, createContext, useContext } from 'react';
import {
  ThemeProvider as ThemeStyledComponents,
  DefaultTheme,
} from 'styled-components';

import light from '../styles/light';
import dark from '../styles/dark';

interface ThemeContextData {
  theme: DefaultTheme;
  changeTheme(): void;
  currentThemeDarkorLight: boolean;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(() => {
    const savedTheme = localStorage.getItem('@PainelAlfred:theme');
    if (savedTheme && savedTheme === 'light') return light;
    if (savedTheme && savedTheme === 'dark') return dark;
    return light;
  });

  // retur true for dark and false for light
  const currentThemeDarkorLight = React.useMemo(() => {
    if (currentTheme.title === 'dark') return true;
    return false;
  }, [currentTheme]);

  const changeTheme = React.useCallback(() => {
    if (currentTheme.title === 'dark') {
      localStorage.setItem('@PainelAlfred:theme', 'light');
      return setCurrentTheme(light);
    }
    localStorage.setItem('@PainelAlfred:theme', 'dark');

    return setCurrentTheme(dark);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, changeTheme, currentThemeDarkorLight }}
    >
      <ThemeStyledComponents theme={currentTheme}>
        {children}
      </ThemeStyledComponents>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('usetheme must be use with in an ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };

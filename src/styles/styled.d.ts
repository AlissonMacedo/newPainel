import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      white: string;
      black: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray500: string;
      gray800: string;
      cyan50: string;
      cyan300: string;
      cyan500: string;
      cyan800: string;
      red800: string;
      sideBar: string;
    };
    text: {
      gray350: string;
      cyan300: string;
      cyan950: string;
    };
  }
}

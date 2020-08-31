import React, { ReactNode, FC } from 'react';
import { CSSReset, ITheme, ThemeProvider, theme, ColorModeProvider } from '@chakra-ui/core';
import { BorderStyleProps, ColorProps } from 'styled-system';

interface IProps {
  children: ReactNode;
}

export const ThemeContext = React.createContext({});

interface ICustomTheme extends ITheme {
  link: {
    hover: {
      borderColor: ColorProps['color'];
    };
    visited: {
      color: string;
    };
  };
  customBorders: {
    style: BorderStyleProps['borderStyle'];
    width: string;
    radius: string;
    color: ColorProps['color'];
  };
}

export const useCustomTheme = () => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
    },
    fonts: {
      body: 'Muli,sans-serif;',
      heading: 'Poppins,sans-serif;',
      mono: 'Menlo, monospace',
    },
  } as ICustomTheme;
};

export const CustomThemeProvider: FC<IProps> = (props: IProps) => {
  return (
    <ThemeProvider theme={useCustomTheme()}>
      <CSSReset />
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ThemeProvider>
  );
};

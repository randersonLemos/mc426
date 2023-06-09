import { Theme } from '@emotion/react'
import { PaletteMode, createTheme } from '@mui/material'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export interface ThemeProps extends Theme {
  palette: {
    primary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    secondary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    background: {
      default: string
      paper: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
    }
    error: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    warning: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    divider: string
  }
}

export const theme = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
      fontSize: 15,
      h1: {
        fontSize: '2.3rem',
        fontWeight: 700,
        transition: 'font-size 500ms',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontSize: '2.3rem',
        fontWeight: 500,
        transition: 'font-size 500ms',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h3: {
        fontSize: '2.2rem',
        transition: 'font-size 500ms',
        '@media (max-width:600px)': {
          fontSize: '1.8rem',
        },
      },
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#4527a0',
              light: '#6a52b3',
              dark: '#301b70',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#ff5722',
              light: '#ff784e',
              dark: '#b23c17',
              contrastText: '#ffffff',
            },
            error: {
              main: '#f44336',
              light: '#f6685e',
              dark: '#aa2e25',
              contrastText: '#ffffff',
            },
            warning: {
              main: '#ffa726',
              light: '#ffb851',
              dark: '#b2741a',
              contrastText: 'rgba(0,0,0,0.87)',
            },
            background: {
              default: '#E1BEE7',
              paper: 'rgb(225, 190, 231)',
            },
            text: {
              primary: 'rgba(0,0,0,0.87)',
              secondary: 'rgba(0,0,0,0.6)',
              disabled: 'rgba(0,0,0,0.38)',
            },
            divider: 'rgba(0,0,0,0.12)',
          }
        : {
            primary: {
              main: '#4527a0',
              light: '#6a52b3',
              dark: '#301b70',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#ff5722',
              light: '#ff784e',
              dark: '#b23c17',
              contrastText: '#ffffff',
            },
            background: {
              default: '#121212',
              paper: '#121212',
            },
            text: {
              primary: '#ffffff',
              secondary: 'rgba(255,255,255,0.7)',
              disabled: 'rgba(255,255,255,0.5)',
            },
            error: {
              main: '#f44336',
              light: '#f6685e',
              dark: '#aa2e25',
              contrastText: '#ffffff',
            },
            warning: {
              main: '#ffa726',
              light: '#ffb851',
              dark: '#b2741a',
              contrastText: 'rgba(0,0,0,0.87)',
            },
            divider: 'rgba(255,255,255,0.12)',
          }),
    },
  })

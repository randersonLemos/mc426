/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/styles/muiTheme'
import { StyledEngineProvider } from '@mui/material/styles'
import { ptBR } from '@mui/x-date-pickers/locales'
import { Roboto } from 'next/font/google'

import '@/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})
const brazilLocale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDj46xfWFS0dZzRjLIYX9PLmOYbSR9UlHE',
  authDomain: 'mc426-6ac70.firebaseapp.com',
  projectId: 'mc426-6ac70',
  storageBucket: 'mc426-6ac70.appspot.com',
  messagingSenderId: '577107803025',
  appId: '1:577107803025:web:77e58d98f924fa89db3830',
  measurementId: 'G-DDMY4JQJ27',
}

let analytics, db: Firestore

const app = initializeApp(firebaseConfig)
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app)
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app)
}

export { analytics, app, db }

type ThemeContext = {
  theme: 'light' | 'dark'
  toggleTheme: (theme: 'light' | 'dark') => void
}

const defaultTheme: ThemeContext = { theme: 'light', toggleTheme: () => {} }

export const MyTheme = createContext(defaultTheme)

export default function App({ Component, pageProps }: AppProps) {
  const [themeState, setThemeState] = useState<'light' | 'dark'>('light')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br" localeText={brazilLocale}>
      <MyTheme.Provider value={{theme: themeState, toggleTheme: setThemeState}}>
        <ThemeProvider theme={theme(themeState)}>
          <StyledEngineProvider injectFirst>
            <main className={roboto.className} style={{ height: '100%' }}>
              <Component {...pageProps} />
            </main>
          </StyledEngineProvider>
        </ThemeProvider>
      </MyTheme.Provider>
    </LocalizationProvider>
  )
}

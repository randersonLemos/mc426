import React from 'react'
import Head from 'next/head'
import { Typography, useTheme } from '@mui/material'
import SignUpForm from '@/components/signUpForm/signUpForm'
import Header from '@/components/header/header'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Sistema de Alerta</title>
        <meta name="description" content="Receba alertas do governo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
        <Header />
        <Typography variant="h2" color={theme.palette.text.secondary} style={{marginTop: '30px'}}>Cadastre-se agora para receber alertas!</Typography>
        <SignUpForm />
      </main>
    </>
  )
}

import React from 'react'
import Head from 'next/head'
import { useTheme } from '@mui/material'
import Header from '@/components/header/header'
import styles from '@/styles/Home.module.css'

type HomeProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Home({ setActiveTheme }: HomeProps) {
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
        <Header setActiveTheme={setActiveTheme} />
      </main>
    </>
  )
}

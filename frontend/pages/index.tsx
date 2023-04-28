import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useTheme } from '@mui/material'
import Header from '@/components/header/header'
import SignUpForm from '@/components/signUpForm/signUpForm'
import axios from 'axios'

type HomeProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Home({ setActiveTheme }: HomeProps) {
  const theme = useTheme()
  const [data, setData] = useState({
    number: "5519988352366",
    message: "Sou um bot arrombado"
  })

  useEffect(() => {
    async function sendRequest() {
      const options = {
        method: 'POST',
        url: 'http://mc426chatbot.ddns.net/api/chatbot/sendtext',
        headers: { 'Content-Type': 'application/json' },
        data: { number: '5519988352366', message: 'Hello World (Eu sou o chatbot)' }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }
    sendRequest()
  }, [])

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
        <SignUpForm />
      </main>
    </>
  )
}

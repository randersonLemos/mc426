import React from 'react'
import { Typography, useTheme } from '@mui/material'
import Header from '@/components/header/header'
import { CheckCircle } from '@mui/icons-material'
import styles from '@/styles/success.module.css'

export default function Success() {
  const theme = useTheme()
  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header />
      <Typography className={styles.title} variant="h3" color={theme.palette.text.secondary}>
        Cadastrado com sucesso!
      </Typography>
      <CheckCircle color="success" style={{ fontSize: '60px', marginBottom: '20px' }} />
      <Typography className={styles.title} variant="h5" color={theme.palette.text.secondary}>
        Agora você receberá alertas pelo WhatsApp
      </Typography>
    </main>
  )
}

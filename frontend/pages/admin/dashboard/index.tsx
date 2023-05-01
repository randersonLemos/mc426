import React from 'react'
import { useTheme } from '@mui/material'
import Header from '@/components/header/header'
import SendMessageForm from '@/components/sendMessageForm/sendMessageForm'
import styles from '@/styles/adminDashboard.module.css'

type AdminProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Admin({ setActiveTheme }: AdminProps) {
  const theme = useTheme()
  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header setActiveTheme={setActiveTheme} />
      <SendMessageForm />
    </main>
  )
}

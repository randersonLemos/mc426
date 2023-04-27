import React from 'react'
import { IconButton, useTheme, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import styles from './headerStyles.module.css'

type HeaderProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Header({ setActiveTheme }: HeaderProps) {
  const theme = useTheme()
  return (
    <header className={styles.header} style={{ backgroundColor: theme.palette.background.default }}>
      <Typography variant="h3" color={theme.palette.text.secondary}>
        Sistema de alerta
      </Typography>
      <IconButton onClick={() => setActiveTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
        <Brightness4Icon />
      </IconButton>
    </header>
  )
}

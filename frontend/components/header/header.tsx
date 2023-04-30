import React, { useEffect, useState } from 'react'
import { IconButton, useTheme, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '@/pages/_app'

import styles from './headerStyles.module.css'
import { Person } from '@mui/icons-material'
import { useRouter } from 'next/router'

const auth = getAuth(app)
auth.useDeviceLanguage()

type HeaderProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Header({ setActiveTheme }: HeaderProps) {
  const [loggedIn, setLoggedIn] = useState<User | null>(null)
  const theme = useTheme()
  const router = useRouter()

  async function handleSignOut() {
    await signOut(auth)
    router.push('/')
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid
        setLoggedIn(user)
        console.log(user.displayName)
        console.log('Logado')
        // ...
      } else {
        // User is signed out
        // ...
        setLoggedIn(null)
        console.log('Deslogado')
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <header className={styles.header} style={{ backgroundColor: theme.palette.background.default }}>
      <Typography variant="h3" color={theme.palette.text.secondary}>
        Sistema de alerta
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => setActiveTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
          <Brightness4Icon />
        </IconButton>
        {loggedIn ? (
          <>
            <div className={styles.avatar} onClick={handleSignOut}>
              <Person style={{ color: 'lightgrey' }} />
            </div>
            <span>{loggedIn.displayName}</span>
          </>
        ) : null}
      </div>
    </header>
  )
}

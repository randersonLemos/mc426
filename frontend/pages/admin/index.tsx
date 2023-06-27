import React, { useEffect, useState } from 'react'
import Header from '@/components/header/header'
import { Button, useTheme } from '@mui/material'

import AdminSignUp from '@/components/adminSignUp/adminSignUp'
import AdminSignIn from '@/components/adminSignIn/adminSignIn'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../_app'
import { useRouter } from 'next/router'
import styles from '@/styles/admin.module.css'

const auth = getAuth(app)

export default function SignUp() {
  const [createAccount, setCreateAccount] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    })

    return () => unsubscribe()
  }, [])

  if (user) router.push('/admin/campaignSelect')

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header />
      {createAccount ? null : (
        <>
          <AdminSignIn />
          <Button className={styles.button} variant="outlined" color="primary" onClick={() => setCreateAccount(true)}>
            Não tenho cadastro
          </Button>
        </>
      )}
      {createAccount ? (
        <>
          <AdminSignUp />
          <Button className={styles.button} variant="outlined" color="primary" onClick={() => setCreateAccount(false)}>
            Voltar
          </Button>
        </>
      ) : null}
    </main>
  )
}

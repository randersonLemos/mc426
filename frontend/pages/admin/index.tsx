import React, { useState } from 'react'
import Header from '@/components/header/header'
import { Button, useTheme } from '@mui/material'

import styles from '@/styles/admin.module.css'
import AdminSignUp from '@/components/adminSignUp/adminSignUp'
import AdminSignIn from '@/components/adminSignIn/adminSignIn'

type SignUpProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function SignUp({ setActiveTheme }: SignUpProps) {
  const [createAccount, setCreateAccount] = useState(false)
  const theme = useTheme()

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header setActiveTheme={setActiveTheme} />
      {createAccount ? null : (
        <>
          <AdminSignIn />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCreateAccount(true)}
            style={{ display: 'flex', marginTop: '20px', width: '400px' }}
          >
            Não tenho cadastro
          </Button>
        </>
      )}
      {createAccount ? (
        <>
          <AdminSignUp />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCreateAccount(false)}
            style={{ display: 'flex', marginTop: '20px', width: '400px' }}
          >
            Voltar
          </Button>
        </>
      ) : null}
    </main>
  )
}

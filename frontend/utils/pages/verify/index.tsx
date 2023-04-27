import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, Typography, useTheme } from '@mui/material'
import Header from '@/components/header/header'
import VerificationInput from 'react-verification-input'
import { FirebaseWindow } from '@/utils/customWindow'
import { db } from '@/pages/_app'
import { collection, addDoc } from 'firebase/firestore'
import styles from '@/styles/verify.module.css'

declare let window: FirebaseWindow

type VerifyProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export default function Verify({ setActiveTheme }: VerifyProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  async function handleSubmit(verificationCode: string) {
    console.log(window.confirmationResult)
    let flag = false
    setLoading(true)
    // console.log(verificationCode)
    await window.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        // User signed in successfully.
        setSuccess(true)
        const user = result.user
        sessionStorage.setItem('user', JSON.stringify(user))
        flag = true
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setError(true)
        setLoading(false)
        console.log('FALHOU LOGAR', error)
      })

    if (flag) {
      const user = sessionStorage.getItem('user') as string

      try {
        const docRef = await addDoc(collection(db, 'users'), {
          userInfo: JSON.parse(user).uid,
          name: sessionStorage.getItem('name'),
          email: sessionStorage.getItem('email'),
          phone: sessionStorage.getItem('phone'),
          birthDay: sessionStorage.getItem('birth'),
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }

      router.push('/success')
    }
  }

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header setActiveTheme={setActiveTheme} />
      <Typography className={styles.title} variant="h3" color={theme.palette.text.secondary}>
        Digite o codigo que enviamos para seu telefone
      </Typography>
      <VerificationInput
        classNames={{
          container: styles.verifyContainer,
          character: styles.character,
          characterInactive: styles.characterInactive,
          characterSelected: styles.characterSelected,
        }}
        autoFocus
        onChange={() => {
          setSuccess(false)
          setError(false)
        }}
        length={6}
        onComplete={(code) => handleSubmit(code)}
      />
      {success ? (
        <Typography variant="caption" style={{ marginTop: '20px', textAlign: 'center' }}>
          Código validado com sucesso, aguarde a finalização do cadastro
        </Typography>
      ) : null}
      {error ? (
        <Typography variant="caption" style={{ marginTop: '20px', textAlign: 'center' }}>
          Código incorreto. Tente novamente...
        </Typography>
      ) : null}
      {loading ? <CircularProgress color="primary" style={{ marginTop: '30px' }} size={32} /> : null}
    </main>
  )
}

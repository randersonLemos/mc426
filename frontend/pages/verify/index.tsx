import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, Typography, useTheme } from '@mui/material'
import Header from '@/components/header/header'
import VerificationInput from 'react-verification-input'
import { FirebaseWindow } from '@/helpers/customWindow'
import { db, app } from '@/pages/_app'
import { collection, addDoc } from 'firebase/firestore'
import styles from '@/styles/verify.module.css'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { userExists } from '@/helpers/apiMethods'

const auth = getAuth(app)

declare let window: FirebaseWindow

export default function Verify() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  async function handleSubmit(verificationCode: string) {
    setLoading(true)
    const user = await window.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        // User signed in successfully.
        setSuccess(true)
        const user = result.user
        return user
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        setError(true)
        console.log('FALHOU LOGAR', error)
      })
      .finally(() => setLoading(false))

    setLoading(true)

    if (user) {
      // Check if user already exists in firestore database
      if (await userExists(user.uid)) {
        await signOut(auth) // Sigining out user
        router.push('/success')
        return
      }

      // Setting user display name
      await updateProfile(user, { displayName: sessionStorage.getItem('name') })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))

      // Adding user to firestore database
      try {
        setLoading(true)
        const docRef = await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: sessionStorage.getItem('name'),
          email: sessionStorage.getItem('email'),
          phone: sessionStorage.getItem('phone'),
          birthDay: Number(sessionStorage.getItem('birth')),
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      } finally {
        setLoading(false)
      }

      setLoading(true)

      await signOut(auth) // Sigining out user

      router.push('/success') // Redirecting user to success screen
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log('Carregando:', loading)
  }, [loading])

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header />
      <Typography className={styles.title} variant="h3" color={theme.palette.text.secondary}>
        Digite o código que enviamos para seu telefone
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

import React, { FormEvent, useState } from 'react'
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material'
import styles from './adminSignIn.module.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/pages/_app'
import { useRouter } from 'next/router'

const auth = getAuth(app)
auth.useDeviceLanguage()

export default function AdminSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSignIn(ev: FormEvent) {
    ev.preventDefault()
    setLoading(true)

    let flag = false

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        sessionStorage.setItem('user', JSON.stringify(user))
        flag = true
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })

    if (flag) router.push('admin/dashboard')

    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <FormLabel className={styles.label}>Email</FormLabel>
      <TextField label="Email" variant="filled" value={email} onChange={(ev) => setEmail(ev.target.value)} />
      <FormLabel className={styles.label}>Senha</FormLabel>
      <TextField
        label="Senha"
        variant="filled"
        type="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" onSubmit={handleSignIn} style={{ marginTop: '30px' }}>
        {loading ? <CircularProgress color="secondary" size={24} /> : 'Entrar'}
      </Button>
    </form>
  )
}

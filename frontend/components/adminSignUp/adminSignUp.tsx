import React, { FormEvent, useState } from 'react'
import styles from './adminSignUp.module.css'
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material'
import { User, createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { app, db } from '@/pages/_app'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'

const auth = getAuth(app)
auth.useDeviceLanguage()

export default function AdminSignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSignUp(ev: FormEvent) {
    ev.preventDefault()
    setLoading(true)

    let flag = false

    const user = (await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        sessionStorage.setItem('user', JSON.stringify(user))
        console.log(user)
        flag = true
        return user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })) as User

    if (flag) {
      // const userString = sessionStorage.getItem('user') as string
      await updateProfile(user, { displayName: name }).catch((err) => console.log(err))

      try {
        const docRef = await addDoc(collection(db, 'admins'), {
          userInfo: user.uid,
          name,
          email: user.email,
        })
        console.log('Document written with ID: ', docRef.id)
        router.push('admin/dashboard')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }

    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <FormLabel className={styles.label}>Nome</FormLabel>
      <TextField label="Nome" variant="filled" value={name} onChange={(ev) => setName(ev.target.value)} />
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
      <FormLabel className={styles.label}>Confirmar senha</FormLabel>
      <TextField
        label="Confirmar senha"
        variant="filled"
        type="password"
        value={cPassword}
        onChange={(ev) => setCPassword(ev.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" onSubmit={handleSignUp} style={{ marginTop: '30px' }}>
        {loading ? <CircularProgress color="secondary" size={24} /> : 'Cadastrar-se'}
      </Button>
    </form>
  )
}

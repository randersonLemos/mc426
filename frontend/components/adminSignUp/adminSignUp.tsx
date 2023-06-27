import React, { FormEvent, useState } from 'react'
import styles from './adminSignUp.module.css'
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material'
import { app } from '@/pages/_app'
import { useRouter } from 'next/router'
import BackendAdapter from '@/helpers/adpter/backendAdapter'

const adapter = new BackendAdapter("firebase", app)
adapter.backend?.auth.useDeviceLanguage();

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

    await adapter.backend?.signUp(email, password, { shouldRedirect: true, redirect: () => router.push("/admin/campaignSelect") }, name)
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

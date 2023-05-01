import React, { FormEvent, useState } from 'react'
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material'
import styles from './sendMessageForm.module.css'
import { sendMessage } from '@/helpers/apiMethods'

export default function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSendMessage(ev: FormEvent) {
    ev.preventDefault()
    setLoading(true)
    await sendMessage(message)
    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSendMessage}>
      <FormLabel className={styles.label}>Mensagem</FormLabel>
      <TextField
        label="Mensagem"
        variant="filled"
        multiline
        minRows={5}
        data-cy="message"
        value={message}
        required
        onChange={(ev) => setMessage(ev.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        data-cy="submit"
        onSubmit={handleSendMessage}
        style={{ marginTop: '30px' }}
      >
        {loading ? <CircularProgress color="secondary" size={24} /> : 'Enviar mensagem'}
      </Button>
    </form>
  )
}

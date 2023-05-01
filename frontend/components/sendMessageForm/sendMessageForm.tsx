import React, { FormEvent, useState } from 'react'
import { Button, CircularProgress, FilledInput, FormControl, FormLabel, InputLabel, TextField } from '@mui/material'
import styles from './sendMessageForm.module.css'
import { sendMessage } from '@/helpers/apiMethods'
import { IMaskInput } from 'react-imask'


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref: any) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="(00) 90000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onChange={() => ''}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})


export default function SendMessageForm() {
  const [values, setValues] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
  }

  async function handleSendMessage(ev: FormEvent) {
    ev.preventDefault()
    const phone = '+55' + values.replace(/[()-\s]/g, '')
    setLoading(true)
    await sendMessage(phone, message)
    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSendMessage}>
      <FormLabel className={styles.label}>Telefone</FormLabel>
      <FormControl style={{ marginTop: '5px' }} variant="filled" required>
        <InputLabel htmlFor="phone">Telefone</InputLabel>
        <FilledInput
          value={values}
          onChange={handleChange}
          data-cy="phone"
          name="textmask"
          id="phone"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
      <FormLabel className={styles.label}>Mensagem</FormLabel>
      <TextField
        label="Mensagem"
        variant="filled"
        multiline
        minRows={5}
        value={message}
        required
        onChange={(ev) => setMessage(ev.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onSubmit={handleSendMessage}
        style={{ marginTop: '30px' }}
      >
        {loading ? <CircularProgress color="secondary" size={24} /> : 'Enviar mensagem'}
      </Button>
    </form>
  )
}

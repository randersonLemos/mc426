import React, { FormEvent, useEffect, useState } from 'react'
import { TextField, FormControl, InputLabel, FilledInput, Button, FormLabel, CircularProgress } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { IMaskInput } from 'react-imask'
import { useRouter } from 'next/router'
import { ApplicationVerifier, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { FirebaseWindow } from '@/utils/customWindow'
import styles from './signUpStyles.module.css'
import { app } from '@/pages/_app'
import dayjs, { Dayjs } from 'dayjs'

declare let window: FirebaseWindow

const auth = getAuth(app)
auth.useDeviceLanguage()
// auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

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

interface SignUpProps {
  name: string
  email: string
  phone: string
  birth: Dayjs
  appVerifier: ApplicationVerifier
}

const signUp = async (args: SignUpProps) => {
  if (args.name.length > 3) {
    if (args.email.includes('@')) {
      if (args.phone.length === 14) {
        const confirmationResult = await signInWithPhoneNumber(auth, args.phone, args.appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult
            sessionStorage.setItem('name', args.name)
            sessionStorage.setItem('email', args.email)
            sessionStorage.setItem('phone', args.phone)
            sessionStorage.setItem('birth', args.birth.format('DD/MM/YYYY'))
            console.log('codigo enviado')
            return confirmationResult
          })
          .catch((error) => {
            // Error; SMS not sent
          })
        if (confirmationResult) {
          return true
        }
      } else return 'erro no campo telefone'
    } else return 'erro no campo email'
  } else return 'erro no campo nome'
}

export default function SignUpForm() {
  const [values, setValues] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birth, setBirth] = useState()
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appVerifier, setAppVerifier] = useState<any>()
  const router = useRouter()

  async function handleSignUp(ev?: FormEvent) {
    ev?.preventDefault()
    setLoading(true)
    if (name.length <= 3) setNameError(true)
    if (!email.includes('@')) setEmailError(true)
    if (!birth.isValid() || !email.includes('@') || name.length <= 3) {
      setLoading(false)
      return
    }
    const phone = '+55' + values.replace(/[()-\s]/g, '')
    // console.log(name, email, phone)

    if ((await signUp({ name, email, phone, birth, appVerifier })) === true) {
      router.push('/verify')
      setLoading(false)
    }
    setLoading(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
  }

  React.useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSignUp()
        },
      },
      auth
    )
    // recaptchaVerifier.render().then((widgetId: string) => {
    //   window.recaptchaWidgetId = widgetId
    // })
    setAppVerifier(window.recaptchaVerifier)
  }, [])

  useEffect(() => console.log(birth), [birth])

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <FormLabel className={styles.label}>Nome</FormLabel>
      <TextField
        className={styles.input}
        id="name"
        label="Nome"
        variant="filled"
        value={name}
        required
        error={nameError}
        helperText={nameError ? 'Nome deve ter mais de 3 caracteres' : null}
        onChange={(ev) => {
          setName(ev.target.value)
          setNameError(false)
        }}
      />
      <FormLabel className={styles.label}>E-mail</FormLabel>
      <TextField
        className={styles.input}
        id="email"
        label="Email"
        variant="filled"
        value={email}
        type="email"
        required
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <FormLabel className={styles.label}>Telefone</FormLabel>
      <FormControl style={{ marginTop: '5px' }} variant="filled" required>
        <InputLabel htmlFor="phone">Telefone</InputLabel>
        <FilledInput
          value={values}
          onChange={handleChange}
          name="textmask"
          id="phone"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
      {/* <TextField id="outlined-basic" label="Telefone" variant="filled" /> */}
      <FormLabel className={styles.label}>Data de Nascimento</FormLabel>
      <DatePicker
        className={styles.input}
        format="DD/MM/YYYY"
        value={birth}
        onChange={(value: any) => setBirth(value)}
        slotProps={{ textField: { variant: 'filled', label: 'Data de Nascimento' } }}
      />
      <Button className={styles.button} color="primary" variant="contained" type="submit" onSubmit={handleSignUp}>
        {loading ? <CircularProgress color="secondary" size={24} /> : 'Submeter'}
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div id="recaptcha"></div>
      </div>
    </form>
  )
}

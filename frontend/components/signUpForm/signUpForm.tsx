import React, { FormEvent, useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  Button,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/router";
import {
  ApplicationVerifier,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FirebaseWindow } from "@/helpers/customWindow";
import styles from "./signUpStyles.module.css";
import { app } from "@/pages/_app";
import dayjs, { Dayjs } from "dayjs";

declare let window: FirebaseWindow;

const auth = getAuth(app);
auth.useDeviceLanguage();
// auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 90000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onChange={() => ""}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

interface SignUpProps {
  name: string;
  email: string;
  city: string;
  phone: string;
  birth: Dayjs;
  appVerifier: ApplicationVerifier;
}

export default function SignUpForm() {
  const [values, setValues] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [birth, setBirth] = useState<Dayjs | null>(null);
  const [birthError, setBirthError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appVerifier, setAppVerifier] = useState<any>();
  const router = useRouter();

  function ableToLogin(phone: string) {
    if (name.length < 3) setNameError(true);
    if (!email.includes("@")) setEmailError(true);
    if (!city || city.length < 3) setCityError(true)
    if (phone.length !== 14) setPhoneError(true);
    if (!birth?.isValid()) setBirthError(true);
    if (
      !birth?.isValid() ||
      !email.includes("@") ||
      !city ||
      city.length < 3 ||
      name.length < 3 ||
      phone.length !== 14
    ) {
      setLoading(false);
      return false;
    }

    return true;
  }

  async function handleSignUp(ev?: FormEvent) {
    const phone = "+55" + values.replace(/[()-\s]/g, "");
    ev?.preventDefault();

    if (ableToLogin(phone) && birth)
      await signUp({ name, email, city, phone, birth, appVerifier });
    else console.log("login failed");

    setLoading(false);
  }

  async function signUp(args: SignUpProps) {
    setLoading(true);
    console.log("login successful");
    await signInWithPhoneNumber(auth, args.phone, args.appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        sessionStorage.setItem("name", args.name);
        sessionStorage.setItem("email", args.email);
        sessionStorage.setItem("city", args.city);
        sessionStorage.setItem("phone", args.phone);
        sessionStorage.setItem("birth", String(args.birth.unix()));
        router.push("/verify");
        return confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error(error);
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };

  React.useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // handleSignUp()
        },
      },
      auth
    );
    // recaptchaVerifier.render().then((widgetId: string) => {
    //   window.recaptchaWidgetId = widgetId
    // })
    setAppVerifier(window.recaptchaVerifier);
  }, []);

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
        data-cy="name"
        error={nameError}
        helperText={nameError ? "Nome deve ter mais de 3 caracteres" : null}
        onChange={(ev) => {
          setName(ev.target.value);
          setNameError(false);
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
        data-cy="email"
        error={emailError}
        required
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <FormLabel className={styles.label}>Cidade</FormLabel>
      <TextField
        className={styles.input}
        id="city"
        label="Cidade"
        variant="filled"
        value={city}
        data-cy="city"
        error={cityError}
        required
        onChange={(ev) => setCity(ev.target.value)}
      />
      <FormLabel className={styles.label}>Telefone</FormLabel>
      <FormControl style={{ marginTop: "5px" }} variant="filled" required>
        <InputLabel htmlFor="phone">Telefone</InputLabel>
        <FilledInput
          id="phone"
          value={values}
          onChange={handleChange}
          data-cy="phone"
          error={phoneError}
          name="textmask"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
      <FormLabel className={styles.label}>Data de Nascimento</FormLabel>
      <DatePicker
        className={styles.input}
        format="DD/MM/YYYY"
        value={birth}
        data-cy="birth"
        onChange={(newValue) => setBirth(newValue)}
        slotProps={{
          textField: {
            variant: "filled",
            label: "Data de Nascimento",
            id: "birth",
            error: birthError,
            required: true,
          },
        }}
      />
      <Button
        className={styles.button}
        data-cy="submit"
        color="primary"
        variant="contained"
        type="submit"
        onSubmit={handleSignUp}
      >
        {loading ? (
          <CircularProgress color="secondary" size={24} />
        ) : (
          "Cadastrar"
        )}
      </Button>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div id="recaptcha"></div>
      </div>
    </form>
  );
}

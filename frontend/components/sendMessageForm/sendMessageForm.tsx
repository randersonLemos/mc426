import React, { FormEvent, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import styles from "./sendMessageForm.module.css";
import { sendMessageToMany } from "@/helpers/apiMethods";
import MultipleSelect from "../multiselect/multiselect";

interface SendMessageFormProps {
  names: string[];
  recipients: string[];
}

export default function SendMessageForm({
  names,
  recipients,
}: SendMessageFormProps) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  function canSendMessage(message: string) {
    if (!message || names.length === 0) {
      console.log("cant send");
      return false;
    }

    console.log("can send");
    return true;
  }

  async function handleSendMessage(ev: FormEvent) {
    ev.preventDefault();

    const phones: string[] = [];
    setLoading(true);

    if (canSendMessage(message)) {
      recipients.forEach((recipient) => {
        const phone = recipient.replace(/[+]/g, "");
        phones.push(phone);
      });

      const response = await sendMessageToMany(phones, message);
      if (response) setOpen(true);
    }

    setLoading(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSendMessage}>
      <FormLabel className={styles.label}>Destinatários</FormLabel>
      <MultipleSelect names={names} variant="filled" fullWidth />
      <FormLabel className={styles.label}>Mensagem</FormLabel>
      <TextField
        label="Mensagem"
        data-cy="message"
        variant="filled"
        multiline
        minRows={5}
        value={message}
        required
        onChange={(ev) => setMessage(ev.target.value)}
      />
      <Button
        variant="contained"
        data-cy="submit"
        color="primary"
        type="submit"
        onSubmit={handleSendMessage}
        style={{ marginTop: "30px" }}
      >
        {loading ? (
          <CircularProgress color="secondary" size={24} />
        ) : (
          "Enviar mensagem"
        )}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Mensagem enviada com sucesso!
        </Alert>
      </Snackbar>
    </form>
  );
}

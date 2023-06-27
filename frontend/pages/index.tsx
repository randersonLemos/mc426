import React, { useState } from "react";
import Head from "next/head";
import { Button, Typography, useTheme } from "@mui/material";
import SignUpForm from "@/components/signUpForm/signUpForm";
import Header from "@/components/header/header";
import styles from "@/styles/Home.module.css";
import CampaignCard from "@/components/campaignCard/campaignCard";

export default function Home() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([false, false, false]);
  const theme = useTheme();

  function handleSelected(id: number) {
    const newSelected = [...selected];

    newSelected[id] = !newSelected[id];

    setSelected(newSelected);
  }

  function handleSignUp() {
    localStorage.setItem("vaccination", String(selected[0]));
    localStorage.setItem("weather", String(selected[1]));
    localStorage.setItem("disaster", String(selected[2]));

    setStep(1);
  }

  return (
    <>
      <Head>
        <title>Sistema de Alerta</title>
        <meta name="description" content="Receba alertas do governo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <Header />
        <Typography
          variant="h2"
          color={theme.palette.text.secondary}
          style={{ marginTop: "30px" }}
        >
          {step === 1
            ? "Agora basta fazer o cadastro!"
            : "Selecione os tipos de alerta que deseja receber"}
        </Typography>
        {step === 0 ? (
          <>
            <div className={styles.campaignContainer}>
              <CampaignCard
                title="Vacinação"
                selected={selected[0]}
                imgSrc="/assets/vaccination2.jpg"
                onClick={() => handleSelected(0)}
                description="Fique por dentro das campanhas de vacinação na sua região."
              />
              <CampaignCard
                title="Tempo e Clima"
                selected={selected[1]}
                imgSrc="/assets/weather2.jpg"
                onClick={() => handleSelected(1)}
                description="Receba alertas sobre o tempo na sua região, como alertas de chuva forte, queda brusca de temperatura, entre outros."
              />
              <CampaignCard
                title="Desastres naturais"
                selected={selected[2]}
                onClick={() => handleSelected(2)}
                imgSrc="/assets/inundation.jpg"
                description="Receba alertas sobre possíveis desastres naturais que podem acontecer na sua região."
              />
            </div>
            {selected.includes(true) ? (
              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                onClick={handleSignUp}
              >
                Prosseguir
              </Button>
            ) : null}
          </>
        ) : (
          <>
            <SignUpForm />
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => setStep(0)}
            >
              Voltar
            </Button>
          </>
        )}
      </main>
    </>
  );
}

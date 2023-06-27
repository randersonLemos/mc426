import React, { useState } from "react";
import Header from "@/components/header/header";
import { Button, Typography, useTheme } from "@mui/material";

import styles from "@/styles/adminCampaignSelect.module.css";
import CampaignCard from "@/components/campaignCard/campaignCard";
import { useRouter } from "next/router";

export default function CampaignSelect() {
  const [selected, setSelected] = useState([false, false, false]);
  const theme = useTheme();
  const router = useRouter();

  function handleSelected(id: number) {
    const newSelected = [...selected];

    newSelected[id] = !newSelected[id];

    setSelected(newSelected);
  }

  function handleCampaign() {
    localStorage.setItem("vaxCampaign", String(selected[0]));
    localStorage.setItem("weatherCampaign", String(selected[1]));
    localStorage.setItem("disasterCampaign", String(selected[2]));

    router.push("/admin/dashboard");
  }

  return (
    <main
      className={styles.container}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Header />
      <Typography
        variant="h2"
        color={theme.palette.text.secondary}
        style={{ marginBottom: "10px" }}
      >
        Selecione o tipo de campanha
      </Typography>
      <div className={styles.cardsContainer}>
        <CampaignCard
          title="Vacinação"
          selected={selected[0]}
          imgSrc="/assets/vaccination2.jpg"
          onClick={() => handleSelected(0)}
        />
        <CampaignCard
          title="Tempo e Clima"
          selected={selected[1]}
          imgSrc="/assets/weather2.jpg"
          onClick={() => handleSelected(1)}
        />
        <CampaignCard
          title="Desastres naturais"
          selected={selected[2]}
          onClick={() => handleSelected(2)}
          imgSrc="/assets/inundation.jpg"
        />
      </div>
      <Button
        variant="contained"
        disabled={!selected.includes(true)}
        onClick={handleCampaign}
      >
        Prosseguir
      </Button>
    </main>
  );
}

import React from "react";
import Header from "@/components/header/header";
import { useTheme } from "@mui/material";

import styles from "@/styles/adminCampaignSelect.module.css";

export default function CampaignSelect() {
  const theme = useTheme();

  return (
    <main
      className={styles.container}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Header />
      Ola mundo
    </main>
  );
}

import React from "react";
import { Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./campaignCard.module.css";

interface CampaignCardProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function CampaignCard({
  title,
  description,
  imgSrc,
  selected,
  onClick,
}: CampaignCardProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <section className={styles.media}>
        <img
          src={imgSrc || ""}
          width={320}
          height={165}
          style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
          alt="Campaign"
        />
        {selected ? (
          <div className={styles.checkContainer}>
            <CheckCircleIcon
              color="success"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
        ) : null}
      </section>
      <section className={styles.description}>
        <Typography variant="h3" style={{ marginBlock: "10px" }}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </section>
    </div>
  );
}

import React, { useState, Component } from "react";
import Head from "next/head";
import { Button, Typography, useTheme } from "@mui/material";
import SignUpForm from "@/components/signUpForm/signUpForm";
import Header from "@/components/header/header";
import styles from "@/styles/Home.module.css";
import CampaignCard from "@/components/campaignCard/campaignCard";

import { FireBaseWindow } from "@/helpers/customWindow";
import BackendAdapter from "@/helpers/adpter/backendAdapter";
import { ApplicationVerifier } from "firebase/auth";
import { app } from "@/pages/_app";


const adapter = new BackendAdapter("firebase", app);
declare let window: FirebaseWindow;

adapter.backend?.auth.useDeviceLanguage();

class Simpletextarea extends Component {
	handleSend() {
		//adapter.backend?
		return
	}

	constructor() {
		super();
		this.state = {
			name: "React"
		};
	}
	
	handleChange(event) {
		console.log(event.target.value)
	}
	
	render() {
		
		return (
			<main
				className={styles.container}
				
			>
				<Header />

				<div className="{styles.campaignContainer}">
					<label>Enter value : </label>
					<input type="textarea" name="textValue" onChange={this.handleChange}/>
					<Button
						className={styles.button}
						data-cy="submit"
						color="primary"
						variant="contained"
						type="submit"
						onSubmit={this.handleSend}
					/>
				</div>
			</main>
		);
	}
	
	
}



export default Simpletextarea




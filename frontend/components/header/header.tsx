import React, { useContext } from 'react'
import { IconButton, useTheme, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { getAuth } from 'firebase/auth'
import { MyTheme, app } from '@/pages/_app'

import styles from './headerStyles.module.css'

const auth = getAuth(app)
auth.useDeviceLanguage()

export default function Header() {
  const muiTheme = useTheme()
  const {theme, toggleTheme} = useContext(MyTheme)

  return (
    <header className={styles.header} style={{ backgroundColor: muiTheme.palette.background.default, borderBottom: `1px solid ${muiTheme.palette.divider}` }}>
      <Typography variant="h1" color={muiTheme.palette.text.secondary}>
        Sistema de alerta
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    
      	<Button onClick={() => handleSuggestions()}>
      	Sugestões
      	</Button>
      	
        <IconButton onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>
          <Brightness4Icon />
        </IconButton>
      </div>
    </header>
  )
  
  function handleSuggestions() {
  	const openInNewTab = (url) => {
  		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  		if (newWindow) newWindow.opener = null
	}
	
  	openInNewTab('/suggestions')
  	//router.push("/suggestions")
  }
}

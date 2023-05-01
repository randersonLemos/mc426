import React, { useEffect, useState } from 'react'
import { Button, Typography, useTheme } from '@mui/material'
import Header from '@/components/header/header'
import SendMessageForm from '@/components/sendMessageForm/sendMessageForm'
import { Timestamp, collection, getDocs } from 'firebase/firestore'
import { app, db } from '../../_app'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import styles from '@/styles/adminDashboard.module.css'
import dayjs from 'dayjs'

const auth = getAuth(app)

interface AlertaUser {
  name: string
  email: string
  phone: string
  birthDay: Timestamp | string
  userInfo: string
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    width: 250,
  },
  {
    field: 'birthDay',
    headerName: 'Aniversário',
    sortable: false,
    width: 150,
    valueFormatter: (params) => {
      return dayjs.unix(params.value).format("DD/MM/YYYY")
    }
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    sortable: false,
    width: 150,
    valueFormatter: (params) => {
      const phone = params.value as string
      const phoneFormatted = phone.replace('+55', '')
      return phoneFormatted
    }
  },
]

export default function Admin() {
  const theme = useTheme()
  const [usersSigned, setUsersSigned] = useState<AlertaUser[]>()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin')
      else setUser(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const users: AlertaUser[] = []
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        users.push(doc.data() as AlertaUser)
      })
      setUsersSigned(users)
    }
    getData()
  }, [])

  if (!user) return null

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header />
      <div className={styles.title}>
        <Typography variant="h2" color={theme.palette.text.secondary}>
          Bem vindo, {user.displayName}!
        </Typography>
        <Button variant="text" color="secondary" style={{ marginTop: '10px' }} onClick={() => signOut(auth)}>
          Sair
        </Button>
      </div>
      <div className={styles.adaptativeContainer}>
        <SendMessageForm />
        {usersSigned ? (
          <div className={styles.tableContainer}>
            <Typography variant="h3" color={theme.palette.text.secondary}>Usuários cadastrados</Typography>
            <DataGrid rows={usersSigned} columns={columns} getRowId={(row: AlertaUser) => row.userInfo} />
          </div>
        ) : null}
      </div>
    </main>
  )
}

import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Header from '@/components/header/header'
import SendMessageForm from '@/components/sendMessageForm/sendMessageForm'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../_app'
import { DataGrid } from '@mui/x-data-grid'
import styles from '@/styles/adminDashboard.module.css'

type AdminProps = {
  setActiveTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const columns = [
  {
    field: 'name',
    headerName: 'Nome',
    sortable: false,
    width: 150
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    width: 150
  },
  {
    field: 'birthDay',
    headerName: 'Aniversario',
    sortable: false,
    width: 150
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    sortable: false,
    width: 150
  },
]

export default function Admin({ setActiveTheme }: AdminProps) {
  const theme = useTheme()
  const [usersSigned, setUsersSigned] = useState<any>([])
  useEffect(() => {
    async function getData() {
      const users: any[] = []
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.push(doc.data())
      })
      setUsersSigned(users)
    }

    if (usersSigned.length === 0) getData()
  }, [])

  return (
    <main className={styles.container} style={{ backgroundColor: theme.palette.background.default }}>
      <Header setActiveTheme={setActiveTheme} />
      <SendMessageForm />
      {usersSigned ? (
        <div style={{ width: '80%', marginTop: '30px'}}>
          <DataGrid rows={usersSigned} columns={columns} getRowId={(row: any) => row.uid} />
        </div>
      ) : null}
    </main>
  )
}

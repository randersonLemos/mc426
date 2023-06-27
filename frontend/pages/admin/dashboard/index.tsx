import React, { useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import Header from "@/components/header/header";
import SendMessageForm from "@/components/sendMessageForm/sendMessageForm";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { app, db } from "../../_app";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import styles from "@/styles/adminDashboard.module.css";

const auth = getAuth(app);

interface AlertaUser {
  name: string;
  email: string;
  phone: string;
  birthDay: Timestamp | string;
  uid: string;
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nome",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    minWidth: 250,
    flex: 1,
  },
  {
    field: "city",
    headerName: "Cidade",
    sortable: false,
    minWidth: 180,
    flex: 1,
  },
  // {
  //   field: "birthDay",
  //   headerName: "Aniversário",
  //   sortable: false,
  //   width: 150,
  //   type: "date",
  //   valueGetter: (params) => {
  //     const birthDay = dayjs.unix(params.value).format("MM/DD/YYYY");
  //     const birthDayObject = new Date(birthDay);
  //     return birthDayObject;
  //   },
  //   valueFormatter: (params) => {
  //     const birthDay = dayjs(params.value).format("DD/MM/YYYY");
  //     return birthDay;
  //   },
  // },
  {
    field: "age",
    headerName: "Idade",
    align: "left",
    headerAlign: "left",
    type: "number",
    flex: 1,
  },
  // {
  //   field: "phone",
  //   headerName: "Telefone",
  //   sortable: false,
  //   width: 150,
  //   valueFormatter: (params) => {
  //     const phone = params.value as string;
  //     const phoneFormatted = phone.replace("+55", "");
  //     return phoneFormatted;
  //   },
  // },
];

// const birthDay = dayjs.unix(params.value).add(1, "days");
// const today = dayjs();

// return today.diff(birthDay, "years");

export default function Admin() {
  const [usersSigned, setUsersSigned] = useState<AlertaUser[]>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const router = useRouter();
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin");
      else setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const users: AlertaUser[] = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        const birthDay = dayjs.unix(doc.data().birthDay).add(1, "days");
        const today = dayjs();
        const userData = doc.data();
        userData.age = today.diff(birthDay, "years");
        users.push(userData as AlertaUser);

        // return today.diff(birthDay, "years");
      });
      setUsersSigned(users);
    }
    getData();
  }, []);

  if (!user) return null;

  return (
    <main
      className={styles.container}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Header />
      <div className={styles.title}>
        <Typography variant="h2" color={theme.palette.text.secondary}>
          Bem vindo, {user.displayName}!
        </Typography>
        <Button
          variant="text"
          color="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => signOut(auth)}
        >
          Sair
        </Button>
      </div>
      <div className={styles.adaptativeContainer}>
        <SendMessageForm
          names={rowSelectionModel.map((value) => String(value).split(" ")[0])}
          recipients={rowSelectionModel.map(
            (value) =>
              String(value).split(" ")[String(value).split(" ").length - 1]
          )}
        />
        {usersSigned ? (
          <div className={styles.tableContainer}>
            <Typography
              variant="h3"
              color={theme.palette.text.secondary}
              style={{ marginBottom: "5px" }}
            >
              Usuários cadastrados
            </Typography>
            <DataGrid
              rows={usersSigned}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[5, 10, 15, 20]}
              paginationModel={paginationModel}
              slots={{ toolbar: GridToolbar }}
              getRowId={(row: AlertaUser) => row.name + " " + row.phone}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              rowSelectionModel={rowSelectionModel}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}

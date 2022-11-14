import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import {
  Container,
  Grid,
  TextField,
  Divider,
  Button,
  Typography,
  ListItemButton,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useSelector } from "react-redux";
import refreshToken from "../api/post/refreshToken";
import getForms from "../api/get/getForms";
import { Alert } from "@mui/material";
import createAppointment from "../api/post/createAppointment";
import moment from "moment";
import getAppointments from "../api/get/getAppointments";

const Appointment = () => {
  // const { control, handleSubmit } = useForm();
  // const [forms, setForms] = useState([]);
  // const [kid, setKid] = useState("");
  // const [appointments, setAppointments] = useState([]);

  // const loadForms = async (retry) => {
  //   try {
  //     const response = await getForms("validateForms");
  //     setForms(response);
  //   } catch (error) {
  //     if (retry) {
  //       try {
  //         await refreshToken();
  //         await loadForms(false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  // const loadAppointments = async (retry) => {
  //   try {
  //     const response = await getAppointments();
  //     setAppointments(response);
  //   } catch (error) {
  //     if (retry) {
  //       try {
  //         await refreshToken();
  //         await loadAppointments(false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  // const onSubmit = async (data, retry) => {
  //   try {
  //     await createAppointment(new Date(data.appointment), kid);
  //     window.location.replace("/");
  //   } catch (error) {
  //     if (retry) {
  //       try {
  //         await refreshToken();
  //         await onSubmit(data, false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  // useEffect(() => loadForms(true) && loadAppointments(true), []);

  return (
    <Container
      component='main'
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Alert color='warning' sx={{ mb: 4 }}>
        {lang === 'gr'
          ? 'Θα πρέπει να έχετε μαζί σας κάποιο επίσημο έγγραφο ταυτοπροσωπίας, τόσο εσεις, όσο και ο επίσημος μεταφραστής ή κοινωνικός λειτουργός που θα σας συνοδεύει.'
          : lang === 'en'
          ? 'You must have an official identity document with you, as well as the official translator or social worker who will accompany you.'
          : "Vous devez avoir sur vous une pièce d'identité officielle, ainsi que le traducteur officiel ou l'assistante sociale qui vous accompagnera."}
      </Alert>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={{ textAlign: 'center' }}
      >
        {lang === 'gr'
          ? 'Για να προγραμματίσετε το ραντεβού σας, καλέστε το ληξιαρχείο στο (+30) 2413500254'
          : lang === 'en'
          ? 'To schedule your appointment please call the registry office at (+30)2413500254'
          : "Pour planifier votre rendez-vous, veuillez appeler le bureau d'état civil au (+30)2413500254"}
      </Typography>
      <Typography
        variant='h6'
        gutterBottom
        component='div'
        sx={{ textAlign: 'center' }}
      >
        {lang === 'gr'
          ? 'Διεύθυνση: ΔΗΜΟΣ ΛΑΡΙΣΑΙΩΝ, Ίωνος Δραγούμη 1, Τ.Κ. 41222'
          : lang === 'fr'
          ? 'Adresse : Municipalité de Larisa, 1 rue Ionos Dragoumi C.P. 41222'
          : 'Address: Municipality of Larisa, 1 Ionos Dragoumi str P.C. 41222'}
      </Typography>
      <Button variant='contained'>
        <a
          href='tel:+30 2413500254'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {lang === 'gr' ? 'Κληση' : lang === 'fr' ? 'Appel' : 'Call'}
        </a>
      </Button>
      {/* {forms.length > 0 ? (
        kid ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, true))}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
              >
                <Grid item xs={12}>
                  <Controller
                    name="appointment"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DateTimePicker
                        label="Κλείστε Ραντεβού"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth required />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    ΑΠΟΘΗΚΕΥΣΗ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        ) : (
          <>
            <Typography color="primary.main">
              Scheduled appointments:
            </Typography>
            <List>
              {appointments.map((appointment) => (
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemText
                      primary={moment(appointment.datetime)
                        .locale("el")
                        .format("lll")}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Typography color="primary.main" sx={{ mt: 4 }}>
              Please select the kid for a new appointment:
            </Typography>
            <List>
              {forms.map((form) => (
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    onClick={() => setKid(form.id)}
                    sx={{ backgroundColor: "primary.200" }}
                  >
                    <ListItemText
                      primary={`${form.child.firstName} ${form.child.lastname}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )
      ) : (
        <Alert color="error">
          Your not invited to schedule any appointments
        </Alert>
      )} */}
    </Container>
  )
};

export default Appointment;

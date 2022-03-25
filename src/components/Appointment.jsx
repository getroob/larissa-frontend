import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
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
import MunicipalityAppointments from "./MunicipalityAppointments";
import moment from "moment";
import getAppointments from "../api/get/getAppointments";

const Appointment = () => {
  const { control, handleSubmit } = useForm();
  const [forms, setForms] = useState([]);
  const [kid, setKid] = useState("");
  const [appointments, setAppointments] = useState([]);

  const loadForms = async (retry) => {
    try {
      const response = await getForms("validateForms");
      setForms(response);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadForms(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const loadAppointments = async (retry) => {
    try {
      const response = await getAppointments();
      setAppointments(response);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadAppointments(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const onSubmit = async (data, retry) => {
    try {
      await createAppointment(new Date(data.appointment), kid);
      window.location.replace("/");
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await onSubmit(data, false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  useEffect(() => loadForms(true) && loadAppointments(true), []);

  return (
    <Container component="main" maxWidth="xs">
      {forms.length > 0 ? (
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
      )}
    </Container>
  );
};

export default Appointment;

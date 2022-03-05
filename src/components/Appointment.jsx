import React, { useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  TextField,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useSelector } from "react-redux";

const Appointment = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(
        "http://127.0.0.1:8080/municipality/1dguni1k1rkwqvbgmx",
        {
          method: "PUT",
          body: JSON.stringify({ ...data, refugeeId: 1 }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const newCertificate = await response.json();
        return newCertificate;
      }
    } catch (error) {
      alert(error);
    }
  };
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
    </Container>
  );
};

export default Appointment;

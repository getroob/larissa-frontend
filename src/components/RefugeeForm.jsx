import React, { useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const RefugeeForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastname: "",
      gender: "",
      birthdate: "",
      birthtime: "",
      birthbuilding: "",
      birthtype: "",
      ssn: "",
      birthplace: "",
      birthwitness: "",
      responsible: {
        fullname: "",
        residency: "",
        category: "",
      },
      doctor: {
        fullname: "",
        residency: "",
        phone: "",
      },
      father: {
        lastName: "",
        firstName: "",
        citizenship: "",
        residency: "",
        religion: "",
        faith: "",
        municipalityRegistered: "",
        municipalityId: "",
        vat: "",
        ssn: "",
        ssprovider: "",
      },
      mother: {
        lastName: "",
        firstName: "",
        citizenship: "",
        residency: "",
        religion: "",
        faith: "",
        municipalityRegistered: "",
        municipalityId: "",
        vat: "",
        ssn: "",
        ssprovider: "",
      },
    },
  });

  const onLoad = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/municipality/1dguni23m7kwrnlwph",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const newCertificate = await response.json();
        console.log(newCertificate);
        reset(newCertificate);
        return newCertificate;
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => onLoad(), []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(
        "http://127.0.0.1:8080/municipality/1dguni23m7kwrnlwph",
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
      <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h6">
              ΕΠΙΒΕΒΑΙΩΣΤΕ ΤΑ ΣΤΟΙΧΕΙΑ
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Επίθετο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Όνομα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Φύλο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthdate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ημερομηνία Γέννησης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthtime"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ώρα Γέννησης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthbuilding"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Μέρος Γέννησης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthtype"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Είδος Τοκετού"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="ssn"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Α.Μ.Κ.Α."
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthplace"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τόπος Γέννησης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthwitness"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Παραστάτες Γέννησης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" variant="h6">
              ΣΤΟΙΧΕΙΑ ΔΗΛΟΥΝΤΟΣ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="responsible.fullname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ονοματεπώνυμο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="responsible.residency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τόπος Κατοικίας"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="responsible.category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Κατηγορία"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" variant="h6">
              ΣΤΟΙΧΕΙΑ ΓΙΑΤΡΟΥ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="doctor.fullname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ονοματεπώνυμο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="doctor.residency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τόπος Κατοικίας"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="doctor.phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τηλέφωνο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" variant="h6">
              ΣΤΟΙΧΕΙΑ ΠΑΤΕΡΑ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Επίθετο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Όνομα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.citizenship"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ιθαγένεια"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.residency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τόπος Κατοικίας"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="father.religion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Θρήσκευμα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="father.faith"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Δόγμα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.municipalityRegistered"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Δήμος Εγγραφής"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.municipalityId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Αρ. Δημοτολογίου"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.vat"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Α.Φ.Μ."
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.ssn"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Α.Μ.Κ.Α."
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="father.ssprovider"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Φορέας Ασφάλισης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" variant="h6">
              ΣΤΟΙΧΕΙΑ ΜΗΤΕΡΑΣ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Επίθετο"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Όνομα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.citizenship"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Ιθαγένεια"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.residency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Τόπος Κατοικίας"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mother.religion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Θρήσκευμα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mother.faith"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Δόγμα"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.municipalityRegistered"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Δήμος Εγγραφής"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.municipalityId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Αρ. Δημοτολογίου"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.vat"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Α.Φ.Μ."
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.ssn"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Α.Μ.Κ.Α."
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mother.ssprovider"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Φορέας Ασφάλισης"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
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
    </Container>
  );
};

export default RefugeeForm;

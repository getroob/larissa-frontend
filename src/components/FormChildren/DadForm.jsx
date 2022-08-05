import React from "react";
import { Controller } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { useSelector } from 'react-redux';

const DadForm = ({ isWritable, control }) => {
  const lang = useSelector((state) => state.lang);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      style={{ maxWidth: "500px" }}
    >
      <Grid item>
        <Controller
          name="father.lastName"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={lang === 'gr' ? "Επίθετο" : 'Last Name'}
              variant="outlined"
              value={value}
              onChange={(event) => onChange({
                  ...event,
                  target: {
                    ...event.target,
                    value: event.target.value.replace(/[0-9]+/ig, '')
                  }
                })
              }
              fullWidth
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.firstName"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={lang === 'gr' ? "Όνομα" : 'First Name'}
              variant="outlined"
              value={value}
              onChange={(event) => onChange({
                  ...event,
                  target: {
                    ...event.target,
                    value: event.target.value.replace(/[0-9]+/ig, '')
                  }
                })
              }
              fullWidth
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.ssn"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label={lang === 'gr' ? "Α.Δ.Τ." : 'ID'}
              variant="outlined"
              value={value}
              onChange={onChange}
              fullWidth
              error={!!error}
            />
          )}
        />
      </Grid>
      {/* <Grid item>
        <Controller
          name="father.citizenship"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Ιθαγένεια" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.residency"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.religion"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Θρήσκευμα" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.faith"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Δόγμα" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.municipalityRegistered"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Δήμος Εγγραφής" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.municipalityId"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Αρ. Δημοτολογίου" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.vat"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Α.Φ.Μ." variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.ssn"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Α.Μ.Κ.Α." variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.ssprovider"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Φορέας Ασφάλισης" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid> */}
    </Grid>
  );
};

export default DadForm;

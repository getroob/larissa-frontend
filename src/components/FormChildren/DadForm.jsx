import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const DadForm = ({ isWritable, control }) => {
  return (
    <>
      <Grid item>
        <Controller
          name="father.lastName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Επίθετο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Όνομα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.citizenship"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ιθαγένεια" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.residency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.religion"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Θρήσκευμα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.faith"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Δόγμα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.municipalityRegistered"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Δήμος Εγγραφής" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.municipalityId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Αρ. Δημοτολογίου" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.vat"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Α.Φ.Μ." variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.ssn"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Α.Μ.Κ.Α." variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="father.ssprovider"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Φορέας Ασφάλισης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
    </>
  );
};

export default DadForm;

import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const MomForm = ({ isWritable, control }) => {
  return (
    <>
      <Grid item>
        <Controller
          name="mother.lastName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Επίθετο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Όνομα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.citizenship"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ιθαγένεια" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.residency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.religion"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Θρήσκευμα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.faith"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Δόγμα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.municipalityRegistered"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Δήμος Εγγραφής" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.municipalityId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Αρ. Δημοτολογίου" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.vat"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Α.Φ.Μ." variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.ssn"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Α.Μ.Κ.Α." variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="mother.ssprovider"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Φορέας Ασφάλισης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
    </>
  );
};

export default MomForm;

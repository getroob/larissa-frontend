import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const ChildForm = ({ isWritable, control }) => {
  return (
    <>
      <Grid item>
        <Controller
          name="lastname"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Επίθετο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Όνομα" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Φύλο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthdate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ημερομηνία Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthtime"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ώρα Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthbuilding"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Μέρος Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthtype"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Είδος Τοκετού" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="ssn"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Α.Μ.Κ.Α." variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthplace"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τόπος Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="birthwitness"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Παραστάτες Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
    </>
  );
};

export default ChildForm;

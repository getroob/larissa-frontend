import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';

const ChildForm = ({ isWritable, control }) => {
  return (
    <Grid container spacing={2} direction="column" style={{ maxWidth: '500px' }}>
      <Grid item>
        <Controller
          name="child.lastname"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Επίθετο" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.firstName"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Όνομα" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.gender"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Φύλο" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.birthday"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Ημερομηνία και Ώρα Γέννησης"
                variant="outlined"
                value={value}
                onChange={onChange}
                inputFormat="dd/MM/yyyy HH:mm"
                error={!!error}
                helperText={error ? error.message : null}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.birthbuilding"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Μέρος Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.birthtype"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Είδος Τοκετού" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.ssn"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Α.Μ.Κ.Α." variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.birthplace"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Τόπος Γέννησης" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="child.birthwitness"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Παραστάτες Γέννησης"
              variant="outlined"
              value={value}
              onChange={onChange}
              fullWidth
              error={!!error}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ChildForm;

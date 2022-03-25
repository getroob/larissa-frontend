import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const ResponsibleForm = ({ isWritable, control }) => {
  return (
    <Grid container spacing={2} direction="column" style={{ maxWidth: '500px' }}>
      <Grid item>
        <Controller
          name="responsible.fullname"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Ονοματεπώνυμο" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="responsible.residency"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="responsible.category"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField label="Κατηγορία" variant="outlined" value={value} onChange={onChange} fullWidth error={!!error} />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ResponsibleForm;

import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const ResponsibleForm = ({ isWritable, control }) => {
  return (
    <>
      <Grid item>
        <Controller
          name="responsible.fullname"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ονοματεπώνυμο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="responsible.residency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="responsible.category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Κατηγορία" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
    </>
  );
};

export default ResponsibleForm;

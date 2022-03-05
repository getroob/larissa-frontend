import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

const DoctorForm = ({ isWritable, control }) => {
  return (
    <>
      <Grid item>
        <Controller
          name="doctor.fullname"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Ονοματεπώνυμο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="doctor.residency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τόπος Κατοικίας" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="doctor.phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField label="Τηλέφωνο" variant="outlined" value={value} onChange={onChange} fullWidth />
          )}
        />
      </Grid>
    </>
  );
};

export default DoctorForm;

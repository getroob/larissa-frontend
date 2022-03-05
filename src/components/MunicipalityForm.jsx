import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Grid, TextField, Box, Button, Typography, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import ChildForm from './FormChildren/ChildForm';
import DadForm from './FormChildren/DadForm';
import MomForm from './FormChildren/MomForm';
import DoctorForm from './FormChildren/DoctorForm';
import ResponsibleForm from './FormChildren/ResponsibleForm';

const MunicipalityForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastname: '',
      gender: '',
      birthdate: '',
      birthtime: '',
      birthbuilding: '',
      birthtype: '',
      ssn: '',
      birthplace: '',
      birthwitness: '',
      responsible: {
        fullname: '',
        residency: '',
        category: '',
      },
      doctor: {
        fullname: '',
        residency: '',
        phone: '',
      },
      father: {
        lastName: '',
        firstName: '',
        citizenship: '',
        residency: '',
        religion: '',
        faith: '',
        municipalityRegistered: '',
        municipalityId: '',
        vat: '',
        ssn: '',
        ssprovider: '',
      },
      mother: {
        lastName: '',
        firstName: '',
        citizenship: '',
        residency: '',
        religion: '',
        faith: '',
        municipalityRegistered: '',
        municipalityId: '',
        vat: '',
        ssn: '',
        ssprovider: '',
      },
    },
  });

  const [isWritable, setWritable] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const steps = [
    {
      label: 'Στοιχεία Παιδιού',
      content: <ChildForm control={control} isWritable={isWritable} />,
    },
    {
      label: 'Στοιχεία Πατέρα',
      content: <DadForm control={control} isWritable={isWritable} />,
    },
    {
      label: 'Στοιχεία Μητέρας',
      content: <MomForm control={control} isWritable={isWritable} />,
    },
    {
      label: 'Στοιχεία Γιατρού',
      content: <DoctorForm control={control} isWritable={isWritable} />,
    },
    {
      label: 'Στοιχεία Μάρτυρα',
      content: <ResponsibleForm control={control} isWritable={isWritable} />,
    },
  ];

  const visibleForm = (i) => {
    return steps[i].content;
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch('http://127.0.0.1:8080/municipality/', {
        method: 'POST',
        body: JSON.stringify({ ...data, refugeeId: 1 }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        alert('Failed to fetch');
      } else {
        const newCertificate = await response.json();
        return newCertificate;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container component="main">
      <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Grid container spacing={2} direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
          {visibleForm(activeStep)}
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default MunicipalityForm;

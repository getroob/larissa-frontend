import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Grid, TextField, Box, Button, Typography, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ChildForm from './FormChildren/ChildForm';
import DadForm from './FormChildren/DadForm';
import MomForm from './FormChildren/MomForm';
import DoctorForm from './FormChildren/DoctorForm';
import ResponsibleForm from './FormChildren/ResponsibleForm';

const MunicipalityForm = () => {
  const [isWritable, setWritable] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const validationSchema = [
    yup.object().shape({
      child: yup.object().shape({
        firstName: yup.string().label('First Name').required(),
        lastname: yup.string().required(),
        gender: yup.string().required(),
        birthday: yup.string().required(),
        birthbuilding: yup.string().required(),
        birthtype: yup.string().required(),
        ssn: yup.string().required(),
        birthplace: yup.string().required(),
        birthwitness: yup.string().required(),
      }),
    }),
    yup.object().shape({
      father: yup.object().shape({
        lastName: yup.string().required(),
        firstName: yup.string().required(),
        citizenship: yup.string().required(),
        residency: yup.string().required(),
        religion: yup.string().required(),
        faith: yup.string().required(),
        municipalityRegistered: yup.string().required(),
        municipalityId: yup.string().required(),
        vat: yup.string().required(),
        ssn: yup.string().required(),
        ssprovider: yup.string().required(),
      }),
    }),
    yup.object().shape({
      mother: yup.object().shape({
        lastName: yup.string().required(),
        firstName: yup.string().required(),
        citizenship: yup.string().required(),
        residency: yup.string().required(),
        religion: yup.string().required(),
        faith: yup.string().required(),
        municipalityRegistered: yup.string().required(),
        municipalityId: yup.string().required(),
        vat: yup.string().required(),
        ssn: yup.string().required(),
        ssprovider: yup.string().required(),
      }),
    }),
    yup.object().shape({
      doctor: yup.object().shape({
        fullname: yup.string().required(),
        residency: yup.string().required(),
        phone: yup.string().required(),
      }),
    }),
    yup.object().shape({
      responsible: yup.object().shape({
        fullname: yup.string().required(),
        residency: yup.string().required(),
        category: yup.string().required(),
      }),
    }),
  ];
  const { control, handleSubmit, trigger, reset } = useForm({
    shouldUnregister: false,
    defaultValues: {
      child: {
        firstName: '',
        lastname: '',
        gender: '',
        birthday: new Date(),
        birthbuilding: '',
        birthtype: '',
        ssn: '',
        birthplace: '',
        birthwitness: '',
      },
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
    resolver: yupResolver(validationSchema[activeStep]),
    mode: 'onChange',
  });

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

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

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
      <form>
        <Box sx={{ justifyContent: 'flex-start' }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent style={{ textAlign: '-webkit-center' }}>
                  {visibleForm(activeStep)}
                  <Box sx={{ display: 'flex', maxWidth: '500px', mt: 2, color: 'white' }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ ml: 1 }}
                      variant="contained"
                      startIcon={<ArrowBackIosNewIcon />}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 0 auto' }} />
                    {activeStep !== 4 ? (
                      <Button onClick={handleNext} sx={{ mr: 1 }} variant="contained" endIcon={<ArrowForwardIosIcon />}>
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit(onSubmit)} sx={{ mr: 1 }} variant="contained">
                        Submit
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </form>
    </Container>
  );
};

export default MunicipalityForm;

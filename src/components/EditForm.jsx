import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ButtonGroup,
  Alert,
  AlertTitle,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import ChildForm from "./FormChildren/ChildForm";
import DadForm from "./FormChildren/DadForm";
import MomForm from "./FormChildren/MomForm";
import ResidencyForm from "./FormChildren/ResidencyForm";
import DoctorForm from "./FormChildren/DoctorForm";
import ResponsibleForm from "./FormChildren/ResponsibleForm";
import { useParams } from "react-router-dom";
import getForm from "../api/get/getForm";
import { useSelector } from "react-redux";
import refreshToken from "../api/post/refreshToken";
import updateForm from "../api/put/updateForm";
import LanguageHelper from "../tools/LanguageHelper";
import deleteForm from "../api/delete/deleteForm";

const MunicipalityForm = () => {
  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const [createdBy, setCreatedBy] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [isWritable, setWritable] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const validationSchema = [
    // yup.object().shape({
    //   child: yup.object().shape({
    //     firstName: yup.string().label("First Name").required(),
    //     lastname: yup.string().required(),
    //     gender: yup.string().required(),
    //     birthday: yup.string().required(),
    //     birthbuilding: yup.string().required(),
    //     birthtype: yup.string().required(),
    //     ssn: yup.string().required(),
    //     birthplace: yup.string().required(),
    //     birthwitness: yup.string().required(),
    //   }),
    // }),
    yup.object().shape({
      mother: yup.object().shape({
        lastName: yup.string().required(),
        firstName: yup.string().required(),
        // citizenship: yup.string(),
        // residency: yup.string(),
        // religion: yup.string(),
        // faith: yup.string(),
        // municipalityRegistered: yup.string(),
        // municipalityId: yup.string(),
        // vat: yup.string(),
        ssn: yup.string().required(),
        // ssprovider: yup.string(),
      }),
    }),
    yup.object().shape({
      father: yup.object().shape({
        lastName: yup.string(),
        firstName: yup.string(),
        // citizenship: yup.string(),
        // residency: yup.string(),
        // religion: yup.string(),
        // faith: yup.string(),
        // municipalityRegistered: yup.string(),
        // municipalityId: yup.string(),
        // vat: yup.string(),
        ssn: yup.string(),
        // ssprovider: yup.string(),
      }),
    }),
    // yup.object().shape({
    //   doctor: yup.object().shape({
    //     fullname: yup.string().required(),
    //     residency: yup.string().required(),
    //     phone: yup.string().required(),
    //   }),
    // }),
    // yup.object().shape({
    //   responsible: yup.object().shape({
    //     fullname: yup.string().required(),
    //     residency: yup.string().required(),
    //     category: yup.string().required(),
    //   }),
    // }),
    yup.object().shape({
      residency: yup.object().shape({
        city: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required(),
      }),
    }),
  ];
  const { control, getValues, handleSubmit, trigger, reset } = useForm({
    shouldUnregister: false,
    defaultValues: {
      // child: {
      //   firstName: "",
      //   lastname: "",
      //   gender: "",
      //   birthday: new Date(),
      //   birthbuilding: "",
      //   birthtype: "",
      //   ssn: "",
      //   birthplace: "",
      //   birthwitness: "",
      // },
      // responsible: {
      //   fullname: "",
      //   residency: "",
      //   category: "",
      // },
      // doctor: {
      //   fullname: "",
      //   residency: "",
      //   phone: "",
      // },
      father: {
        lastName: "",
        firstName: "",
        // citizenship: "",
        // residency: "",
        // religion: "",
        // faith: "",
        // municipalityRegistered: "",
        // municipalityId: "",
        // vat: "",
        ssn: "",
        // ssprovider: "",
      },
      mother: {
        lastName: "",
        firstName: "",
        // citizenship: "",
        // residency: "",
        // religion: "",
        // faith: "",
        // municipalityRegistered: "",
        // municipalityId: "",
        // vat: "",
        ssn: "",
        // ssprovider: "",
      },
      residency: {
        city: "",
        address: "",
        phone: "",
      },
    },
    resolver: yupResolver(validationSchema[activeStep]),
    mode: "onChange",
  });

  const steps = [
    // {
    //   label: "Στοιχεία Παιδιού",
    //   content: <ChildForm control={control} isWritable={isWritable} />,
    // },
    {
      label: lang === 'gr' ? 'Στοιχεία Μητέρας' : lang === 'fr' ? 'Infos de la mère' : 'Info of Mother',
      content: <MomForm control={control} isWritable={isWritable} />,
    },
    {
      label: lang === 'gr' ? 'Στοιχεία Πατέρα' : lang === 'fr' ? 'Infos du père' : 'Info of Father',
      content: <DadForm control={control} isWritable={isWritable} />,
    },
    {
      label: lang === 'gr' ? 'Στοιχεία Κατοικίας' : lang === 'fr' ? 'Informations sur l\'adresse' : 'Adderess Info',
      content: <ResidencyForm control={control} isWritable={isWritable} />,
    },
    // {
    //   label: "Στοιχεία Γιατρού",
    //   content: <DoctorForm control={control} isWritable={isWritable} />,
    // },
    // {
    //   label: "Στοιχεία Μάρτυρα",
    //   content: <ResponsibleForm control={control} isWritable={isWritable} />,
    // },
  ];

  const { formId } = useParams();

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

  const loadForm = async (retry) => {
    try {
      const response = await getForm(formId);
      setCreatedBy(response?.createdBy);
      reset(response);
    } catch (error) {
      if (
        JSON?.parse(error?.toString()?.replace("Error: ", ""))?.status === 404
      ) {
        setNotFound(true);
      } else if (retry) {
        try {
          await refreshToken();
          await loadForm(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const onSubmit = async (data, retry, type) => {
    try {
      await updateForm({...data, stage: type});
      window.location.replace(
        user?.role === "refugee"
          ? data?.createdBy === "refugee"
            ? "/preperation"
            : "/"
          : data?.createdBy === "refugee"
          ? "/preparedForms"
          : "/"
      );
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await onSubmit(data, false, type);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  useEffect(() => loadForm(true), [formId]);

  return (
    <Container component="main">
      {notFound ? (
        <Alert color="warning">{user?.role === "municipality" || lang === 'gr' ? 'Η φορμα δεν βρεθηκε' : lang === 'fr' ? 'Formulaire introuvable' : 'Form Not Found'}</Alert>
      ) : (
        <form>
          <Box sx={{ justifyContent: "flex-start" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent style={{ textAlign: "-webkit-center" }}>
                    {visibleForm(activeStep)}
                    {activeStep === 2 && user?.role !== "refugee" && createdBy === "refugee" && (
                      <Alert color="warning" sx={{ m: 2, maxWidth: 400 }}>
                        <AlertTitle>
                          {user?.role === "municipality" || lang === 'gr' ? 'Θελετε σιγουρα να αλλαξετε αυτη την φορμα' : lang === 'fr' ? 'Voulez-vous vraiment le mettre à jour ?' : 'Are you sure you want to updated it?'}
                        </AlertTitle>
                        {user?.role === "municipality" || lang === 'gr' ? 'Αυτη η φορμα δημιουργηθηκε απο προσφυγα' : lang === 'fr' ? 'Il s\'agit d\'un formulaire créé par un réfugié.' :'This is a form created by a refugee.'}
                      </Alert>
                    )}
                    <Box
                      sx={{ display: "flex", maxWidth: "500px", p: 1, mt: 2 }}
                    >
                      <Button
                        color="secondary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="contained"
                        startIcon={<ArrowBackIosNewIcon />}
                      >
                        {user?.role === "municipality" || lang === 'gr' ? 'Πισω' : lang === 'fr' ? 'Retour' : 'Back'}
                      </Button>
                      <Box sx={{ flex: "1 0 auto" }} />
                      {activeStep !== 2 ? (
                        <Button
                          onClick={handleNext}
                          variant="contained"
                          endIcon={<ArrowForwardIosIcon />}
                        >
                          {user?.role === "municipality" || lang === 'gr' ? 'Επομενο' : lang === 'fr' ? 'Prochain' : 'Next'}
                        </Button>
                      ) : (
                        <ButtonGroup variant="contained">
                          <Button
                            onClick={handleSubmit((data) => onSubmit(data, true, 'edit'))}
                            variant="contained"
                            disabled={getValues().stage !== 'edit'}
                          >
                            {user?.role === "municipality" || lang === 'gr' ? 'Αποθήκευση' : lang === 'fr' ? 'sauvegarder' :'Save'}
                          </Button>
                          <Button
                            onClick={handleSubmit((data) => onSubmit(data, true, 'done'))}
                            variant="outlined"
                            disabled={getValues().stage !== 'edit'}
                          >
                            {user?.role === "municipality" || lang === 'gr' ? 'Οριστικοποίηση' : lang === 'fr' ? 'Soumettre' :'Submit'}
                          </Button>
                        </ButtonGroup>
                      )}
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default MunicipalityForm;

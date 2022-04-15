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
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const [createdBy, setCreatedBy] = useState("");

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
      label: "Στοιχεία Μητέρας",
      content: <MomForm control={control} isWritable={isWritable} />,
    },
    {
      label: "Στοιχεία Πατέρα",
      content: <DadForm control={control} isWritable={isWritable} />,
    },
    {
      label: "Στοιχεία Κατοικίας",
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
      if (retry) {
        try {
          await refreshToken();
          await loadForm(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const onSubmit = async (data, retry) => {
    try {
      await updateForm(data);
      window.location.replace(
        user.role === "refugee"
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
          await onSubmit(data, false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const handleDeleteForm = async (retry) => {
    try {
      await deleteForm(formId);
      window.location.replace(user.role === "refugee" ? "/preperation" : "/");
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await handleDeleteForm(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  useEffect(() => loadForm(true), [formId]);

  return (
    <Container component="main">
      <Box display="flex" justifyContent="flex-end">
        <ButtonGroup>
          <Button
            variant="outlined"
            color="info"
            onClick={() => {
              const values = getValues();

              pdfMake
                .createPdf({
                  content: [
                    {
                      columns: [
                        {
                          width: 350,
                          text: "ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ\n\n\n\n",
                          style: "header",
                        },
                        {
                          text: [
                            {
                              style: "spreadLine",
                              text: "Λάρισα............................\nΑριθ.Πρωτ......................\n",
                            },
                            "Προς το Ληξιαρχείο ΔΕ Λαρισαίων\n\n\n\n",
                          ],
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          width: 300,
                          style: "spreadLine",
                          text: [
                            `Επώνυμο πατέρα: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.father?.lastName
                                  ? values?.father?.lastName
                                  : "____________________________________"
                              }`,
                            },
                            `\nΌνομα πατέρα: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.father?.firstName
                                  ? values?.father?.firstName
                                  : "_______________________________________"
                              }`,
                            },
                            `\nΑ.Δ.Τ.: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.father?.ssn
                                  ? values?.father?.ssn
                                  : "________________________________________________"
                              }`,
                            },
                            `\n\nΕπώνυμο μητέρας: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.mother?.lastName
                                  ? values?.mother?.lastName
                                  : "___________________________________"
                              }`,
                            },
                            `\nΌνομα μητέρας: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.mother?.firstName
                                  ? values?.mother?.firstName
                                  : "______________________________________"
                              }`,
                            },
                            `\nΑ.Δ.Τ.: `,
                            {
                              color: "#00f",
                              text: `${
                                values?.mother?.ssn
                                  ? values?.mother?.ssn
                                  : "________________________________________________"
                              }`,
                            },
                          ],
                        },
                        {
                          width: "*",
                          text: [
                            "Σας παρακαλώ να προβείτε σε\nκαταχώρηση του ονόματος του\nτέκνου μας, που γεννήθηκε στη\nΛάρισα στις:\n\n\nΜε αριθμ. Ληξ. Πράξης γεν:\n\n\n",
                            {
                              decoration: "underline",
                              text: "Με το όνομα:\n\n",
                            },
                            {
                              text: "____________________________________\n____________________________________\n____________________________________",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      decoration: "underline",
                      text: "\n\nΚατοικία\n\n",
                    },
                    {
                      style: "spreadLine",
                      text: [
                        `Πόλη: `,
                        {
                          color: "#00f",
                          text: `${
                            values?.residency?.city
                              ? values?.residency?.city
                              : "_______________________________________________"
                          }`,
                        },
                        `\nΔιεύθυνση: `,
                        {
                          color: "#00f",
                          text: `${
                            values?.residency?.address
                              ? values?.residency?.address
                              : "__________________________________________\n______________________________________________________"
                          }`,
                        },
                        `\nΤηλέφωνο: `,
                        {
                          color: "#00f",
                          text: `${
                            values?.residency?.phone
                              ? values?.residency?.phone
                              : "___________________________________________"
                          }`,
                        },
                        `\n\n\n\n\n`,
                      ],
                    },
                    {
                      columns: [
                        {},
                        {},
                        {
                          text: [
                            {
                              style: "subheader",
                              alignment: "center",
                              text: "Οι αιτούντες\n\n\n",
                            },
                            "Ο πατέρας\n\n\n\n\nΗ μητέρα",
                          ],
                        },
                      ],
                    },
                  ],
                  styles: {
                    header: {
                      fontSize: 18,
                      bold: true,
                    },
                    subheader: {
                      fontSize: 15,
                      bold: true,
                    },
                    bigger: {
                      fontSize: 15,
                      italics: true,
                    },
                    spreadLine: {
                      lineHeight: 1.5,
                    },
                  },
                  defaultStyle: {
                    columnGap: 20,
                  },
                })
                .open();
            }}
          >
            Export as PDF
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteForm(true)}
          >
            Delete Form
          </Button>
        </ButtonGroup>
      </Box>
      <form>
        <Box sx={{ justifyContent: "flex-start" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent style={{ textAlign: "-webkit-center" }}>
                  {visibleForm(activeStep)}
                  {activeStep === 2 && (
                    <Alert color="warning" sx={{ m: 2, maxWidth: 400 }}>
                      <AlertTitle>
                        Are you sure you want to updated it?
                      </AlertTitle>
                      This is a form created by a refugee.
                    </Alert>
                  )}
                  <Box sx={{ display: "flex", maxWidth: "500px", p: 1, mt: 2 }}>
                    <Button
                      color="secondary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="contained"
                      startIcon={<ArrowBackIosNewIcon />}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 0 auto" }} />
                    {activeStep !== 2 ? (
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit((data) => onSubmit(data, true))}
                        variant="contained"
                      >
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

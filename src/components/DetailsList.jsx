import { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import refreshToken from '../api/post/refreshToken';
import getForms from '../api/get/getForms';
import getRefugees from '../api/get/getRefugees';
import { CSVLink } from 'react-csv';

import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import createForm from '../api/post/createForm';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import deleteForm from '../api/delete/deleteForm';
import updateForm from '../api/put/updateForm';

const DetailsList = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [forms, setForms] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [refugees, setRefugees] = useState([]);
  const [refugeeId, setRefugeeId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [tab, setTab] = useState('all');

  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);
  const csvLink = useRef();

  const columns = [
    {
      id: "stage",
      label: lang === 'gr' ? 'Στάδιο' : lang === 'fr' ? 'Organiser' : 'Stage',
      minWidth: 170,
    },
    // { id: "childFullName", label: "Όνομα Παιδίου", minWidth: 170 },
    { id: 'fatherFullName', label: lang === 'gr' ? 'Όνομα Πατέρα' : lang === 'fr' ? 'Nom du père' : 'Father Name', minWidth: 100 },
    { id: 'motherFullName', label: lang === 'gr' ? 'Όνομα Μητέρας' : lang === 'fr' ? 'Nom de la mère' : 'Mother Name' },
    { id: 'phone', label: lang === 'gr' ? 'Τηλεφωνο' : lang === 'fr' ? 'Numéro de téléphone' : 'Phone', minWidth: 100 },
    { id: 'options', label: lang === 'gr' ? 'Αλλο' : lang === 'fr' ? 'Autre' : 'Other', minWidth: 100 },
  ];

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handlePopup = (bool) => {
    setOpenPopup(bool);
  };

  const handleModal = (bool) => {
    setOpenModal(bool);
  };

  const loadForms = async (retry) => {
    try {
      const response = await getForms(props.type);
      setForms(response);

      setRows(
        response
          .sort((a, b) => b?.updatedAt?.localeCompare(a?.updatedAt))
          .map((form) => {
            return {
              id: form.id,
              stage: form.stage,
              // status: "Test",
              // childFullName: `${form.child.firstName || ""} ${
              //   form.child.lastname || ""
              // }`,
              fatherFullName: `${form.father.firstName || ''} ${form.father.lastName || ''}`,
              motherFullName: `${form.mother.firstName || ''} ${form.mother.lastName || ''}`,
              phone: form.residency?.phone,
            };
          })
      );
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadForms(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const loadRefugees = async (retry) => {
    try {
      const response = await getRefugees();
      setRefugees(response);
      setRefugeeId(response[0]?.id);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadRefugees(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleDeleteForm = async (retry, formId) => {
    try {
      await deleteForm(formId);
      handleModal(false);
      window.location.replace(
        user?.role === 'refugee'
          ? '/preperation'
          : forms?.find((f) => f?.id === formId)?.createdBy === 'refugee'
          ? '/preparedForms'
          : '/'
      );
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await handleDeleteForm(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleStageDeleteForm = async (retry, formId) => {
    try {
      const data = rows?.find(row => row?.id === openModal)
      await updateForm({...data, stage: 'deleted'});
      handleModal(false);
      window.location.replace(
        user?.role === 'refugee'
          ? '/preperation'
          : forms?.find((f) => f?.id === formId)?.createdBy === 'refugee'
          ? '/preparedForms'
          : '/'
      );
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await handleStageDeleteForm(false, formId);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const csvHeaders = [
    'ΟΝΟΜΑ ΠΑΤΕΡΑ',
    'ΕΠΙΘΕΤΟ ΠΑΤΕΡΑ',
    'ΑΔΤ ΠΑΤΕΡΑ',
    'ΟΝΟΜΑ ΜΗΤΕΡΑΣ',
    'ΕΠΙΘΕΤΟ ΜΗΤΕΡΑΣ',
    'ΑΔΤ ΜΗΤΕΡΑΣ',
    'ΠΟΛΗ ΚΑΤΟΙΚΙΑΣ',
    'ΔΙΕΥΘΥΝΣΗ ΚΑΤΟΙΚΙΑΣ',
    'ΤΗΛΕΦΩΝΟ',
  ];
  const csvRows =
    forms.length !== 0
      ? forms.map((p) => [
          p.father.firstName,
          p.father.lastName,
          p.father.ssn,
          p.mother.firstName,
          p.mother.lastName,
          p.mother.ssn,
          p.residency.city,
          p.residency.address,
          p.residency.phone,
        ])
      : 'ΔΕΝ ΥΠΑΡΧΟΥΝ ΣΤΟΙΧΕΙΑ';

  const clickCsv = () => {
    csvLink.current.link.click();
  };

  const addForm = async (retry) => {
    try {
      const response = await createForm(refugeeId);
      handlePopup(false);
      window.location.replace(`/forms/${response.id}`);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await createForm(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!user) window.location.href = '/login';
  }, [user]);

  useEffect(() => loadForms(true), [props.type]);

  useEffect(() => props.type === 'municipalityForms' && loadRefugees(true), [props.type]);

  return (
    <Container>
      {props.type === 'preparedForms' ? (
        <Typography component="h5" variant="h5" sx={{ mb: 4 }}>
          {user?.role === 'municipality' || lang === 'gr' ? 'Φορμες Προσφυγων' : lang === 'fr' ? 'Formulaires de réfugiés' : 'Refugee Forms'}
        </Typography>
      ) : (
        props.type === 'municipalityForms' && (
          <Typography component="h5" variant="h5" sx={{ mb: 4 }}>
            {user?.role === 'municipality' || lang === 'gr' ? 'Φορμες Ληξιαρχειου' : lang === 'fr' ? 'Formulaires municipaux' : 'Municipality Forms'}
          </Typography>
        )
      )}
      {props.type !== 'validateForms' && props.type !== 'preparedForms' && (
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
          {user?.role === 'municipality' && (
            <div>
              <Button variant="outlined" onClick={() => clickCsv()} sx={{mx: 3}}>
                {lang === 'gr' ? 'Ληψη Backup' : lang === 'fr' ? 'Télécharger la sauvegarde' : 'Download Backup'}
              </Button>
              <CSVLink
                ref={csvLink}
                data={csvRows}
                headers={csvHeaders}
                className="hidden"
                separator={';'}
                filename={'backup_data.csv'}
              />
            </div>
          )}
          <Button
            variant="contained"
            disabled={rows.filter(row => row.stage !== 'deleted').length >= 2 && user?.role === 'refugee'}
            onClick={() =>
              // props.type === "municipalityForms"
              //   ? setOpenPopup(true)
              //   :
              addForm(true)
            }
          >
            {rows.filter(row => row.stage !== 'deleted').length >= 2 && user?.role === 'refugee'
              ? lang === 'gr'
                ? 'Μεγιστος αριθμος φορμων: 2' 
                : lang === 'fr'
                ? 'Nombre maximum de formulaires autorisés : 2'
                : 'Max forms allowed: 2'
              : user?.role === 'municipality' || lang === 'gr'
              ? 'Νεα Φορμα'
              : lang === 'fr'
              ? 'Ajouter un formulaire'
              : 'Add Form'}
          </Button>
        </Grid>
      )}
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary tabs example"
      >
        <Tab value="all" label={lang === 'gr' ? 'Όλες' : lang === 'fr' ? 'Toute' : 'All'} />
        <Tab value="edit" label={props.type === 'preperation' || props.type === 'preparedForms' 
          ? lang === 'gr' ? 'Σε Σύνταξη' : lang === 'fr' ? 'Temporairement enregistré' : 'Temporarily Saved'
          : lang === 'gr' ? 'Σε Επεξεργασία' : lang === 'fr' ? 'Temporairement enregistré' : 'Temporarily Saved'
        } />
        <Tab value="done" label={props.type === 'preperation' || props.type === 'preparedForms' 
          ? lang === 'gr' ? 'Υποβληθείσες' : lang === 'fr' ? 'Soumise' : 'Submitted'
          : lang === 'gr' ? 'Ολοκληρωμένες' : lang === 'fr' ? 'Soumise' : 'Submitted'
        } />
        <Tab value="deleted" label={lang === 'gr' ? 'Διεγραμένες' : lang === 'fr' ? 'Supprimé' : 'Deleted'} />
      </Tabs>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ height: 20 }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      fontWeight: 'bold',
                      minWidth: column.minWidth,
                      height: 'auto !important',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => tab === 'all' || row.stage === tab).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    // onClick={() =>
                    //   window.location.replace(`/forms/${row.id}`)
                    // }
                  >
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="no-select"
                          onClick={() => i !== 3 && window.location.replace(`/forms/${row.id}`)}
                          sx={{ cursor: i !== 3 ? 'pointer' : 'default' }}
                        >
                          {column.id === 'stage' ? (
                            <Chip 
                              label={
                                props.type === 'preperation' || props.type === 'preparedForms'
                                ? row.stage === 'edit' 
                                  ? lang === 'gr' 
                                    ? 'Σε Σύνταξη' 
                                    : lang === 'fr'
                                    ? 'Temporairement enregistré'
                                    : 'Temporarily Saved' 
                                : row.stage === 'done' 
                                  ? lang === 'gr' 
                                    ? 'Υποβληθείσα' 
                                    : lang === 'fr'
                                    ? 'Soumise'
                                    : 'Submitted' 
                                : row.stage === 'deleted' 
                                  ? lang === 'gr' 
                                    ? 'Διεγραμένες' 
                                    : lang === 'fr'
                                    ? 'Supprimé'
                                    : 'Deleted' 
                                : lang === 'gr' ? 'Άγνωστο' : lang === 'fr' ? 'Inconnue' :  'Unknown'
                              : row.stage === 'edit' 
                                  ? lang === 'gr' 
                                    ? 'Σε Επεξεργάσια' 
                                    : lang === 'fr'
                                    ? 'Temporairement enregistré'
                                    : 'Temporarily Saved' 
                                : row.stage === 'done' 
                                  ? lang === 'gr' 
                                    ? 'Ολοκληρωμένες' 
                                    : lang === 'fr'
                                    ? 'Soumise'
                                    : 'Submitted' 
                                : row.stage === 'deleted' 
                                  ? lang === 'gr' 
                                    ? 'Διεγραμένες' 
                                    : lang === 'fr'
                                    ? 'Supprimé'
                                    : 'Deleted' 
                                : lang === 'gr' ? 'Άγνωστο' : lang === 'fr' ? 'Inconnue' : 'Unknown'} 
                              color={
                                row.stage === 'edit' ? 'warning' 
                                : row.stage === 'done' ? 'success' 
                                : row.stage === 'deleted' ? 'error' 
                                : 'default'} 
                              variant="outlined" />
                          ) : i === 3 ? (
                            <ButtonGroup>
                              <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                disabled={row.stage !== 'edit'}
                                onClick={() => window.location.replace(`/forms/${row.id}`)}
                              >
                                {lang === 'gr' ? 'Επεξεργασια' : lang === 'fr' ? 'Éditer' : 'Edit'}
                              </Button>
                              <Button
                                variant="outlined"
                                color="info"
                                size="small"
                                onClick={() => {
                                  const values = forms.find((form) => form.id === row.id);

                                  pdfMake
                                    .createPdf({
                                      content: [
                                        {
                                          columns: [
                                            {
                                              width: 350,
                                              text: 'ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ\n\n\n\n',
                                              style: 'header',
                                            },
                                            {
                                              text: [
                                                {
                                                  style: 'spreadLine',
                                                  text: 'Λάρισα............................\nΑριθ.Πρωτ......................\n',
                                                },
                                                'Προς το Ληξιαρχείο ΔΕ Λαρισαίων\n\n\n\n',
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          columns: [
                                            {
                                              width: 300,
                                              style: 'spreadLine',
                                              text: [
                                                `Επώνυμο πατέρα: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.father?.lastName
                                                      ? values?.father?.lastName
                                                      : '____________________________________'
                                                  }`,
                                                },
                                                `\nΌνομα πατέρα: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.father?.firstName
                                                      ? values?.father?.firstName
                                                      : '_______________________________________'
                                                  }`,
                                                },
                                                `\nΑ.Δ.Τ.: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.father?.ssn
                                                      ? values?.father?.ssn
                                                      : '________________________________________________'
                                                  }`,
                                                },
                                                `\n\nΕπώνυμο μητέρας: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.mother?.lastName
                                                      ? values?.mother?.lastName
                                                      : '___________________________________'
                                                  }`,
                                                },
                                                `\nΌνομα μητέρας: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.mother?.firstName
                                                      ? values?.mother?.firstName
                                                      : '______________________________________'
                                                  }`,
                                                },
                                                `\nΑ.Δ.Τ.: `,
                                                {
                                                  color: '#00f',
                                                  text: `${
                                                    values?.mother?.ssn
                                                      ? values?.mother?.ssn
                                                      : '________________________________________________'
                                                  }`,
                                                },
                                              ],
                                            },
                                            {
                                              width: '*',
                                              text: [
                                                'Σας παρακαλώ να προβείτε σε\nκαταχώρηση του ονόματος του\nτέκνου μας, που γεννήθηκε στη\nΛάρισα στις:\n\n\nΜε αριθμ. Ληξ. Πράξης γεν:\n\n\n',
                                                {
                                                  decoration: 'underline',
                                                  text: 'Με το όνομα:\n\n',
                                                },
                                                {
                                                  text: '____________________________________\n____________________________________\n____________________________________',
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          decoration: 'underline',
                                          text: '\n\nΚατοικία\n\n',
                                        },
                                        {
                                          style: 'spreadLine',
                                          text: [
                                            `Πόλη: `,
                                            {
                                              color: '#00f',
                                              text: `${
                                                values?.residency?.city
                                                  ? values?.residency?.city
                                                  : '_______________________________________________'
                                              }`,
                                            },
                                            `\nΔιεύθυνση: `,
                                            {
                                              color: '#00f',
                                              text: `${
                                                values?.residency?.address
                                                  ? values?.residency?.address
                                                  : '__________________________________________\n______________________________________________________'
                                              }`,
                                            },
                                            `\nΤηλέφωνο: `,
                                            {
                                              color: '#00f',
                                              text: `${
                                                values?.residency?.phone
                                                  ? values?.residency?.phone
                                                  : '___________________________________________'
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
                                                  style: 'subheader',
                                                  alignment: 'center',
                                                  text: 'Οι αιτούντες\n\n\n',
                                                },
                                                'Ο πατέρας\n\n\n\n\nΗ μητέρα',
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
                                PDF
                              </Button>
                              <Button variant="outlined" color="error" size="small" disabled={row.stage === 'deleted'} onClick={() => setOpenModal(row.id)}>
                                {lang === 'gr' ? 'Διαγραφη' : lang === 'fr' ? 'Effacer' : 'Delete'}
                              </Button>
                            </ButtonGroup>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}–${to} ${lang === 'gr' ? 'απο' : lang === 'fr' ? 'de' : 'from'} ${
              count !== -1 ? count : `${lang === 'gr' ? 'περισσοτερο απο' : lang === 'fr' ? 'plus que' : 'more than'} ${to}`
            }`;
          }}
          labelRowsPerPage={user?.role === 'municipality' || lang === 'gr' ? 'Φορμες ανα σελιδα:' : lang === 'fr' ? 'Lignes par page :' : 'Rows per page:'}
        />
      </Paper>
      <Dialog
        open={openModal}
        onClose={() => handleModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {rows?.find(row => row?.id === openModal)?.stage === 'edit' ?
          <>
            <DialogTitle id="alert-dialog-title">
              {user?.role === 'municipality' || lang === 'gr'
                ? 'Θελετε σιγουρα να διαγραψετε οριστικά αυτην την φορμα;'
                : lang === 'fr' 
                ? 'Êtes-vous sûr de vouloir supprimer définitivement ce formulaire ?'
                : 'Are you sure you want to permanently delete this form?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {user?.role === 'municipality' || lang === 'gr'
                  ? 'Αυτη η επιλογη δεν μπορει να αναιρεθει αργοτερα'
                  : lang === 'fr' 
                  ? 'Cette action ne peut pas être annulée'
                  : 'This action cannot be undone'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="success" onClick={() => handleModal(false)}>
                {user?.role === 'municipality' || lang === 'gr' ? 'Ακυρωση' : lang === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteForm(true, openModal)} autoFocus>
                {user?.role === 'municipality' || lang === 'gr' ? 'Οριστική Διαγραφη' : lang === 'fr' ? 'Effacé définitivement' : 'Permanently Delete'}
              </Button>
            </DialogActions>
          </> : 
          <>
            <DialogTitle id="alert-dialog-title">
              {user?.role === 'municipality' || lang === 'gr'
                ? 'Θελετε σιγουρα να μετακινησετε αυτην την φορμα στις διεγραμμένες;'
                : lang === 'fr' 
                ? 'Voulez-vous vraiment déplacer ce formulaire vers l\'étape de suppression ?'
                : 'Are you sure you want to move this form to deleted stage?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {user?.role === 'municipality' || lang === 'gr'
                  ? 'Αυτη η επιλογη δεν μπορει να αναιρεθει αργοτερα'
                  : lang === 'fr' 
                  ? 'Cette action ne peut pas être annulée'
                  : 'This action cannot be undone'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="success" onClick={() => handleModal(false)}>
                {user?.role === 'municipality' || lang === 'gr' ? 'Ακυρωση' : lang === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleStageDeleteForm(true, openModal)} autoFocus>
                {user?.role === 'municipality' || lang === 'gr' ? 'Διαγραφη' : lang === 'fr' ? 'Effacer' : 'Delete'}
              </Button>
            </DialogActions>
          </>
        }
      </Dialog>
      {/* <Dialog open={openPopup} onClose={() => handlePopup(false)}>
        <DialogTitle>Επελεξτε κηδεμονα</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ο κηδεμονας πρεπει να διατηρει λογαρισμο στην εφαρμογη, ωστε να εχε
            την δυνατοτηα να επιβεβαιωσει τα στοιχεια για την λειξιαρχικη πραξη
            γεννησης
          </DialogContentText>
          {refugees.length > 0 ? (
            <TextField
              id="outlined-select-currency-native"
              select
              fullWidth
              label="Κηδεμονας"
              value={refugeeId}
              onChange={(event) => setRefugeeId(event.target.value)}
              SelectProps={{
                native: true,
              }}
              sx={{ my: 2 }}
            >
              {refugees.map((option) => (
                <option key={option.id} value={option.id}>
                  {`${option.firstName || ""} ${option.lastName || ""}`}
                </option>
              ))}
            </TextField>
          ) : (
            <Alert variant="error">No refugees found</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handlePopup(false)}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => addForm(true)}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
};

export default DetailsList;

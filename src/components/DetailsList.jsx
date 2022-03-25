import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import refreshToken from "../api/post/refreshToken";
import getForms from "../api/get/getForms";
import getRefugees from "../api/get/getRefugees";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import createForm from "../api/post/createForm";

const columns = [
  {
    id: "status",
    label: "Κατάσταση",
    minWidth: 170,
  },
  { id: "childFullName", label: "Όνομα Παιδίου", minWidth: 170 },
  { id: "fatherFullName", label: "Όνομα Πατέρα", minWidth: 100 },
  {
    id: "motherFullName",
    label: "Όνομα Μητέρας",
    minWidth: 170,
  },
  {
    id: "birthday",
    label: "Ημερομηνία Γέννησης",
    minWidth: 170,
    format: (value) => value.toLocaleString("el-GR"),
  },
];

const DetailsList = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [refugees, setRefugees] = useState([]);
  const [refugeeId, setRefugeeId] = useState("");

  const handlePopup = (bool) => {
    setOpenPopup(bool);
  };

  const loadForms = async (retry) => {
    try {
      const response = await getForms(props.type);
      setRows(
        response.map((form) => {
          return {
            id: form.id,
            status: "Test",
            childFullName: `${form.child.firstName || ""} ${
              form.child.lastname || ""
            }`,
            fatherFullName: `${form.father.firstName || ""} ${
              form.father.lastname || ""
            }`,
            motherFullName: `${form.mother.firstName || ""} ${
              form.mother.lastname || ""
            }`,
            birthday: Date(form.child.birthday).slice(0, 15) || "",
          };
        })
      );
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadForms(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
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
          alert(error);
        }
      } else {
        alert(error);
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

  const addForm = async (retry) => {
    try {
      const response = await createForm(refugeeId);
      handlePopup(false);
      window.location.replace(`/forms/${response.id}`);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadForms(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  useEffect(() => loadForms(true), [props.type]);

  useEffect(
    () => props.type === "municipalityForms" && loadRefugees(true),
    [props.type]
  );

  return (
    <Container>
      {props.type !== "validateForms" && (
        <Grid sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
          <Button
            variant="contained"
            onClick={() =>
              props.type === "municipalityForms"
                ? setOpenPopup(true)
                : addForm(true)
            }
          >
            Add Form
          </Button>
        </Grid>
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ height: 20 }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      height: "auto !important",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="no-select"
                            onClick={() =>
                              window.location.replace(`/forms/${row.id}`)
                            }
                          >
                            {column.id === "status" ? (
                              <Chip
                                label={value}
                                color={
                                  row.status === "Test" ? "warning" : "default"
                                }
                                variant="outlined"
                              />
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
        />
      </Paper>
      <Dialog open={openPopup} onClose={() => handlePopup(false)}>
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
              value={refugees[0].id}
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
      </Dialog>
    </Container>
  );
};

export default DetailsList;

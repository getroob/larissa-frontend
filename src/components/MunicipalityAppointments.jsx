import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment";
import "moment/locale/el";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import getAppointments from "../api/get/getAppointments";
import refreshToken from "../api/get/getAppointments";

const MunicipalityAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async (retry) => {
    try {
      const response = await getAppointments();
      setAppointments(response);
    } catch (error) {
      if (retry) {
        try {
          await refreshToken();
          await loadAppointments(false);
        } catch (error) {
          alert(error);
        }
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => loadAppointments(), []);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <Container component="main" maxWidth="md">
      {
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {appointments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ονοματεπώνυμο Παιδιού</TableCell>
                    <TableCell align="center">Ραντεβού</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${row.user.firstName} ${row.user.lastName}`}
                      </TableCell>
                      <TableCell align="center">
                        {row.datetime
                          ? moment(row.appointment).locale("el").format("lll")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert color="warning">No appointments found</Alert>
          )}
        </Grid>
      }
    </Container>
  );
};

export default MunicipalityAppointments;

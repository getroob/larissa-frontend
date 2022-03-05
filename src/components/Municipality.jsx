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
} from "@mui/material";
import { useSelector } from "react-redux";

const Municipality = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const onLoad = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/municipality/", {
        method: "GET",
      });
      if (!response.ok) {
        alert("Failed to fetch");
      } else {
        const municipality = await response.json();
        setUsers(
          municipality.map((d) => ({
            id: d.id,
            fullNameChild: `${d.firstName || ""} ${d.lastName || ""}`,
            fullNameFather: `${(d.father && d.father.firstName) || ""} ${
              (d.father && d.father.lastName) || ""
            }`,
            residency: (d.father && d.father.municipalityRegistered) || "",
            appointment: d.appointment || "",
          }))
        );
        console.log(municipality, users);
        return users;
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => onLoad(), []);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <Container component="main" maxWidth="md">
      {users && (
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ονοματεπώνυμο Παιδιού</TableCell>
                  <TableCell align="center">Ονοματεπώνυμο Πατρός</TableCell>
                  <TableCell align="center">Τόπος Κατοικίας</TableCell>
                  <TableCell align="center">Ραντεβού</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullNameChild}
                    </TableCell>
                    <TableCell align="center">{row.fullNameFather}</TableCell>
                    <TableCell align="center">{row.residency}</TableCell>
                    <TableCell align="center">
                      {row.appointment
                        ? moment(row.appointment).locale("el").format("lll")
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Container>
  );
};

export default Municipality;

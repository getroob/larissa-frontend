import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import LanguageHelper from '../tools/LanguageHelper';

const columns = [
  {
    id: 'status',
    label: 'Κατάσταση',
    minWidth: 170,
  },
  { id: 'childFullName', label: 'Όνομα Παιδίου', minWidth: 170 },
  { id: 'fatherFullName', label: 'Όνομα Πατέρα', minWidth: 100 },
  {
    id: 'motherFullName',
    label: 'Όνομα Μητέρας',
    minWidth: 170,
  },
  {
    id: 'birthday',
    label: 'Ημερομηνία Γέννησης',
    minWidth: 170,
    format: (value) => value.toLocaleString('el-GR'),
  },
];

const rows = [
  {
    id: 1,
    status: 'Done',
    childFullName: 'Piou Pistoli',
    fatherFullName: 'Tsiou Pistoli',
    motherFullName: 'Miou Pistoli',
    birthday: JSON.stringify(new Date()),
  },
  {
    id: 2,
    status: 'Done',
    childFullName: 'Piou Pistoli',
    fatherFullName: 'Tsiou Pistoli',
    motherFullName: 'Miou Pistoli',
    birthday: JSON.stringify(new Date()),
  },
];

const DetailsList = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openDetails = (id) => {
    console.log(id);
  };

  return (
    <>
      <Box mb={2} sx={{ alignSelf: 'flex-end' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          ΝΕΟ ΑΤΟΜΟ
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ height: 20 }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, height: 'auto !important' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => openDetails(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className="no-select">
                          {column.id === 'status' ? <Chip label={value} color="success" variant="outlined" /> : value}
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
        <LanguageHelper />
      </Paper>
    </>
  );
};

export default DetailsList;

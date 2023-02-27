import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
function TableCustom({
  name,
  Header,
  Emp,
  Dept,
  page,
  rows,
  setRows,
  setPage,
  Action,
}) {
  const [search, setSearch] = useState('');
  const [Finalsearch, setFinalSearch] = useState('');
  let condition = new RegExp(Finalsearch);
  console.log(Dept);
  return (
    <div>
      <Paper sx={{ margin: '20px 0px' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell colSpan={6}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {name}
                    <TextField
                      id='input-with-icon-textfield'
                      label='Search'
                      placeholder='Search'
                      size='small'
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setFinalSearch(search.toLowerCase());
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setFinalSearch(search.toLowerCase())}
                          >
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment
                            position='start'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setFinalSearch('')}
                          >
                            <CloseIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                {Header.map((employee) => (
                  <TableCell
                    style={{ backgroundColor: '#dddddd' }}
                    key={employee.id}
                  >
                    {employee.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Emp &&
                Emp.length > 0 &&
                Emp?.filter(
                  (rep) =>
                    condition.test(rep.name?.toLowerCase()) ||
                    condition.test(rep.id?.toLowerCase()) ||
                    condition.test(rep.department?.toLowerCase()) ||
                    condition.test(rep.email?.toLowerCase())
                )
                  .slice(page * rows, page * rows + rows)
                  .map((employee, ind) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Action ind={ind} />
                      </TableCell>
                    </TableRow>
                  ))}
              {Dept &&
                Dept?.length > 0 &&
                Dept?.filter(
                  (rep) =>
                    condition.test(rep.dept_id.toLowerCase()) ||
                    condition.test(rep.dept_name.toLowerCase())
                )
                  ?.slice(page * rows, page * rows + rows)
                  .map((employee, ind) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.dept_id}</TableCell>
                      <TableCell>{employee.dept_name}</TableCell>
                      <TableCell>
                        <Action ind={ind} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {(Emp?.length > 0 || Dept?.length > 0) && (
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component='div'
              count={
                Emp?.length > 0
                  ? Emp?.length
                  : Dept?.length > 0
                  ? Dept?.length
                  : 0
              }
              rowsPerPage={rows}
              page={page}
              onPageChange={(e, nextPage) => setPage(nextPage)}
              onRowsPerPageChange={(e) => {
                console.log(e.target.value);
                setRows(parseInt(e.target.value, 10));
              }}
            />
          )}
        </TableContainer>
      </Paper>
    </div>
  );
}

export default TableCustom;

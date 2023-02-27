import { Button, Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import DeptModal from '../../component/dashBoard/DeptModal';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  DeptHeader,
  EmpHeader,
  getAllDept,
  getAllEmployees,
  DeleteModal,
} from '../../utils';
import EmployeeModal from './EmployeeModal';
import Table from './Table';
import EditIcon from '@mui/icons-material/Edit';
import Viewtabel from './Viewtabel';

function DashBoard() {
  const [View, setView] = useState(false);

  const [type, settype] = useState('Department');
  const [EmpForm, setEmpForm] = useState(false);
  const [EmpEdit, setEmpEdit] = useState(false);
  const [objectIndex, setobjectIndex] = useState('');
  const [DeptForm, setDeptForm] = useState(false);
  const [DeptEdit, setDeptEdit] = useState(false);
  const [DeleteConf, setDeleteConf] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(3);
  const [isEmployee, setIsEmployee] = useState(false);

  const handleChange = (event) => {
    setPage(0);
    setRows(3);
    settype(event.target.value);
  };

  const RenderSelect = () => (
    <FormControl sx={{ width: '30%' }}>
      <InputLabel id='demo-simple-select-label'>Type</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={type}
        label='Type'
        onChange={handleChange}
      >
        <MenuItem value={'Department'}>Department</MenuItem>
        <MenuItem value={'Employee'}>Employee</MenuItem>
      </Select>
    </FormControl>
  );
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Rendertable = () => {
    switch (type) {
      case 'Department':
        return (
          <>
            <Button variant='contained' onClick={setDeptForm}>
              Add Department
            </Button>
            <Table
              name={'Department List'}
              Header={DeptHeader}
              Dept={getAllDept}
              page={page}
              rows={rows}
              setRows={setRows}
              setPage={setPage}
              Action={({ ind }) => (
                <>
                  <IconButton
                    onClick={() => {
                      setView((prev) => !prev);
                      setobjectIndex(ind);
                      setIsEmployee(false);
                    }}
                  >
                    <RemoveRedEyeIcon style={{ color: '#1976d2' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeptEdit((prev) => !prev);
                      setobjectIndex(ind);
                    }}
                  >
                    <EditIcon style={{ color: '#ed6c02' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteConf(true);
                      setobjectIndex(ind);
                      setIsEmployee(false);
                    }}
                  >
                    <DeleteIcon style={{ color: '#d32f2f' }} />
                  </IconButton>
                </>
              )}
            />
          </>
        );
      case 'Employee':
        return (
          <>
            {' '}
            <Button variant='contained' onClick={setEmpForm}>
              Add Employee
            </Button>
            <Table
              name='Employee list'
              Header={EmpHeader}
              Emp={getAllEmployees}
              page={page}
              rows={rows}
              setRows={setRows}
              setPage={setPage}
              Action={({ ind }) => (
                <>
                  <IconButton
                    onClick={() => {
                      setView((prev) => !prev);
                      setobjectIndex(ind);
                      setIsEmployee(true);
                    }}
                  >
                    <RemoveRedEyeIcon style={{ color: '#1976d2' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEmpEdit((prev) => !prev);
                      setobjectIndex(ind);
                    }}
                  >
                    <EditIcon style={{ color: '#ed6c02' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteConf(true);
                      setIsEmployee(true);
                      setobjectIndex(ind);
                    }}
                  >
                    <DeleteIcon style={{ color: '#d32f2f' }} />
                  </IconButton>
                </>
              )}
            />
          </>
        );
      default:
        return 'foo';
    }
  };
  function handleDelete(feedback) {
    if (feedback) {
      let allData = isEmployee ? getAllEmployees : getAllDept;
      allData.splice(objectIndex, 1);
      localStorage.setItem(
        isEmployee ? 'getAllEmployees' : 'getAllDept',
        JSON.stringify(allData)
      );
    }
    setDeleteConf(false);
    setIsEmployee(false);
  }
  return (
    <Box component='div' sx={{ margin: '30px 0' }}>
      {View && (
        <Viewtabel
          onClose={() => {
            setView(false);
          }}
          isEmployee={isEmployee}
          dataKey={objectIndex}
        />
      )}
      {(EmpForm || EmpEdit) && (
        <EmployeeModal
          onClose={() => {
            setEmpForm(false);
            EmpEdit && setEmpEdit(false);
          }}
          isEdit={EmpEdit}
          dataKey={objectIndex}
        />
      )}
      {(DeptForm || DeptEdit) && (
        <DeptModal
          onClose={() => {
            setDeptForm(false);
            DeptEdit && setDeptEdit(false);
          }}
          isEdit={DeptEdit}
          dataKey={objectIndex}
        />
      )}
      {DeleteConf && (
        <DeleteModal
          handleDelete={handleDelete}
          onClose={() => setDeleteConf(false)}
          isEmployee={isEmployee}
          dataKey={objectIndex}
        />
      )}
      <Grid container p={4}>
        <Grid item xs={12}>
          <RenderSelect />
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Rendertable />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard;

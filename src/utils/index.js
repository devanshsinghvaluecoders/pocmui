import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PieChartIcon from '@mui/icons-material/PieChart';
import { DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React from 'react';
import Dashboard from '../component/dashBoard/DashBoard';
import DiffrenceChart from '../pages/DiffrenceChart';
import Logout from '../pages/Logout';
export const connection = axios.create({
  baseURL: 'http://localhost:3000/',
});
export const drawerContent = [
  {
    drawerIcon: <DashboardIcon style={{ color: 'white' }} />,
    text: 'Dashboard',
    content: <Dashboard />,
  },

  {
    drawerIcon: <PieChartIcon style={{ color: 'white' }} />,
    text: 'Analytics',
    content: <DiffrenceChart />,
  },

  {
    drawerIcon: <LogoutIcon style={{ color: 'white' }} />,
    text: 'Logout',
    content: <Logout />,
  },
];

export const getAllEmployees = JSON.parse(
  localStorage.getItem('getAllEmployees')
    ? localStorage.getItem('getAllEmployees')
    : JSON.stringify([])
);

export const getAllDept = JSON.parse(
  localStorage.getItem('getAllDept')
    ? localStorage.getItem('getAllDept')
    : JSON.stringify([])
);

export const EmpHeader = [
  {
    id: 'id',
    label: 'Employee Id',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'gender',
    label: 'gender',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'department',
    label: 'Department',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export const DeptHeader = [
  {
    id: 'dept_id',
    label: 'Department Id',
  },
  {
    id: 'dept_name',
    label: 'Department Name',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export const gender = [
  {
    id: 'male',
    label: 'Male',
  },
  {
    id: 'female',
    label: 'Female',
  },
  {
    id: 'others',
    label: 'Others',
  },
];
export const EditModal = ({ onClose, handleDelete, isEmployee, dataKey }) => {
  return (
    <>
      <Modal open={true} onClose={onClose} closeAfterTransition>
        <Fade in={true}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid rgba(0,0,0,0.8)',
              borderRadius: '20px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Would you like to Edit?
              {onClose ? (
                <IconButton
                  aria-label='close'
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'red',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
            <Button
              style={{ margin: '0px 5px' }}
              color='error'
              variant='outlined'
              onClick={() => handleDelete(true)}
            >
              Yes
            </Button>
            <Button
              style={{ margin: '0px 5px' }}
              color='primary'
              variant='outlined'
              onClick={() => handleDelete(false)}
            >
              No
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export const DeleteModal = ({ onClose, handleDelete, isEmployee, dataKey }) => {
  return (
    <>
      <Modal open={true} closeAfterTransition>
        <Fade in={true}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid rgba(0,0,0,0.8)',
              borderRadius: '20px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Would you like to delete?
              {onClose ? (
                <IconButton
                  aria-label='close'
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'red',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>

            <Button
              style={{ margin: '0px 5px' }}
              color='error'
              variant='outlined'
              onClick={() => handleDelete(true)}
            >
              Yes
            </Button>
            <Button
              style={{ margin: '0px 5px' }}
              color='primary'
              variant='outlined'
              onClick={() => handleDelete(false)}
            >
              No
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

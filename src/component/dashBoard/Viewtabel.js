import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Field, Form, getFormValues, reduxForm } from 'redux-form';
import { renderSelectField, renderTextField } from '../reduxFormComponent';
import { connect, useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { gender, getAllDept, getAllEmployees } from '../../utils/index';
import { setFormDataReducer } from '../../redux/action';
import { DialogContent, IconButton } from '@mui/material';
// import { isEmail } from '../../constants/validations';
import CloseIcon from '@mui/icons-material/Close';
const TableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};
const value = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '0px 8px',
};
const background = {
  border: '3px solid white',
  textAlign: 'left',
  padding: '0px 8px',
  width: '30%',

  backgroundColor: '#dddddd',
};

const EmployeeForm = (props) => {
  const { onClose, dataKey, pristine, submitting, invalid, isEmployee } = props;
  const [data, setdata] = useState({});
  useEffect(() => {
    let Initdata = isEmployee ? getAllEmployees[dataKey] : getAllDept[dataKey];
    setdata(Initdata);
    console.log(Object.entries(Initdata));
  }, []);

  return (
    <>
      <Dialog onClose={onClose} open={true} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Employee detail
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
        <DialogContent dividers>
          <table style={TableStyle}>
            {Object.entries(data).map((rep, i) => (
              <tr key={i}>
                <td style={background}>
                  <h5
                    style={{
                      display: 'flex',
                    }}
                  >
                    {' '}
                    {rep[0]}
                  </h5>
                </td>
                <td style={value}>
                  <h5>{rep[1]}</h5>
                </td>
              </tr>
            ))}
          </table>
        </DialogContent>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => ({
  details: state.details,
  initialValues: state.details,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
  })(EmployeeForm)
);

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

const validate = (values) => {
  let errors = [];
  let requiredFields = ['id', 'name', 'email', 'department', 'gender'];

  if (
    !/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.,~#?&//=]*)$/i.test(
      values?.email
    )
  ) {
    errors['email'] = 'enter correct format';
  }
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
const EmployeeForm = (props) => {
  const { onClose, isEdit, dataKey, pristine, submitting, invalid } = props;
  const formValues = useSelector((state) => state.form);
  const [deptList, setDeptList] = useState([]);
  const [genderList, setGenderList] = useState([]);

  const dispatch = useDispatch();
  function handleAdd(e) {
    e.preventDefault();
    let employees = getAllEmployees;
    employees.push(formValues.employeeForm.values);
    localStorage.setItem('getAllEmployees', JSON.stringify(employees));
    onClose();
  }

  function handleEdit(e) {
    let editDetails = [...getAllEmployees];
    editDetails.forEach((element, ind) => {
      if (ind === dataKey) {
        Object.keys(formValues.employeeForm.values).forEach((key, value) => {
          element[key] = formValues.employeeForm.values[key];
        });
      }
    });
    localStorage.setItem('getAllEmployees', JSON.stringify(editDetails));
    onClose();
  }
  useEffect(() => {
    if (isEdit) {
      const employeeD = getAllEmployees?.find((res, ind) => ind == dataKey);
      dispatch(setFormDataReducer(employeeD));
    }
    setDeptList(getAllDept.map((res) => res.dept_name));
    setGenderList(gender.map((res) => res.label));
  }, []);
  return (
    <>
      <Dialog open={true} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Employee Detials
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
          <Form onSubmit={isEdit ? handleEdit : handleAdd}>
            <Field
              fullWidth={true}
              component={renderTextField}
              name='id'
              label='Id*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              fullWidth={true}
              component={renderTextField}
              name='name'
              label='Name*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              style={{ margin: '10px 0px' }}
              fullWidth={true}
              name='gender'
              component={renderSelectField}
              values={genderList || []}
              label='Gender*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              fullWidth={true}
              component={renderTextField}
              name='email'
              label='Email*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              style={{ margin: '10px 0px' }}
              fullWidth={true}
              name='department'
              component={renderSelectField}
              values={deptList || []}
              label='Department*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Button
              disabled={pristine || submitting || invalid}
              type='submit'
              variant='contained'
              fullWidth
            >
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          </Form>
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
    validate: validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
  })(EmployeeForm)
);

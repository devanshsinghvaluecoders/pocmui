import React, { useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField } from '../reduxFormComponent';
import { connect, useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { getAllDept } from '../../utils/index';
import { setFormDataReducer } from '../../redux/action';
import { DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const validate = (values) => {
  let errors = [];
  let requiredFields = ['dept_id', 'dept_name'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};
const DepartmentForm = (props) => {
  const { onClose, isEdit, dataKey, pristine, submitting, invalid } = props;
  const formValues = useSelector((state) => state.form);

  const dispatch = useDispatch();
  function handleAdd(e) {
    e.preventDefault();
    let departments = getAllDept;
    departments.push(formValues.departmentForm.values);
    localStorage.setItem('getAllDept', JSON.stringify(departments));
    onClose();
  }
  function handleEdit(e) {
    let editDetails = [...getAllDept];
    editDetails.forEach((element, ind) => {
      if (ind === dataKey) {
        Object.keys(formValues.departmentForm.values).forEach((key, value) => {
          element[key] = formValues.departmentForm.values[key];
        });
      }
    });
    localStorage.setItem('getAllDept', JSON.stringify(editDetails));
    onClose();
  }
  useEffect(() => {
    if (isEdit) {
      const employeeD = getAllDept?.find((res, ind) => ind == dataKey);
      dispatch(setFormDataReducer(employeeD));
    }
  }, []);
  return (
    <>
      <Dialog open={true} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Department Details
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
          {' '}
          <Form onSubmit={isEdit ? handleEdit : handleAdd}>
            <Field
              fullWidth={true}
              component={renderTextField}
              name='dept_id'
              label='Department Id*'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              fullWidth={true}
              component={renderTextField}
              name='dept_name'
              label='Department name*'
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
    form: 'departmentForm',
    validate: validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
  })(DepartmentForm)
);

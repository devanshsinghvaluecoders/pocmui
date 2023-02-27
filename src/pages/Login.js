import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Field, getFormValues, reduxForm } from 'redux-form';
import { renderTextField } from '../component/reduxFormComponent';
const validate = (values) => {
  let errors = [];
  let requiredFields = ['email', 'password'];
  if (
    !/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.,~#?&//=]*)$/i.test(
      values?.email
    )
  ) {
    errors['email'] = 'enter correct format';
  }
  const Passre =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~]{8,}$/;

  if (!Passre.test(String(values?.password))) {
    errors['password'] = 'enter correct format example->Test#1234';
  }

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};
const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
};
const cardStyle = {
  minWidth: 475,
};

const EmailForm = (props) => {
  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);
  const { emailForm, pristine, submitting, invalid } = props;

  const handleClickShowPassword = () => setshowPassword(!showPassword);
  const handleMouseDownPassword = () => setshowPassword(!showPassword);
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify(emailForm));
    navigate('/DashBoard');
  };

  useEffect(() => {
    // localStorage.setItem('adminDetails', JSON.stringify(adminDetails));
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      navigate('/DashBoard');
    } else {
      navigate('/');
    }
  }, []);
  return (
    <Box component='div' sx={boxStyle}>
      <Card sx={cardStyle}>
        <CardContent>
          <form onSubmit={handleLogin}>
            <Typography
              sx={{ textAlign: 'center' }}
              color='text.primary'
              variant='h5'
              gutterBottom
            >
              Hello Again
            </Typography>
            <Typography
              sx={{ textAlign: 'center' }}
              color='text.secondary'
              gutterBottom
            >
              welcome back you've been missed
            </Typography>
            <Field
              fullWidth={true}
              component={renderTextField}
              name='email'
              label='Email'
              InputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
            <Field
              fullWidth={true}
              component={renderTextField}
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              style={{ margin: '10px 0px' }}
              fullWidth
              variant='contained'
              size='medium'
              disabled={pristine || submitting || invalid}
              type='submit'
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  details: state.details,
  initialValues: state.details,
  emailForm: getFormValues('emailForm')(state),
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'emailForm',
    validate: validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
  })(EmailForm)
);

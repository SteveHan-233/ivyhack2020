import React from 'react';
import SigninFrom from '../components/SigninForm';
import { signup } from '../actions/authActions';

const Login = ({ navigation }) => {
  return (
    <SigninFrom
      title="Signup"
      linkText="Have an account? Sign in!"
      linkAction={() => {
        navigation.navigate('Login');
      }}
      submitAction={signup}
    />
  );
};

export default Login;

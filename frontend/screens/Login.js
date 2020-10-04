import React from 'react';
import SigninFrom from '../components/SigninForm';
import { signin } from '../actions/authActions';

const Login = ({ navigation }) => {
  return (
    <SigninFrom
      title="Login"
      linkText="Don't have an account? Sign up"
      linkAction={() => {
        navigation.navigate('Signup');
      }}
      submitAction={signin}
    />
  );
};

export default Login;

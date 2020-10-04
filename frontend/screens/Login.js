import React, { useEffect } from 'react';
import SigninFrom from '../components/SigninForm';
import { signin, tryLocalSignin } from '../actions/authActions';

const Login = ({ navigation }) => {
  useEffect(() => {
    tryLocalSignin();
  }, []);
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

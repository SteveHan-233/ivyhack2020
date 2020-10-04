import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container';

const SigninForm = ({ title, linkText, linkAction, submitAction }) => {
  const error = useSelector((state) => state.auth.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  return (
    <Container
      children={
        <>
          <Text h1 h1Style={{ fontWeight: '700' }}>
            {title}
          </Text>
          <View style={styles.main}>
            <Input
              label="Your Username"
              placeholder="username"
              leftIcon={<Ionicons name="ios-person" size={24} color="grey" />}
              autoCapitalize="none"
              containerStyle={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Input
              label="Your Password"
              placeholder="password"
              leftIcon={<Ionicons name="ios-lock" size={24} color="grey" />}
              secureTextEntry={true}
              autoCapitalize="none"
              containerStyle={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              title="Submit"
              onPress={() =>
                dispatch(submitAction({ email: username, password }))
              }
            />
          </View>
          <TouchableOpacity onPress={linkAction}>
            <Text style={styles.link}>{linkText}</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{error}</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  main: { marginTop: 30 },
  link: {
    color: '#72a4d4',
    textDecorationLine: 'underline',
    marginTop: 30,
    fontSize: 20,
    textAlign: 'left',
  },
  error: {
    color: 'red',
  },
});

export default SigninForm;

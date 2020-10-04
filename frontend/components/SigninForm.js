import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const SigninForm = ({ title, linkText, linkAction, submitAction }) => {
  const error = useSelector((state) => state.auth.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h1>{title}</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
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

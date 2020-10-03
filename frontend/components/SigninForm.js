import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const SigninForm = ({ title }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h1>{title}</Text>
        <View style={styles.main}>
          <Input
            label="Your Username"
            placeholder="username"
            leftIcon={<Ionicons name="ios-person" size={24} color="grey" />}
            containerStyle={styles.input}
          />
          <Input
            label="Your Password"
            placeholder="password"
            leftIcon={<Ionicons name="ios-lock" size={24} color="grey" />}
            secureTextEntry={true}
            containerStyle={styles.input}
          />
          <Button title="Submit" />
        </View>
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
});

export default SigninForm;

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const SigninForm = ({ children }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
});

export default SigninForm;

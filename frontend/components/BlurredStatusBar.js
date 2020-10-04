import React, { useRef } from 'react';
import { Animated, StatusBar, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

// Generate a scroll view with a blurred status bar on top that will fade
// in as the user scrolls. Pass in children via prop
export default ({ children }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {children}
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <BlurView tint="light" intensity={100} style={{ flex: 1 }}></BlurView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
});

import React from "react";
import { Animated, StyleSheet, ActivityIndicator } from "react-native";

export const AnimatedLoader = () => {
  return (
    <Animated.View
      style={[styles.container]}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

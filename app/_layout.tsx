import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createContext } from "react";

// Define a single, attractive theme
const appTheme = {
  background: "#f8f9fa",
  card: "#ffffff",
  text: "#2d3436",
  border: "#e0e0e0",
  accent: "#3498db",
  headerBackground: "#ffffff",
  secondaryText: "#636e72",
  success: "#00b894",
  warning: "#fdcb6e",
  error: "#d63031",
  shadowColor: "rgba(0,0,0,0.1)",
};

// Create a context to share theme across the app
export const ThemeContext = createContext(appTheme);

export default function RootLayout() {
  return (
    <ThemeContext.Provider value={appTheme}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="dark" />
        <View style={[styles.container, { backgroundColor: appTheme.background }]}>
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: appTheme.headerBackground,
              },
              headerTintColor: appTheme.text,
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "600",
              },
              contentStyle: {
                backgroundColor: appTheme.background,
              },
              animation: "slide_from_right",
              // Make sure content can scroll under the header
              headerTransparent: false,
            }}
          />
        </View>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

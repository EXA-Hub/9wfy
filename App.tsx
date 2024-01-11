import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import Navbar from "./app/navbar";

export default function App() {
  const deviceTheme = useColorScheme(); // Get the device theme (light or dark)
  const [theme, setTheme] = useState(deviceTheme); // Set the theme state

  const toggleTheme = (value: boolean) => {
    // Toggle between light and dark theme
    setTheme(value ? "dark" : "light");
  };

  return (
    <View
      style={theme === "dark" ? styles.darkContainer : styles.lightContainer}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Text
        style={theme === "dark" ? styles.darkThemeText : styles.lightThemeText}
      >
        صوفي الأسطورة 🥳
      </Text>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#242c40",
    alignItems: "center",
    justifyContent: "center",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
});

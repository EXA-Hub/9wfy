import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import { useColorScheme } from "react-native";
import Navbar from "./app/navbar";
import Body from "./app/body";
import * as SplashScreen from "expo-splash-screen";
import { getData, saveData } from "./app/functions/data";

const fetchFonts = () => {
  return Font.loadAsync({
    "custom-font": require("./assets/fonts/dg-bebo-b.ttf"), // replace 'CustomFont.ttf' with your font file
  });
};

export default function App() {
  const deviceTheme = useColorScheme(); // Get the device theme (light or dark)
  const [theme, setTheme] = useState(deviceTheme); // Set the theme state

  const toggleTheme = async (value: boolean) => {
    // Toggle between light and dark theme
    await saveData("theme", { theme: value ? "dark" : "light" });
    setTheme(value ? "dark" : "light");
  };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Load the resources
        await fetchFonts();
        // load the data
        const jsonData = await getData("theme");
        if (jsonData) setTheme(jsonData.theme);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={theme === "dark" ? styles.darkContainer : styles.lightContainer}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Body theme={theme} />
      <StatusBar style={theme === "dark" ? "light" : "dark"} hidden={true} />
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
function loadResources() {
  throw new Error("Function not implemented.");
}

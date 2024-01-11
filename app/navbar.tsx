import React from "react";
import { StyleSheet, Image, Text, View, Switch } from "react-native";

interface NavbarProps {
  theme: "dark" | "light" | null | undefined;
  toggleTheme: (value: boolean) => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <View
      style={
        theme === "dark"
          ? { ...styles.navbar, backgroundColor: "black" }
          : styles.navbar
      }
    >
      <Image source={require(".././assets/favicon.png")} />
      <Text
        style={theme === "dark" ? styles.darkThemeText : styles.lightThemeText}
      >
        صوفي الأسطورة 🥳 يس
      </Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    height: 60,
    width: "100%",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  lightThemeText: {
    fontFamily: "custom-font",
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
    fontFamily: "custom-font",
  },
});

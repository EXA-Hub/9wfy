import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

interface NavbarProps {
  theme: "dark" | "light" | null | undefined;
  toggleTheme: (value: boolean) => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <Text
        style={theme === "dark" ? styles.darkThemeText : styles.lightThemeText}
      >
        Navbar
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
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
});

import { Text, View, StyleSheet, Button } from "react-native";
import { notify } from "./functions/notify";
import React, { useState } from "react";
import { Audio } from "expo-av";

interface BodyProps {
  theme: "dark" | "light" | null | undefined;
}

export default function Body({ theme }: BodyProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [title, setTitle] = useState("الله ينور عليك");

  async function playSound() {
    setTitle("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./../assets/sounds/sfx1.mp3")
    );
    setSound(sound);

    setTitle("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          setTitle("Unloading Sound");
          sound.unloadAsync();
          setTitle("الله أكبر عليك");
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Text
        style={theme === "dark" ? styles.darkThemeText : styles.lightThemeText}
      >
        صوفي مرحبا
      </Text>
      <Button
        title={title}
        onPress={async () => {
          await notify();
          await playSound();
        }}
      />
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
    textAlign: "center",
    color: "#242c40",
  },
  darkThemeText: {
    textAlign: "center",
    color: "#d0d0c0",
  },
});

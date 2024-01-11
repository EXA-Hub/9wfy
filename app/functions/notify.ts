// notify.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { saveData, getData } from "./data";

async function registerForPushNotificationsAsync() {
  let token;

  // Try to get the token from the storage
  token = await getData("PUSH_TOKEN");

  if (token) {
    // If the token exists in the storage, return it
    return token;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;

    // Save the token in the storage
    await saveData("PUSH_TOKEN", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function notify() {
  await registerForPushNotificationsAsync();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false, // Set this to true
      shouldSetBadge: false,
    }),
  });

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "9wfy wants you!",
      },
      trigger: { seconds: 1, channelId: "defalut" },
    });
  }

  await schedulePushNotification();
}

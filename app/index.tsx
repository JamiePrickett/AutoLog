import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseFunctions";

export default function Index() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(root)/(tabs)/home");
      } else {
        router.replace("/(auth)/onboarding");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View className="flex-1 justify-center items-center gap-5">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

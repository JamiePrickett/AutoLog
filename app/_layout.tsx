import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { GlobalProvider } from "@/context/GlobalContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Geologica-Black": require("../assets/fonts/Geologica-Black.ttf"),
    "Geologica-Bold": require("../assets/fonts/Geologica-Bold.ttf"), //in use
    "Geologica-ExtraBold": require("../assets/fonts/Geologica-ExtraBold.ttf"),
    "Geologica-ExtraLight": require("../assets/fonts/Geologica-ExtraLight.ttf"),
    "Geologica-Light": require("../assets/fonts/Geologica-Light.ttf"),
    Geologica: require("../assets/fonts/Geologica-Regular.ttf"), //in use
    "Geologica-SemiBold": require("../assets/fonts/Geologica-SemiBold.ttf"), //in use
    "Geologica-Thin": require("../assets/fonts/Geologica-Thin.ttf"),
  });

  if (!loaded) {
    return <StatusBar style="dark" />;
  }

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(root)" />
      </Stack>
      <StatusBar style="light" />
    </GlobalProvider>
  );
}

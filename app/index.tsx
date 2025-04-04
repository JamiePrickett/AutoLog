import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-5">
      <Text>Links:</Text>
      <Link href="/(auth)/onboarding">onboarding</Link>
      <Link href="/(auth)/sign-in">sign in</Link>
      <Link href="/(root)/vehicleSetup">create Vehicle</Link>
      <Link href="/(root)/(tabs)/home">home</Link>
    </View>
  );
}

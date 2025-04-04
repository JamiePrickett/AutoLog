import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { Link } from "expo-router";

type Props = {
  authPress?: () => void;
  signIn?: boolean;
  authDisabled?: boolean;
};

const Auth = ({ authPress, signIn, authDisabled }: Props) => {
  return (
    <View className="w-full items-center mt-12">
      <CustomButton
        disabled={authDisabled}
        onPress={authPress}
        label={signIn ? "Login" : "Sign Up"}
        variant="primary-300"
      />
      <View className="flex flex-row justify-center items-center my-5 gap-x-3">
        <View className="flex-1 h-[1px] bg-light-200" />
        <Text className="text-lg text-light-200">Or</Text>
        <View className="flex-1 h-[1px] bg-light-200" />
      </View>
      <CustomButton
        disabled={authDisabled}
        label="Continue as Guest"
        iconColor="white"
        variant="outline"
      />
      {signIn ? (
        <Link href="/(auth)/sign-up" className="flex-row mt-5">
          <Text className="text-xl text-light-200">
            Don't have an account?{" "}
          </Text>
          <Text className="text-xl text-primary-200">Sign Up</Text>
        </Link>
      ) : (
        <Link href="/(auth)/sign-in" className="flex-row mt-5">
          <Text className="text-xl text-light-200">
            Already have an account?{" "}
          </Text>
          <Text className="text-xl text-primary-200">Sign In</Text>
        </Link>
      )}
    </View>
  );
};

export default Auth;

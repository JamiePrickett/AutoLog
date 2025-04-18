import React, { useRef, useState } from "react";
import Title from "@/components/Text/Title";
import Paragraph from "@/components/Text/Paragraph";
import InputField from "@/components/fields/InputField";
import { Alert, ScrollView, TextInput, View } from "react-native";
import Auth from "@/components/Auth";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/images/Logo";
import { createGuestUser, createUser } from "@/config/firebaseFunctions";
import KeyboardBase from "@/components/KeyboardBase";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.email || !form.password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      } else if (form.password !== form.confirmPassword) {
        Alert.alert("Error", "Passwords dont match");
        return;
      }

      const user = await createUser(form.email, form.password);

      if (user) {
        router.replace("/(root)/vehicleSetup");
      }
    } catch (error) {
      console.error("Error Submitting Sign Up form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const guestSubmit = async () => {
    setIsSubmitting(true);
    try {
      const user = await createGuestUser();
      if (user) {
        router.replace("/(root)/vehicleSetup");
      }
    } catch (error) {
      console.error("Error Submitting Guest Sign Up form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardBase>
      <ScrollView>
        <SafeAreaView className="items-center px-5">
          <Logo />
          <Title title="Sign Up" boxStyles="mt-[10%] mb-[20px]" />
          <Paragraph text="Create an account to continue" />
          <View className="mt-[40px] gap-4 w-full">
            <InputField
              placeholder="Email"
              icon="email-outline"
              keyboardType="email-address"
              onChangeText={(value) => setForm({ ...form, email: value })}
              value={form.email}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              refer={emailRef}
            />
            <InputField
              placeholder="Password"
              icon="lock-outline"
              onChangeText={(value) => setForm({ ...form, password: value })}
              value={form.password}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              refer={passwordRef}
            />
            <InputField
              placeholder="Confirm Password"
              icon="lock-outline"
              onChangeText={(value) =>
                setForm({ ...form, confirmPassword: value })
              }
              value={form.confirmPassword}
              secureTextEntry={true}
              returnKeyType="done"
              onSubmitEditing={submit}
              refer={confirmPasswordRef}
            />
          </View>
          <Auth
            authPress={submit}
            guestPress={guestSubmit}
            authDisabled={isSubmitting}
          />
        </SafeAreaView>
      </ScrollView>
    </KeyboardBase>
  );
};

export default SignUp;

import React, { useRef, useState } from "react";
import Title from "@/components/Text/Title";
import Paragraph from "@/components/Text/Paragraph";
import InputField from "@/components/fields/InputField";
import {
  Alert,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Auth from "@/components/Auth";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/images/Logo";
import { signInEmailPassword } from "@/config/firebaseFunctions";
import Base from "@/components/Base";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.email || !form.password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      const user = await signInEmailPassword(form.email, form.password);
      if (user) {
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log("No User Signed In");
      }
    } catch (error) {
      console.error("Error Submitting sign In form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Base>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="px-5 items-center">
          <Logo />
          <Title title="Welcome!" boxStyles="mt-[10%] mb-[20px]" />
          <Paragraph text="Login to continue" />
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
              returnKeyType="done"
              onSubmitEditing={submit}
              refer={passwordRef}
            />
          </View>
          <Auth signIn={true} authPress={submit} authDisabled={isSubmitting} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Base>
  );
};

export default SignIn;

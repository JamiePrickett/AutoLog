import {
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardTypeOptions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { ForwardedRef, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  icon?: any;
  secureTextEntry?: boolean;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
  refer?: ForwardedRef<TextInput>;
  lines?: number;
};

const InputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  icon,
  secureTextEntry,
  returnKeyType,
  onSubmitEditing,
  refer,
  lines = 1,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [scale] = useState(new Animated.Value(1));
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
    Animated.timing(scale, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setFocus(false);
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className={`flex-row items-center pl-4 gap-3 rounded-full border ${focus ? "border-primary-100" : "border-primary-150"}`}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={"#F4743A"}
          className="py-3"
        />
      ) : null}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        // keyboardVerticalOffset={100}
      >
        <TextInput
          ref={refer || null}
          className="font-GeologicaSemiBold text-light-100 text-xl py-3"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#D9D9D9"
          secureTextEntry={!showPassword && secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          numberOfLines={lines}
          multiline={lines > 1}
        />
      </KeyboardAvoidingView>
      {secureTextEntry ? (
        <TouchableOpacity
          className="p-3 pr-4"
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={"#F4743A"}
          />
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
};

export default InputField;

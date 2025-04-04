import { Animated, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Paragraph from "../Text/Paragraph";
import { router } from "expo-router";

const Add = () => {
  const [showModal, setShowModal] = useState(false);
  const translateX = useRef(new Animated.Value(500)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleModal = () => {
    if (showModal) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowModal(false));
    } else {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View className="absolute flex-row bottom-5 right-5 z-50">
      {showModal ? (
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="bg-primary-300 rounded-full flex-row pl-8 pr-16 gap-8 items-center -mr-[40px]"
        >
          <TouchableOpacity
            onPress={() => router.push("/(root)/addReminder")}
            className="items-center"
          >
            <MaterialCommunityIcons
              name="car-clock"
              size={24}
              color={"#201913"}
            />
            <Paragraph styles="text-dark-200 text-center" text="reminder" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(root)/addExpense")}
            className="items-center"
          >
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={24}
              color={"#201913"}
            />
            <Paragraph styles="text-dark-200 text-center" text="Expense" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(root)/addFuelUp")}
            className="items-center"
          >
            <MaterialCommunityIcons name="fuel" size={24} color={"#201913"} />
            <Paragraph styles="text-dark-200 text-center" text="Fuel Up" />
          </TouchableOpacity>
        </Animated.View>
      ) : null}

      <TouchableOpacity
        onPress={handleModal}
        activeOpacity={0.5}
        className="bg-primary-100 rounded-full w-[50px] h-[50px]"
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <MaterialCommunityIcons name="plus" size={50} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

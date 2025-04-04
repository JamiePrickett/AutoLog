import { Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  textStyles?: string;
  boxStyles?: string;
  text: string;
  icon?: any;
  iconColor?: string;
};

const Header1 = ({ textStyles, boxStyles, text, icon, iconColor }: Props) => {
  return (
    <View className={`flex-row items-center gap-2 ${boxStyles}`}>
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={iconColor ? iconColor : "#F4743A"}
        />
      ) : null}
      <Text
        className={`font-GeologicaBold text-3xl ${textStyles ? textStyles : "text-light-100"}`}
      >
        {text}
      </Text>
    </View>
  );
};

export default Header1;

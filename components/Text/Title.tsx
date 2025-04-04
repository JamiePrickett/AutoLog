import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  boxStyles?: string;
  textStyles?: string;
  title: string;
  icon?: any;
  iconColor?: string;
};

const Title = ({ boxStyles, textStyles, title, icon, iconColor }: Props) => {
  return (
    <View className={`flex-row gap-2 ${boxStyles}`}>
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={36}
          color={iconColor ? iconColor : "#F4743A"}
        />
      ) : null}
      <Text
        className={`font-GeologicaBold text-[32px] ${textStyles ? textStyles : "text-light-100"}`}
      >
        {title}
      </Text>
    </View>
  );
};

export default Title;

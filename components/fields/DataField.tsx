import { View } from "react-native";
import React from "react";
import Paragraph from "../Text/Paragraph";

type Props = {
  label?: string;
  data?: string;
};

const DataField = ({ label = "Data:", data = "" }: Props) => {
  return (
    <View className="flex-row w-full gap-2 items-center justify-between">
      <Paragraph text={label} />
      <Paragraph numOfLines={1} text={data} styles="text-primary-300" />
    </View>
  );
};

export default DataField;

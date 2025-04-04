import { View } from "react-native";
import React from "react";
import Header2 from "../Text/Header2";
import DataField from "./DataField";

type Props = {
  title: string;
  data?: any;
};

const DataBox = ({ title, data }: Props) => {
  return (
    <View
      className="items-center min-w-[170px] max-w-[250px]"
      style={{
        flex: 0,
        flexShrink: 1,
        flexGrow: 1,
        maxHeight: 130,
        flexBasis: "1%",
      }}
    >
      <Header2 boxStyles="mb-2" text={title} icon="chart-bar" />
      <DataField label="Distance:" data={data.distance} />
      <DataField label="Fuel Used:" data={data.fuelUsed} />
      <DataField label="Economy:" data={data.economy} />
      <DataField label="Total Cost:" data={data.cost} />
    </View>
  );
};

export default DataBox;

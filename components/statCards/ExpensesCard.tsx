import { FlatList, View } from "react-native";
import React from "react";
import Header1 from "../Text/Header1";
import DateModal from "../modals/DateModal";
import Header2 from "../Text/Header2";
import DataField from "../fields/DataField";
import GraphOptionsModal from "../modals/GraphOptionsModal";
import { useGlobal } from "@/context/GlobalContext";
import Paragraph from "../Text/Paragraph";
import LineChartComp from "../charts/LineChartComp";

const FuelCard = () => {
  const { activeVehicleData } = useGlobal();

  const totalCost = activeVehicleData.expenses.reduce(
    (sum, expense) => sum + expense.price,
    0
  );

  const chartData = activeVehicleData.expenses.map((item) => {
    const [, month, day] = item.date.split("T")[0].split("-"); // x axis text
    return {
      value: item.price, // data point
      label: `${day}/${month}`,
      dataPointText: "$" + item.price,
    };
  });

  const maxPrice = Math.max(
    ...activeVehicleData.expenses.map((item) => item.price)
  );
  const maxValue = Math.round(maxPrice + maxPrice / 6);

  return (
    <View className="border my-5 border-primary-100 w-full rounded-2xl">
      <View className="flex-row justify-between p-2 border-b border-primary-100 items-center">
        <Header1
          text="Expenses"
          icon="clipboard-text-outline"
          iconColor="#EF4336"
        />
        <DateModal />
      </View>
      <View className="p-2 border-b border-primary-100">
        <Header2 text="Expenses Overview" />
        <DataField label="Total Cost:" data={"$" + totalCost} />
        <View className="w-full items-start">
          <Header2 text="Expenses:" boxStyles="mt-3" />
          <FlatList
            scrollEnabled={false}
            data={activeVehicleData.expenses}
            renderItem={({ item }) => (
              <Paragraph
                numOfLines={1}
                text={`${item.expense}: $${item.price}${item.notes ? `, ${item.notes}` : ""}`}
              />
            )}
          />
        </View>

        <View className="flex-row mt-5 justify-between items-center">
          <Header2 text="Graph" />
          <GraphOptionsModal />
        </View>
      </View>
      <View className="flex-1 pt-5 pb-2 w-full mx-3">
        <LineChartComp data={chartData} maxValue={maxValue} />
      </View>
    </View>
  );
};

export default FuelCard;

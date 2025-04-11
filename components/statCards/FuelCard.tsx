import { View } from "react-native";
import React from "react";
import Header1 from "../Text/Header1";
import Header2 from "../Text/Header2";
import DataField from "../fields/DataField";
import { useGlobal } from "@/context/GlobalContext";
import LineChartComp from "../charts/LineChartComp";

const FuelCard = () => {
  const { activeVehicleData } = useGlobal();

  const lastFuelUp = activeVehicleData.fuelUps[0] || {};
  const firstFuelUp =
    activeVehicleData.fuelUps[activeVehicleData.fuelUps.length - 1] || {};

  const totalDistance = lastFuelUp.mileage - firstFuelUp.mileage;

  let fuelUsed = 0;
  let cost = 0;
  let price = 0;

  activeVehicleData.fuelUps.forEach((fuelUp) => {
    fuelUsed += fuelUp.fuelQuantity;
    cost += fuelUp.fuelQuantity * fuelUp.price;
    price += fuelUp.price;
  });

  const economyKmL =
    Math.round((totalDistance / (fuelUsed - firstFuelUp.fuelQuantity)) * 100) /
    100;
  const economyL100 = Math.round((100 / economyKmL) * 100) / 100;
  const economyMpgUS = Math.round(economyKmL * 2.352 * 100) / 100;
  const economyMpgUK = Math.round(economyKmL * 2.825 * 100) / 100;

  // Chart Stuff
  const chartData = activeVehicleData.fuelUps.map((item) => {
    const [, month, day] = item.date.split("T")[0].split("-"); // x axis text
    return {
      value: item.price, // data point
      label: `${day}/${month}`,
      dataPointText: "$" + item.price,
    };
  });

  const maxPrice = Math.max(
    0,
    ...activeVehicleData.fuelUps.map((item) => item.price)
  );
  const maxValue = Math.round(maxPrice + maxPrice / 2);

  return (
    <View className="border my-5 border-primary-200 w-full rounded-2xl">
      <View className="w-full items-start p-2 border-b border-primary-200">
        <Header1 text="Fuel" icon="fuel" />
      </View>
      <View className="p-2 border-b border-primary-200">
        <Header2 text="Fuel Economy" />
        <DataField label="km/L" data={economyKmL + " km/L"} />
        <DataField label="L/100km" data={economyL100 + " L/100km"} />
        <DataField label="mpg (US)" data={economyMpgUS + " mpg (US)"} />
        <DataField label="mpg (UK)" data={economyMpgUK + " mpg (UK)"} />

        <Header2 text="Stats" boxStyles="mt-3" />
        <DataField
          label="Total Fuel:"
          data={Math.round(fuelUsed * 100) / 100 + " L"}
        />
        <DataField
          label="Total Cost:"
          data={"$ " + Math.round(cost * 100) / 100}
        />
        <DataField
          label="Average Fuel Price:"
          data={
            "$ " +
            Math.round((price / activeVehicleData.fuelUps.length) * 100) / 100
          }
        />

        <Header2 text="Graph" boxStyles="mt-5" />
      </View>
      <View className="flex-1 pt-5 pb-2 w-full mx-3">
        <LineChartComp data={chartData} maxValue={maxValue} />
      </View>
    </View>
  );
};

export default FuelCard;

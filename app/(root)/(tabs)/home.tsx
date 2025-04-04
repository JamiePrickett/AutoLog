import Base from "@/components/Base";
import DataBox from "@/components/fields/DataBox";
import DataField from "@/components/fields/DataField";
import Logo from "@/components/images/Logo";
import Add from "@/components/modals/Add";
import VehiclesMenu from "@/components/modals/VehiclesMenu";
import Header2 from "@/components/Text/Header2";
import Paragraph from "@/components/Text/Paragraph";
import Title from "@/components/Text/Title";
import { images } from "@/constants";
import { useGlobal } from "@/context/GlobalContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { activeVehicle, activeVehicleData, fetchUserVehicles, units } =
    useGlobal();

  const [refreshing, setRefreshing] = useState(false);

  const lastFuelUp = activeVehicleData.fuelUps[0];
  const firstFuelUp =
    activeVehicleData.fuelUps[activeVehicleData.fuelUps.length - 1];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUserVehicles();
    } catch (error) {
      console.error("Error refreshing home:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const previousData = () => {
    const secondLastFuelUp = activeVehicleData.fuelUps[1];

    if (!lastFuelUp) {
      return ["N/A", "N/A", "N/A", "N/A"];
    }

    const distance =
      Math.round(
        (lastFuelUp.mileage -
          (secondLastFuelUp ? secondLastFuelUp.mileage : 0)) *
          100
      ) / 100;
    const fuelUsed = Math.round(lastFuelUp.fuelQuantity * 100) / 100;
    const economy = Math.round((distance / fuelUsed) * 100) / 100;
    const cost =
      Math.round(lastFuelUp.fuelQuantity * lastFuelUp.price * 100) / 100;

    const unitDistance = distance + units.distance;
    const unitFuelUsed = fuelUsed + " L";
    const unitEconomy = economy + " km/L";
    const unitCost = "$" + cost;

    return [unitDistance, unitFuelUsed, unitEconomy, unitCost];
  };
  const [prevDistance, prevFuelUsed, prevEconomy, prevCost] = previousData();

  const total = () => {
    if (!lastFuelUp || !firstFuelUp || activeVehicleData.fuelUps.length < 2) {
      return ["N/A", "N/A", "N/A"];
    }
    const distance =
      Math.round((lastFuelUp.mileage - firstFuelUp.mileage) * 100) / 100;
    let fuelUsed = 0;
    let cost = 0;

    activeVehicleData.fuelUps.forEach((fuelUp) => {
      fuelUsed += fuelUp.fuelQuantity;
      cost += fuelUp.fuelQuantity * fuelUp.price;
    });

    const unitDistance = distance + " km";
    const unitFuelUsed = Math.round(fuelUsed * 100) / 100 + " L";
    const unitCost = "$" + Math.round(cost * 100) / 100;

    return [unitDistance, unitFuelUsed, unitCost];
  };
  const [totalDistance, totalFuelUsed, totalCost] = total();

  const average = () => {
    if (!lastFuelUp || !firstFuelUp || activeVehicleData.fuelUps.length < 2) {
      return ["N/A", "N/A", "N/A", "N/A"];
    }

    const fuelUpsLength = activeVehicleData.fuelUps.length - 1;

    const totalDistance = lastFuelUp.mileage - firstFuelUp.mileage;
    const distance = Math.round((totalDistance / fuelUpsLength) * 100) / 100;

    let fuelUsed = 0;
    let cost = 0;

    activeVehicleData.fuelUps.forEach((fuelUp) => {
      (fuelUsed += fuelUp.fuelQuantity),
        (cost += fuelUp.fuelQuantity * fuelUp.price);
    });

    const economy =
      Math.round(
        (totalDistance / (fuelUsed - firstFuelUp.fuelQuantity)) * 100
      ) / 100;
    fuelUsed = Math.round((fuelUsed / (fuelUpsLength + 1)) * 100) / 100;

    const unitDistance = distance + " km";
    const unitFuelUsed = fuelUsed + " L";
    const unitEconomy = economy + " km/L";
    const unitCost = "$" + Math.round((cost / (fuelUpsLength + 1)) * 100) / 100;

    return [unitDistance, unitFuelUsed, unitEconomy, unitCost];
  };
  const [averageDistance, averageFuelUsed, averageEconomy, averageCost] =
    average();

  return (
    <Base>
      <SafeAreaView className="flex-1 pb-20">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="items-center h-full pb-4">
            <Logo />
            <View className="w-full mt-5 px-5">
              <Title
                boxStyles="w-[65%]"
                title={activeVehicle?.vehicleName || "No Vehicles"}
              />
              <VehiclesMenu />
            </View>
            <View className="w-full my-5 px-5 gap-5 items-center">
              {activeVehicleData.fuelUps.length < 2 ? (
                <Header2 text="Enter more fuel ups for data." />
              ) : (
                ""
              )}
              <View className="flex-row flex-wrap justify-around gap-3">
                <DataBox
                  title="Previous"
                  data={{
                    distance: prevDistance,
                    fuelUsed: prevFuelUsed,
                    economy: prevEconomy,
                    cost: prevCost,
                  }}
                />
                <DataBox
                  title="Average"
                  data={{
                    distance: averageDistance,
                    fuelUsed: averageFuelUsed,
                    economy: averageEconomy,
                    cost: averageCost,
                  }}
                />
              </View>
              <View>
                <DataBox
                  title="Total"
                  data={{
                    distance: totalDistance,
                    fuelUsed: totalFuelUsed,
                    economy: averageEconomy,
                    cost: totalCost,
                  }}
                />
              </View>
            </View>
            <Image
              source={
                activeVehicle?.image
                  ? {
                      uri: activeVehicle?.image,
                    }
                  : images.onboarding1
              }
              className="w-full aspect-[4/2] mb-3"
              resizeMode="contain"
            />
            <Title title={`${activeVehicle?.vehicleName} Info:`} />
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(root)/vehicleSetup",
                  params: { update: "true" },
                })
              }
              className="max-w-[250px] items-start"
            >
              <DataField
                label="Mileage:"
                data={activeVehicle?.mileage.toString() + " km"}
              />
              <DataField
                label="Fuel Type:"
                data={activeVehicle?.fuelType || "add"}
              />
              <DataField label="Make:" data={activeVehicle?.make || "add"} />
              <DataField label="Model:" data={activeVehicle?.model || "add"} />
              <DataField label="year:" data={activeVehicle?.year?.toString()} />
              <Paragraph
                text={`Notes: ${activeVehicle?.notes || "none, click to add"}`}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Title
          title="Add Records →"
          boxStyles="absolute bottom-5 right-[90px]"
        />
        <Add />
      </SafeAreaView>
    </Base>
  );
};

export default Home;

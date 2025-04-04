import Base from "@/components/Base";
import Logo from "@/components/images/Logo";
import InputField from "@/components/fields/InputField";
import Add from "@/components/modals/Add";
import Filter from "@/components/modals/Filter";
import RecordCard from "@/components/RecordCard";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobal } from "@/context/GlobalContext";

const Timeline = () => {
  const {
    activeVehicle,
    activeVehicleData,
    filters,
    handleFetchActiveVehicleData,
  } = useGlobal();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (!activeVehicle) {
        console.log("No active vehicle: cannot fetch data");
        return;
      }
      await handleFetchActiveVehicleData(activeVehicle.id!);
    } catch (error) {
      console.error("Error refreshing Timeline:", error);
    } finally {
      setRefreshing(false);
    }
  };

  let fuelUps = [...activeVehicleData.fuelUps].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  fuelUps = fuelUps.map((item, index) => ({
    ...item,
    variant: "Fuel Up",
    previousMileage: index > 0 ? fuelUps[index - 1].mileage : item.mileage,
  }));

  const records = [
    ...(filters.fuelUps ? fuelUps : []),
    ...(filters.expenses
      ? activeVehicleData.expenses.map((item) => ({
          ...item,
          variant: "Expense",
        }))
      : []),
    ...(filters.reminders
      ? activeVehicleData.reminders.map((item) => ({
          ...item,
          variant: "Reminder",
        }))
      : []),
  ];

  const sortedRecords = records.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filteredRecords = sortedRecords.filter((record) => {
    if (!searchQuery) return true;
    return record.date.includes(searchQuery);
  });

  return (
    <Base>
      <SafeAreaView className="items-center flex-1">
        <Logo />
        <View className="mt-8 mb-4 w-full px-5">
          <View className="w-[70%]">
            <InputField
              placeholder="Search (by date)"
              icon="magnify"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Filter />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          className="px-2"
          contentContainerClassName="pb-20"
          data={filteredRecords}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <RecordCard info={item} />}
        />
        <Add />
      </SafeAreaView>
    </Base>
  );
};

export default Timeline;

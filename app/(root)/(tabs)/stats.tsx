import React from "react";
import Base from "@/components/Base";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/images/Logo";
import { ScrollView } from "react-native";
import FuelCard from "@/components/statCards/FuelCard";
import ExpensesCard from "@/components/statCards/ExpensesCard";

const Stats = () => {
  return (
    <Base>
      <SafeAreaView className="items-center">
        <Logo />
        <ScrollView
          className="w-full px-3 my-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <FuelCard />
          <ExpensesCard />
        </ScrollView>
      </SafeAreaView>
    </Base>
  );
};

export default Stats;

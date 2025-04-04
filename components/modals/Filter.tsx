import { Animated, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Header2 from "../Text/Header2";
import CheckBox from "../fields/CheckBox";
import { useGlobal } from "@/context/GlobalContext";

const Filter = () => {
  const { filters, setFilters } = useGlobal();
  const [showModal, setShowModal] = useState(false);
  const heightAnimation = useRef(new Animated.Value(0)).current;

  const handleModal = () => {
    if (showModal) {
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowModal(false));
    } else {
      setShowModal(true);
      Animated.timing(heightAnimation, {
        toValue: 120,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleFilter = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <View
      className={`items-end absolute right-0 py-3 pr-5 z-50 ${showModal ? "bg-dark-200 rounded-2xl" : ""}`}
    >
      <TouchableOpacity onPress={handleModal}>
        <Header2 text="Filter" icon="car-cog" />
      </TouchableOpacity>
      <Animated.View
        style={{ height: heightAnimation, overflow: "hidden" }}
        className="pl-5 mt-4"
      >
        {showModal ? (
          <View>
            <CheckBox
              label="Fuel Ups"
              bgColor="bg-primary-200"
              borderColor="border-primary-200"
              active={filters.fuelUps}
              onPress={() => toggleFilter("fuelUps")}
            />
            <CheckBox
              label="Expenses"
              bgColor="bg-primary-100"
              borderColor="border-primary-100"
              active={filters.expenses}
              onPress={() => toggleFilter("expenses")}
            />
            <CheckBox
              label="Reminders"
              bgColor="bg-primary-300"
              borderColor="border-primary-300"
              active={filters.reminders}
              onPress={() => toggleFilter("reminders")}
            />
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default Filter;

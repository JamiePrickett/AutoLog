import { Animated, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Header2 from "../Text/Header2";
import Paragraph from "../Text/Paragraph";
import { vehicleData } from "@/types/writeData";
import { useGlobal } from "@/context/GlobalContext";
import { Link } from "expo-router";

const HEIGHT = 30;

const VehiclesMenu = () => {
  const { vehicles, activeVehicle, setActiveVehicle } = useGlobal();
  const [showModal, setShowModal] = useState(false);
  const heightAnimation = useRef(new Animated.Value(0)).current;

  const handleSelectVehicle = (vehicle: vehicleData) => {
    setActiveVehicle(vehicle);
    setShowModal(false);
  };

  const handleModal = () => {
    const height = vehicles.length > 0 ? HEIGHT * vehicles.length + 50 : 60;

    if (showModal) {
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowModal(false));
    } else {
      setShowModal(true);
      Animated.timing(heightAnimation, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View
      className={`items-end absolute right-0 py-3 px-5 z-50 ${showModal ? "bg-dark-200 rounded-2xl" : ""}`}
    >
      <TouchableOpacity onPress={handleModal}>
        <Header2 text="Vehicles" icon="car-cog" />
      </TouchableOpacity>
      <Animated.View
        style={{ height: heightAnimation, overflow: "hidden" }}
        className="mt-4"
      >
        {showModal ? (
          <View className="gap-1">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle: vehicleData) => (
                <TouchableOpacity
                  key={vehicle.id}
                  onPress={() => handleSelectVehicle(vehicle)}
                  className="py-1"
                >
                  <Paragraph
                    text={vehicle.vehicleName}
                    styles={
                      activeVehicle?.id === vehicle.id
                        ? "text-primary-300"
                        : "text-light-200"
                    }
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Link
                href={"/(root)/vehicleSetup"}
                className="text-2xl text-light-200"
              >
                No Vehicles{"\n"}
                <Text className="text-primary-300">Create Vehicle</Text>
              </Link>
            )}
            <Link href={"/(root)/vehicleSetup"} className="mt-3 py-1">
              <Text className="text-primary-200">Create Vehicle</Text>
            </Link>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
};

export default VehiclesMenu;

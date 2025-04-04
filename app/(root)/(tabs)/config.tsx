import React, { useState } from "react";
import Base from "@/components/Base";
import Logo from "@/components/images/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Paragraph from "@/components/Text/Paragraph";
import { signUserOut } from "@/config/firebaseConfig";
import CustomButton from "@/components/CustomButton";
import { useGlobal } from "@/context/GlobalContext";
import Header2 from "@/components/Text/Header2";
import CheckBox from "@/components/fields/CheckBox";

const Config = () => {
  const { units, setUnits } = useGlobal();
  const [showModal, setShowModal] = useState(false);
  return (
    <Base>
      <SafeAreaView className="items-center">
        <Logo />
        <View className="w-full items-end px-5 pt-2 pb-5">
          <TouchableOpacity
            onPress={() => signUserOut()}
            className="bg-dark-200 p-2 border border-primary-100 rounded-xl"
          >
            <Paragraph text="Sign Out" />
          </TouchableOpacity>
        </View>
        <View className="w-full px-5">
          <CustomButton
            onPress={() => setShowModal(true)}
            label={`Units (${units.distance}, ${units.fuel})`}
            icon="car-cog"
            iconColor="#201913"
            variant="primary-300"
          />
        </View>

        <Modal visible={showModal} transparent animationType="slide">
          <TouchableWithoutFeedback
            onPress={() => setShowModal(false)}
            className="flex-1"
          >
            <View className="flex-1 items-center pt-40 bg-dark-100/50">
              <View
                onStartShouldSetResponder={() => true}
                className="bg-dark-200 items-center justify-center w-[70%] py-8 rounded-2xl border border-primary-300"
              >
                <Header2 text="Distance:" />
                <View className="items-end my-2">
                  <CheckBox
                    rounded
                    label="Kilometers"
                    bgColor="bg-primary-300"
                    borderColor="border-primary-300"
                    active={units.distance === "km"}
                    onPress={() =>
                      setUnits((prev) => ({ ...prev, distance: "km" }))
                    }
                  />
                  <CheckBox
                    rounded
                    label="Miles"
                    bgColor="bg-primary-300"
                    borderColor="border-primary-300"
                    active={units.distance === "mi"}
                    onPress={() =>
                      setUnits((prev) => ({ ...prev, distance: "mi" }))
                    }
                  />
                </View>
                <Header2 text="Fuel:" boxStyles="mt-2" />
                <View className="items-end my-2">
                  <CheckBox
                    rounded
                    label="Litres"
                    bgColor="bg-primary-300"
                    borderColor="border-primary-300"
                    active={units.fuel === "L"}
                    onPress={() => setUnits((prev) => ({ ...prev, fuel: "L" }))}
                  />
                  <CheckBox
                    rounded
                    label="Gallon (US)"
                    bgColor="bg-primary-300"
                    borderColor="border-primary-300"
                    active={units.fuel === "mpg (US)"}
                    onPress={() =>
                      setUnits((prev) => ({ ...prev, fuel: "mpg (US)" }))
                    }
                  />
                  <CheckBox
                    rounded
                    label="Gallon (UK)"
                    bgColor="bg-primary-300"
                    borderColor="border-primary-300"
                    active={units.fuel === "mpg (UK)"}
                    onPress={() =>
                      setUnits((prev) => ({ ...prev, fuel: "mpg (UK)" }))
                    }
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </Base>
  );
};

export default Config;

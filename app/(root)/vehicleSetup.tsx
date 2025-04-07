import CustomButton from "@/components/CustomButton";
import Logo from "@/components/images/Logo";
import InputField from "@/components/fields/InputField";
import Header1 from "@/components/Text/Header1";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Keyboard, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import {
  deleteVehicle,
  updateVehicle,
  writeVehicle,
} from "@/config/firebaseConfig";
import PickImageComp from "@/components/fields/PickImageComp";
import Base from "@/components/Base";
import { useGlobal } from "@/context/GlobalContext";

const VehicleSetup = () => {
  const { update } = useLocalSearchParams();
  const { activeVehicle } = useGlobal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    vehicleName: "",
    mileage: "",
    make: "",
    model: "",
    year: "",
    fuelType: "",
    image: "",
    notes: "",
  });

  const vehicleNameRef = useRef<TextInput>(null);
  const mileageRef = useRef<TextInput>(null);
  const makeRef = useRef<TextInput>(null);
  const modelRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const fuelTypeRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  useEffect(() => {
    if (update && activeVehicle) {
      setForm({
        vehicleName: activeVehicle.vehicleName || "",
        mileage: activeVehicle.mileage?.toString() || "",
        make: activeVehicle.make || "",
        model: activeVehicle.model || "",
        year: activeVehicle.year ? activeVehicle.year?.toString() : "",
        fuelType: activeVehicle.fuelType || "",
        image: activeVehicle.image || "",
        notes: activeVehicle.notes || "",
      });
    }
  }, [update, activeVehicle]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.vehicleName || !form.mileage) {
        Alert.alert("Please fill in all Required fields");
        return;
      }
      const vehicleData = {
        ...form,
        mileage: Number(form.mileage),
        year: Number(form.year),
      };
      if (!activeVehicle && update) {
        router.replace("/home");
        return;
      }

      if (update) {
        await updateVehicle(vehicleData, activeVehicle?.id!);
      } else {
        await writeVehicle(vehicleData);
      }

      router.replace("/(root)/(tabs)/home");
    } catch (error) {
      console.error(
        `Error ${update ? "Updating" : "Submitting"} vehicle:`,
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteVehicle(activeVehicle?.id!);
      router.replace("/(root)/(tabs)/home");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Base>
      <ScrollView>
        <SafeAreaView className="px-5 pb-16">
          <View className="items-center">
            <Logo />
          </View>
          <View className="mt-8 gap-4 items-center">
            <Header1
              text={
                update
                  ? `Updating ${activeVehicle?.vehicleName}`
                  : "Setup your Vehicle"
              }
              icon="car-cog"
              boxStyles="mb-2"
            />
            <InputField
              placeholder="Vehicle Name"
              icon="car-side"
              onChangeText={(value) => setForm({ ...form, vehicleName: value })}
              value={form.vehicleName}
              returnKeyType="next"
              onSubmitEditing={() => mileageRef.current?.focus()}
              refer={vehicleNameRef}
            />
            {!update ? (
              <InputField
                placeholder="Initial Mileage (odometer value)"
                icon="speedometer"
                keyboardType="number-pad"
                onChangeText={(value) => setForm({ ...form, mileage: value })}
                value={form.mileage}
                returnKeyType="next"
                onSubmitEditing={() => makeRef.current?.focus()}
                refer={mileageRef}
              />
            ) : (
              ""
            )}
          </View>
          <View className="mt-8 gap-4 items-center">
            <Header1 text="Optional Info" icon="chart-bar" boxStyles="mb-2" />
            <InputField
              placeholder="Make"
              icon="factory"
              onChangeText={(value) => setForm({ ...form, make: value })}
              value={form.make}
              returnKeyType="next"
              onSubmitEditing={() => modelRef.current?.focus()}
              refer={makeRef}
            />
            <InputField
              placeholder="Model"
              icon="car-convertible"
              onChangeText={(value) => setForm({ ...form, model: value })}
              value={form.model}
              returnKeyType="next"
              onSubmitEditing={() => yearRef.current?.focus()}
              refer={modelRef}
            />
            <InputField
              icon="calendar"
              placeholder="Year"
              keyboardType="number-pad"
              onChangeText={(value) => setForm({ ...form, year: value })}
              value={form.year}
              returnKeyType="next"
              onSubmitEditing={() => fuelTypeRef.current?.focus()}
              refer={yearRef}
            />
            <InputField
              placeholder="Fuel Type"
              icon="fuel"
              onChangeText={(value) => setForm({ ...form, fuelType: value })}
              value={form.fuelType}
              returnKeyType="next"
              onSubmitEditing={() => notesRef.current?.focus()}
              refer={fuelTypeRef}
            />
            <PickImageComp
              image={form.image}
              setImage={(uri) => setForm({ ...form, image: uri })}
            />
            <InputField
              placeholder="Notes:"
              icon="script-text-outline"
              onChangeText={(value) => setForm({ ...form, notes: value })}
              value={form.notes}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              refer={notesRef}
            />
          </View>
          <CustomButton
            disabled={isSubmitting}
            onPress={submit}
            label={update ? "Update" : "Save"}
            variant="primary-200"
            styles="mt-12"
          />
          {update ? (
            <CustomButton
              disabled={isSubmitting}
              onPress={handleDelete}
              label="Delete"
              variant="outline"
              styles="mt-12"
            />
          ) : (
            ""
          )}
        </SafeAreaView>
      </ScrollView>
    </Base>
  );
};

export default VehicleSetup;
function fetchUserVehicles() {
  throw new Error("Function not implemented.");
}

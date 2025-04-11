import CustomButton from "@/components/CustomButton";
import DateInput from "@/components/fields/DateInput";
import Logo from "@/components/images/Logo";
import InputField from "@/components/fields/InputField";
import Header1 from "@/components/Text/Header1";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import {
  deleteRecord,
  updateRecord,
  writeRecord,
} from "@/config/firebaseConfig";
import { useGlobal } from "@/context/GlobalContext";
import Base from "@/components/Base";

const AddFuelUp = () => {
  const { update } = useLocalSearchParams() as { update: string };
  const {
    activeVehicle,
    activeVehicleData,
    fetchUserVehicles,
    handleFetchActiveVehicleData,
  } = useGlobal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString(),
    mileage: "",
    fuelQuantity: "",
    price: "",
    notes: "",
  });

  const mileageRef = useRef<TextInput>(null);
  const fuelQuantityRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  if (!activeVehicle) {
    router.push("/(root)/(tabs)/home");
  }
  const vehicleId = activeVehicle!.id;

  useEffect(() => {
    if (update) {
      const fuelUpRecord = activeVehicleData.fuelUps.find(
        (fuelUp) => fuelUp.id === update
      );
      if (fuelUpRecord) {
        setForm({
          date: fuelUpRecord.date || new Date().toISOString(),
          mileage: fuelUpRecord.mileage.toString() || "",
          fuelQuantity: fuelUpRecord.fuelQuantity.toString() || "",
          price: fuelUpRecord.price.toString() || "",
          notes: fuelUpRecord.notes || "",
        });
      } else {
        router.replace("/home");
      }
    }
  }, [update]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.mileage || !form.fuelQuantity || !form.price) {
        Alert.alert("Please fill in all Required fields");
        return;
      }
      const fuelUpData = {
        ...form,
        mileage: Number(form.mileage),
        fuelQuantity: Number(form.fuelQuantity),
        price: Number(form.price),
      };

      {
        update
          ? await updateRecord(vehicleId!, "fuelUps", update, fuelUpData)
          : await writeRecord(vehicleId!, "fuelUps", fuelUpData);
      }

      await handleFetchActiveVehicleData(vehicleId!);
      router.back();
    } catch (error) {
      console.error(
        `Error ${update ? "Updating" : "Submitting"} FuelUp:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteRecord(vehicleId!, "fuelUps", update);

      await handleFetchActiveVehicleData(vehicleId!);
      router.back();
    } catch (error) {
      console.error("Error deleting Fuel Up:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Base>
      <SafeAreaView>
        <ScrollView
          className="w-full px-5"
          contentContainerClassName="items-center"
        >
          <Logo />
          <View className="mt-8 gap-4 items-center">
            <Header1
              text={update ? "Update Fuel Up" : "Add Fuel Up"}
              icon="fuel"
              boxStyles="mb-2"
            />
            <DateInput
              label="Today"
              setValue={(date) => setForm({ ...form, date: date })}
            />
            <InputField
              placeholder="mileage"
              icon="speedometer"
              keyboardType="number-pad"
              onChangeText={(value) => setForm({ ...form, mileage: value })}
              value={form.mileage}
              returnKeyType="next"
              onSubmitEditing={() => fuelQuantityRef.current?.focus()}
              refer={mileageRef}
            />
            <InputField
              placeholder="Fuel Quantity"
              icon="fuel"
              keyboardType="number-pad"
              onChangeText={(value) =>
                setForm({ ...form, fuelQuantity: value })
              }
              value={form.fuelQuantity}
              returnKeyType="next"
              onSubmitEditing={() => priceRef.current?.focus()}
              refer={fuelQuantityRef}
            />
            <InputField
              placeholder="Price/L"
              icon="receipt"
              keyboardType="number-pad"
              onChangeText={(value) => setForm({ ...form, price: value })}
              value={form.price}
              returnKeyType="next"
              onSubmitEditing={() => notesRef.current?.focus()}
              refer={priceRef}
            />
          </View>
          <View className="mt-8 gap-4 items-center">
            <Header1 text="Optional Info" icon="chart-bar" boxStyles="mb-2" />
            <InputField
              placeholder="Notes:"
              icon="script-text-outline"
              onChangeText={(value) => setForm({ ...form, notes: value })}
              value={form.notes}
              returnKeyType="done"
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
        </ScrollView>
      </SafeAreaView>
    </Base>
  );
};

export default AddFuelUp;

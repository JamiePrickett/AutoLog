import CustomButton from "@/components/CustomButton";
import DateInput from "@/components/fields/DateInput";
import Logo from "@/components/images/Logo";
import InputField from "@/components/fields/InputField";
import Header1 from "@/components/Text/Header1";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Keyboard, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import {
  deleteRecord,
  updateRecord,
  writeRecord,
} from "@/config/firebaseConfig";
import { useGlobal } from "@/context/GlobalContext";
import Base from "@/components/Base";

const AddExpense = () => {
  const { update } = useLocalSearchParams() as { update: string };
  const {
    activeVehicle,
    activeVehicleData,
    fetchUserVehicles,
    handleFetchActiveVehicleData,
  } = useGlobal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    expense: "",
    date: "",
    dueMileage: "",
    price: "",
    notes: "",
  });

  const expenseRef = useRef<TextInput>(null);
  const dueMileageRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  if (!activeVehicle) {
    router.push("/home");
  }
  const vehicleId = activeVehicle!.id;

  useEffect(() => {
    if (update) {
      const expenseRecord = activeVehicleData.expenses.find(
        (expense) => expense.id === update
      );
      if (expenseRecord) {
        setForm({
          expense: expenseRecord.expense || "",
          date: expenseRecord.date || new Date().toISOString(),
          dueMileage: expenseRecord.dueMileage.toString() || "",
          price: expenseRecord.price.toString() || "",
          notes: expenseRecord.notes || "",
        });
      } else {
        router.replace("/home");
      }
    }
  }, [update]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.date) {
        Alert.alert("Please enter due date");
        return;
      } else if (!form.expense || !form.price) {
        Alert.alert("Please fill in all fields");
        return;
      }
      const expenseData = {
        ...form,
        dueMileage: Number(form.dueMileage),
        price: Number(form.price),
      };

      {
        update
          ? await updateRecord(vehicleId!, "expenses", update, expenseData)
          : await writeRecord(vehicleId!, "expenses", expenseData);
      }

      await handleFetchActiveVehicleData(vehicleId!);
      router.back();
    } catch (error) {
      console.error(
        `Error ${update ? "Updating" : "Submitting"} Expense:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteRecord(vehicleId!, "expenses", update);

      await handleFetchActiveVehicleData(vehicleId!);

      router.back();
    } catch (error) {
      console.error("Error deleting expense:", error);
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
              text={update ? "Update Expense" : "Add Expense"}
              icon="clipboard-text-outline"
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
              onChangeText={(value) => setForm({ ...form, dueMileage: value })}
              value={form.dueMileage}
              returnKeyType="next"
              onSubmitEditing={() => expenseRef.current?.focus()}
              refer={dueMileageRef}
            />
            <InputField
              placeholder="Item"
              icon="clipboard-text-outline"
              onChangeText={(value) => setForm({ ...form, expense: value })}
              value={form.expense}
              returnKeyType="next"
              onSubmitEditing={() => priceRef.current?.focus()}
              refer={expenseRef}
            />
            <InputField
              placeholder="Price"
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
              onSubmitEditing={Keyboard.dismiss}
              refer={notesRef}
            />
          </View>
          <CustomButton
            disabled={isSubmitting}
            onPress={submit}
            label={update ? "Update" : "Save"}
            variant="primary-100"
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

export default AddExpense;

import CustomButton from "@/components/CustomButton";
import DateInput from "@/components/fields/DateInput";
import Logo from "@/components/images/Logo";
import InputField from "@/components/fields/InputField";
import Header1 from "@/components/Text/Header1";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import {
  deleteRecord,
  updateRecord,
  writeRecord,
} from "@/config/firebaseFunctions";
import CheckBox from "@/components/fields/CheckBox";
import Header2 from "@/components/Text/Header2";
import { useGlobal } from "@/context/GlobalContext";
import Base from "@/components/Base";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AddReminder = () => {
  const { update } = useLocalSearchParams() as { update: string };
  const { activeVehicle, activeVehicleData, handleFetchActiveVehicleData } =
    useGlobal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    reminder: "",
    date: "",
    dueMileage: "",
    done: false,
    repeat: false,
    notes: "",
  });

  const reminderRef = useRef<TextInput>(null);
  const dueMileageRef = useRef<TextInput>(null);

  if (!activeVehicle) {
    router.replace("/(root)/(tabs)/home");
  }
  const vehicleId = activeVehicle!.id;

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Notification permission not granted");
        return;
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    if (update && activeVehicle) {
      const reminderRecord = activeVehicleData.reminders.find(
        (reminder) => reminder.id === update
      );
      if (reminderRecord) {
        setForm({
          reminder: reminderRecord.reminder || "",
          date: reminderRecord.date || new Date().toISOString(),
          dueMileage: reminderRecord.dueMileage.toString() || "",
          done: reminderRecord.done || false,
          repeat: reminderRecord.repeat || false,
          notes: reminderRecord.notes || "",
        });
      } else {
        router.replace("/(root)/(tabs)/home");
      }
    } else return;
  }, [update]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      if (!form.date) {
        Alert.alert("Please enter either due date or mileage");
        return;
      } else if (!form.reminder) {
        Alert.alert("Please fill in all fields");
        return;
      }

      const date = new Date(form.date);
      let notificationId = "";

      if (form.repeat) {
        notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Reminder",
            body: form.reminder,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            repeats: true,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
          },
        });
        console.log("Notification repeating ID:", notificationId);
      } else {
        notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Reminder",
            body: form.reminder,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: date,
          },
        });
        console.log("Notification ID:", notificationId);
      }

      const reminderData = {
        ...form,
        dueMileage: Number(form.dueMileage),
        notificationId,
      };

      if (update) {
        await updateRecord(vehicleId!, "reminders", update, reminderData);
      } else {
        await writeRecord(vehicleId!, "reminders", reminderData);
      }

      await handleFetchActiveVehicleData(vehicleId!);
      router.back();
    } catch (error) {
      console.error(
        `Error ${update ? "Updating" : "Submitting"} Reminder:`,
        error
      );
      Alert.alert(`Error ${update ? "Updating" : "Submitting"} Reminder`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteRecord(vehicleId!, "reminders", update);

      await handleFetchActiveVehicleData(vehicleId!);

      router.back();
    } catch (error) {
      console.error("Error deleting reminder:", error);
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
              text={update ? "Update Reminder" : "Add Reminder"}
              icon="car-clock"
              iconColor="#FBAF40"
              boxStyles="mb-2"
            />
            <DateInput
              label="Today"
              setValue={(date) => setForm({ ...form, date: date })}
            />
            <InputField
              placeholder="Due Mileage"
              icon="speedometer"
              keyboardType="number-pad"
              onChangeText={(value) => setForm({ ...form, dueMileage: value })}
              value={form.dueMileage}
              returnKeyType="next"
              onSubmitEditing={() => reminderRef.current?.focus()}
              refer={dueMileageRef}
            />
            <InputField
              placeholder="Reminder"
              icon="clipboard-text-outline"
              onChangeText={(value) => setForm({ ...form, reminder: value })}
              value={form.reminder}
              returnKeyType="next"
              refer={reminderRef}
            />
            <TouchableOpacity
              className="flex-row gap-2 p-2"
              onPress={() => setForm({ ...form, done: !form.done })}
            >
              <Header2 text="Done:" />
              <CheckBox
                bgColor="bg-primary-300"
                borderColor="border-primary-300"
                active={form.done}
                onPress={() => setForm({ ...form, done: !form.done })}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row gap-2 p-2"
              onPress={() => setForm({ ...form, repeat: !form.repeat })}
            >
              <Header2 text="Repeat:" />
              <CheckBox
                bgColor="bg-primary-300"
                borderColor="border-primary-300"
                active={form.repeat}
                onPress={() => setForm({ ...form, repeat: !form.repeat })}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-5 gap-4 items-center">
            <Header1 text="Optional Info" icon="chart-bar" boxStyles="mb-2" />
            <InputField
              placeholder="Notes:"
              icon="script-text-outline"
              onChangeText={(value) => setForm({ ...form, notes: value })}
              value={form.notes}
            />
          </View>
          <CustomButton
            disabled={isSubmitting}
            onPress={submit}
            label={update ? "Update" : "Save"}
            variant="primary-300"
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

export default AddReminder;

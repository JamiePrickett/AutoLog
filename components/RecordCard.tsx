import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Header2 from "./Text/Header2";
import Paragraph from "./Text/Paragraph";
import DataField from "./fields/DataField";
import Header1 from "./Text/Header1";
import { useState } from "react";
import { router } from "expo-router";

const formatDate = (date: string) => {
  const formatDate = new Date(date);
  return formatDate.toLocaleDateString("en-GB");
};

const buttonVariants = (info: any) => {
  switch (info.variant) {
    case "Fuel Up":
      return {
        icon: "fuel",
        iconColor: "#F4743A",
        borderColor: "border-primary-200",
        bgColor: "bg-primary-200",
        data1Label: "Distance:",
        data1: info.mileage - info.previousMileage + " km",
        data2Label: "Fuel Qty:",
        data2: info.fuelQuantity + " L",
        data3Label: "mileage:",
        data3: info.mileage + " km",
        data4Label: "Economy:",
        data4:
          Math.round(
            ((info.mileage - info.previousMileage) / info.fuelQuantity) * 100,
          ) /
            100 +
          " km/L",
        data5Label: "Fuel Price:",
        data5: "$" + info.price,
        data6Label: "Cost:",
        data6: "$" + Math.round(info.fuelQuantity * info.price * 100) / 100,
      };
    case "Expense":
      return {
        icon: "clipboard-text-outline",
        iconColor: "#EF4336",
        borderColor: "border-primary-100",
        bgColor: "bg-primary-100",
        data1Label: "Item:",
        data1: info.expense,
        data2Label: "Price:",
        data2: "$" + info.price,
        data3Label: "Notes:",
        data3: info.notes || "none",
        data4Label: "Due",
        data5Label: "Date:",
        data5: formatDate(info.date),
        data6Label: "Mileage:",
        data6: info.dueMileage ? info.dueMileage + "km" : "none",
      };
    case "Reminder":
      return {
        icon: "car-clock",
        iconColor: "#FBAF40",
        borderColor: "border-primary-300",
        bgColor: "bg-primary-300",
        data1Label: "Reminder:",
        data1: info.reminder,
        data2Label: "Done:",
        data2: info.done ? "Yes" : "No",
        data3Label: "Repeat:",
        data3: info.repeat ? "Yes" : "No",
        data4Label: "Due",
        data5Label: "Date:",
        data5: formatDate(info.date),
        data6Label: "Mileage:",
        data6: info.dueMileage ? info.dueMileage + "km" : "none",
      };
    default:
      return {
        icon: "air-bag",
        iconColor: "#ffffff",
        borderColor: "border-light-200",
        data2Label: "uh oh",
        data2: "uh oh",
        data3Label: "uh oh",
        data3: "uh oh",
        data5Label: "uh oh",
        data5: "uh oh",
        data6Label: "uh oh",
        data6: "uh oh",
      };
  }
};

const RecordCard = ({ info }: any) => {
  const {
    icon,
    iconColor,
    borderColor,
    bgColor,
    data1Label,
    data1,
    data2Label,
    data2,
    data3Label,
    data3,
    data4Label,
    data4,
    data5Label,
    data5,
    data6Label,
    data6,
  } = buttonVariants(info);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(false);
    router.push({
      pathname: `/(root)/${info.variant === "Fuel Up" ? "addFuelUp" : info.variant === "Expense" ? "addExpense" : "addReminder"}`,
      params: { update: info.id },
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className={`flex rounded-2xl mb-5 border ${borderColor}`}
      >
        <View
          className={`flex-row items-center justify-between p-2 border-b ${borderColor}`}
        >
          <Header2
            text={info.variant || "Unknown"}
            icon={icon}
            iconColor={iconColor}
          />
          <Paragraph text={`Date: ${formatDate(info.date)}`} />
        </View>
        <View className="flex-row w-full px-2 gap-3 justify-between">
          <View className="gap-1 items-start flex-1 py-2">
            {data1 ? (
              <DataField label={data1Label} data={data1} />
            ) : (
              <Paragraph text={data1Label || "something"} />
            )}
            <DataField label={data2Label} data={data2} />
            <DataField label={data3Label} data={data3} />
          </View>
          <View className={`${bgColor} flex w-[1px]`} />
          <View className="gap-1 items-start flex-1 py-2">
            {data4 ? (
              <DataField label={data4Label} data={data4} />
            ) : (
              <Paragraph text={data4Label || "something"} />
            )}
            <DataField label={data5Label} data={data5} />
            <DataField label={data6Label} data={data6} />
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => setShowModal(false)}
          className="flex-1"
        >
          <View className="flex-1 items-center pt-40 bg-dark-100/50">
            <View
              onStartShouldSetResponder={() => true}
              className={`bg-dark-200 items-center justify-center mx-5 border rounded-2xl ${borderColor}`}
            >
              <View
                className={`flex-row justify-between w-full p-3 items-center border-b ${borderColor}`}
              >
                <Header1
                  text={info.variant}
                  icon={icon}
                  iconColor={iconColor}
                />
                <View className="flex-row gap-8">
                  <Paragraph text={formatDate(info.date)} />
                  <TouchableOpacity onPress={handleEdit}>
                    <Paragraph text="Edit" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="max-w-[250px] py-3">
                <DataField label={data1Label} data={data1} />
                <DataField label={data2Label} data={data2} />
                <DataField label={data3Label} data={data3} />
                {data4 ? (
                  <DataField label={data4Label} data={data4} />
                ) : (
                  <Header2 text={data4Label || "something"} boxStyles="mt-2" />
                )}
                <DataField label={data5Label} data={data5} />
                <DataField label={data6Label} data={data6} />
                {info.notes ? <Paragraph text={`Notes:\n`} /> : ""}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default RecordCard;

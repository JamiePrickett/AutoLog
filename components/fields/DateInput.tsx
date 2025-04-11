import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  label?: string;
  setValue: (date: string) => void;
};

const DateInput = ({ label = "Date:", setValue }: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      if (mode === "date") {
        setDate(
          new Date(selectedDate.setHours(date.getHours(), date.getMinutes()))
        );
        setMode("time");
      } else if (mode === "time") {
        setDate(
          new Date(
            date.setHours(selectedDate.getHours(), selectedDate.getMinutes())
          )
        );
        setShow(false);
        setMode("date");
      }
      setValue(new Date(date).toISOString());
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setShow(true)}
      className={`flex-row items-center px-4 py-3 gap-3 w-full rounded-full border border-primary-150`}
    >
      <MaterialCommunityIcons name="calendar" size={24} color={"#F4743A"} />
      <Text className="flex-1 font-GeologicaSemiBold text-light-100 text-[16px]">
        {date ? date.toLocaleString() : label}
      </Text>
      {show ? (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default DateInput;

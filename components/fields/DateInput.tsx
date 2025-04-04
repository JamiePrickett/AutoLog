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

const DateInput = ({ label = "Year", setValue }: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setValue(selectedDate.toISOString());
    }
    setShow(false);
  };

  return (
    <TouchableOpacity
      onPress={() => setShow(true)}
      className={`flex-row items-center px-4 py-3 gap-3 w-full rounded-full border border-primary-150`}
    >
      <MaterialCommunityIcons name="calendar" size={24} color={"#F4743A"} />
      <Text className="flex-1 font-GeologicaSemiBold text-light-100 text-[16px]">
        {date ? date.toLocaleDateString() : label}
      </Text>
      {show ? (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          onChange={onChange}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default DateInput;

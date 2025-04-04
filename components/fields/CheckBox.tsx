import { TouchableOpacity, View } from "react-native";
import Paragraph from "../Text/Paragraph";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label?: string;
  bgColor: string;
  borderColor: string;
  active?: boolean;
  rounded?: boolean;
  onPress?: () => void;
};

const CheckBox = ({
  label,
  bgColor,
  borderColor,
  active,
  rounded,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between py-2 gap-2"
      onPress={onPress}
    >
      {label ? <Paragraph text={label} /> : ""}
      <View
        className={`w-6 h-6 border items-center justify-center ${rounded ? "rounded-full" : "rounded-md"} ${borderColor ? borderColor : "border-primary-200"} ${active ? (bgColor ? bgColor : "bg-primary-200") : ""}`}
      >
        {active ? (
          <MaterialCommunityIcons name="check" size={18} color="white" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;

import { LinearGradient } from "expo-linear-gradient";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Props = {
  children?: React.ReactNode;
};

const KeyboardBase = ({ children }: Props) => {
  return (
    <LinearGradient colors={["#060606", "#36281E"]} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default KeyboardBase;

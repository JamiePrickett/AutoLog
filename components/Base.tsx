import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children?: React.ReactNode;
};

const Base = ({ children }: Props) => {
  return (
    <LinearGradient colors={["#060606", "#36281E"]} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default Base;

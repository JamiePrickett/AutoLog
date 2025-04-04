import { logos } from "@/constants";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      source={logos.logoBig}
      className="mt-5 w-[251px] h-[66px]"
      resizeMode="contain"
    />
  );
};

export default Logo;

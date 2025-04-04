import { TouchableOpacity } from "react-native";
import Header1 from "./Text/Header1";

type Props = {
  label: string;
  icon?: string;
  iconColor?: string;
  variant?: string;
  styles?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const CustomButton = ({
  label,
  icon,
  iconColor,
  variant = "primary-300",
  styles,
  onPress,
  disabled,
}: Props) => {
  const buttonVariants = (variant: any) => {
    switch (variant) {
      case "primary-300":
        return {
          textColor: "text-dark-200",
          bgColor: "bg-primary-300",
        };
      case "primary-200":
        return {
          textColor: "text-dark-200",
          bgColor: "bg-primary-200",
        };
      case "outline":
        return {
          textColor: "text-light-100",
          bgColor: "bg-transparent",
          border: "border border-primary-150",
        };
      default:
        return {
          textColor: "text-dark-200",
          bgColor: "bg-primary-300",
        };
    }
  };

  const { textColor, bgColor, border } = buttonVariants(variant);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${bgColor} ${border} ${styles} w-full p-3 rounded-full items-center`}
      activeOpacity={0.5}
    >
      <Header1
        text={label}
        textStyles={textColor}
        icon={icon}
        iconColor={iconColor}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

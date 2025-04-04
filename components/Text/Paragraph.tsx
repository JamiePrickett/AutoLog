import { Text } from "react-native";

const Paragraph = ({
  text,
  styles,
  numOfLines,
}: {
  text: string;
  styles?: string;
  numOfLines?: number;
}) => {
  return (
    <Text
      numberOfLines={numOfLines}
      className={`font-GeologicaSemiBold text-lg ${styles ? styles : "text-light-200"}`}
    >
      {text}
    </Text>
  );
};

export default Paragraph;

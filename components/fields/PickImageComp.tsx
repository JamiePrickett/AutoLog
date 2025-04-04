import { TouchableOpacity, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  image: string;
  setImage: (uri: string) => void;
};

const PickImageComp = ({ image, setImage }: Props) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      className={`w-full border overflow-hidden ${image ? "rounded-3xl" : "rounded-full border-primary-150"}`}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-full aspect-[4/2]"
          resizeMode="contain"
        />
      ) : (
        <View className="flex-row gap-3 pl-4 items-center">
          <MaterialCommunityIcons name="car-wash" size={24} color={"#F4743A"} />

          <Text className="font-GeologicaSemiBold text-light-100 text-xl p-3">
            Image
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PickImageComp;

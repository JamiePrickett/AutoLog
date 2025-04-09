import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header2 from "../Text/Header2";
import { useState } from "react";

type Props = {
  image: string;
  setImage: (uri: string) => void;
};

const PickImageComp = ({ image, setImage }: Props) => {
  const [imageModal, setImageModal] = useState(false);

  const pickImage = async () => {
    setImageModal(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    setImageModal(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setImageModal(true)}
      className={`w-full border overflow-hidden ${image ? "rounded-3xl" : "rounded-full border-primary-150"}`}
    >
      {image ? (
        <View className="w-full aspect-[4/2]">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="contain"
          ></Image>
          <TouchableOpacity
            className="absolute top-2 right-2"
            onPress={() => setImage("")}
          >
            <MaterialCommunityIcons
              name="close-circle"
              color="#EF4336"
              size={24}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row gap-3 pl-4 items-center">
          <MaterialCommunityIcons name="car-wash" size={24} color={"#F4743A"} />

          <Text className="font-GeologicaSemiBold text-light-100 text-xl p-3">
            Image
          </Text>
        </View>
      )}
      <Modal visible={imageModal} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setImageModal(false)}>
          <View className="flex-1">
            <View className="bottom-0 flex-row absolute justify-center gap-8 bg-dark-200 w-full py-16 rounded-t-3xl">
              <TouchableOpacity
                className="p-4 border border-dark-100 bg-dark-300 rounded-3xl"
                onPress={pickImage}
              >
                <Header2 text="Image" icon="image-outline" />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 border border-dark-100 bg-dark-300 rounded-3xl"
                onPress={openCamera}
              >
                <Header2 text="Camera" icon="camera" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
};

export default PickImageComp;

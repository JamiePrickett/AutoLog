import { Image, ImageSourcePropType, View } from "react-native";
import Header1 from "./Text/Header1";
import Paragraph from "./Text/Paragraph";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { MutableRefObject } from "react";
import Swiper from "react-native-swiper";

type Props = {
  heading: string;
  icon1?: any;
  text: string;
  source: ImageSourcePropType;
  finalSlide?: boolean;
  swiperRef?: MutableRefObject<Swiper | null>;
};

const OnboardingComponent = ({
  heading,
  icon1,
  text,
  source,
  finalSlide,
  swiperRef,
}: Props) => {
  return (
    <View className="w-full items-center gap-8 px-[20px]">
      <Header1 text={heading} icon={icon1} />
      <View className="w-[80%] h-20">
        <Paragraph text={text} styles="text-light-200 text-center" />
      </View>
      <Image
        source={source}
        className="w-[251px] h-[251px] border-4 border-primary-100 rounded-2xl"
        resizeMode="cover"
      />
      <CustomButton
        onPress={() =>
          finalSlide
            ? router.replace("/(auth)/sign-in")
            : swiperRef?.current?.scrollBy(1)
        }
        label={finalSlide ? "Get Started" : "Next"}
        styles="mt-8"
        variant={finalSlide ? "primary-200" : "primary-300"}
      />
    </View>
  );
};

export default OnboardingComponent;

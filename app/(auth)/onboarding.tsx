import { useRef } from "react";
import OnboardingComponent from "@/components/OnboardingComponent";
import { images } from "@/constants";
import Swiper from "react-native-swiper";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/images/Logo";
import Base from "@/components/Base";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);

  return (
    <Base>
      <SafeAreaView className="items-center h-full">
        <Logo />
        <Swiper
          contentContainerClassName="mt-[20%]"
          ref={swiperRef}
          loop={false}
          showsPagination
          dot={
            <View className="w-[8px] h-[8px] mx-[2px] bg-primary-250 rounded-full" />
          }
          activeDot={
            <View className="w-[16px] h-[8px] mx-[2px] bg-primary-200 rounded-full" />
          }
        >
          <OnboardingComponent
            //TODO: not to self DONT NAME PROPS of swiper title......
            heading="Welcome to AutoLog"
            text="Keep track of your car's fuel consumption, expenses, and reminders all in one place."
            source={images.onboarding1}
            swiperRef={swiperRef}
          />
          <OnboardingComponent
            heading="Fuel & Expense Tracking"
            icon1="fuel"
            text="Log fuel, repairs, and other costs in one place."
            source={images.onboarding2}
            swiperRef={swiperRef}
          />
          <OnboardingComponent
            heading="Set Reminders"
            icon1="car-clock"
            text="Keep track of your car's fuel consumption, expenses, and reminders all in one place."
            source={images.onboarding3}
            swiperRef={swiperRef}
          />
          <OnboardingComponent
            heading="View Insights"
            icon1="chart-bar"
            text="Get useful stats to about your vehicle's performance and history."
            source={images.onboarding4}
            finalSlide={true}
          />
        </Swiper>
      </SafeAreaView>
    </Base>
  );
};

export default Onboarding;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

const TabIcon = ({
  icon,
  label,
  focused,
}: {
  icon: any;
  label: string;
  focused: boolean;
}) => {
  if (focused) {
    return (
      <View className="flex-row gap-2 min-w-[120px] min-h-[60px] justify-center items-center rounded-full bg-dark-200">
        <MaterialCommunityIcons name={icon} size={24} color={"#F4743A"} />
        <Text className="text-xl font-GeologicaSemiBold text-primary-200">
          {label}
        </Text>
      </View>
    );
  } else {
    return (
      <View className="items-center w-[65px] justify-center">
        <MaterialCommunityIcons name={icon} size={24} color={"#201913"} />
        <Text className="text-dark-200 font-GeologicaLight">{label}</Text>
      </View>
    );
  }
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FBAF40",
          paddingHorizontal: 20,
          height: 90,
          paddingTop: 20,
          borderColor: "#FBAF40",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Home" icon="car" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label="Timeline"
              icon="chart-timeline-variant"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Stats" icon="chart-bar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Config" icon="car-cog" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

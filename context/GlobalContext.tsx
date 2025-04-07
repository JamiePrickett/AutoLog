import {
  auth,
  fetchActiveVehicleData,
  fetchVehicles,
} from "@/config/firebaseConfig";
import {
  expenseData,
  fuelUpData,
  reminderData,
  vehicleData,
} from "@/types/writeData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  user: User | null;
  vehicles: vehicleData[];
  activeVehicle: vehicleData | null;
  setActiveVehicle: (vehicle: vehicleData | null) => void;
  activeVehicleData: {
    fuelUps: fuelUpData[];
    expenses: expenseData[];
    reminders: reminderData[];
  };
  setActiveVehicleData: (data: {
    fuelUps: fuelUpData[];
    expenses: expenseData[];
    reminders: reminderData[];
  }) => void;
  filters: {
    fuelUps: boolean;
    expenses: boolean;
    reminders: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      fuelUps: boolean;
      expenses: boolean;
      reminders: boolean;
    }>
  >;
  units: {
    distance: "km" | "mi";
    fuel: "L" | "gal (US)" | "gal (UK)";
    economy: "L/100km" | "mpg (US)" | "mpg (UK)";
  };
  setUnits: React.Dispatch<
    React.SetStateAction<{
      distance: "km" | "mi";
      fuel: "L" | "gal (US)" | "gal (UK)";
      economy: "L/100km" | "mpg (US)" | "mpg (UK)";
    }>
  >;
  fetchUserVehicles: () => void;
  handleFetchActiveVehicleData: (vehicleId: string) => Promise<void>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<vehicleData[]>([]);
  const [activeVehicle, setActiveVehicle] = useState<vehicleData | null>(null);
  const [activeVehicleData, setActiveVehicleData] = useState<{
    fuelUps: fuelUpData[];
    expenses: expenseData[];
    reminders: reminderData[];
  }>({
    fuelUps: [],
    expenses: [],
    reminders: [],
  });
  const [filters, setFilters] = useState({
    fuelUps: true,
    expenses: true,
    reminders: true,
  });
  const [units, setUnits] = useState({
    distance: "km" as "km" | "mi",
    fuel: "L" as "L" | "gal (US)" | "gal (UK)",
    economy: "L/100km" as "L/100km" | "mpg (US)" | "mpg (UK)",
  });

  useEffect(() => {
    const fetchPersistedData = async () => {
      const storedVehicles = await AsyncStorage.getItem("vehicles");
      const storedActiveVehicle = await AsyncStorage.getItem("activeVehicle");
      const storedUnits = await AsyncStorage.getItem("units");
      const storedFilters = await AsyncStorage.getItem("filters");

      if (storedVehicles) {
        setVehicles(JSON.parse(storedVehicles));
      }
      if (storedActiveVehicle) {
        setActiveVehicle(JSON.parse(storedActiveVehicle));
      }
      if (storedUnits) {
        setUnits(JSON.parse(storedUnits));
      }
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }
    };

    fetchPersistedData();
  }, []);

  useEffect(() => {
    const persistData = async () => {
      await AsyncStorage.setItem("vehicles", JSON.stringify(vehicles));
      await AsyncStorage.setItem(
        "activeVehicle",
        JSON.stringify(activeVehicle),
      );
      await AsyncStorage.setItem("units", JSON.stringify(units));
      await AsyncStorage.setItem("filters", JSON.stringify(filters));
    };

    persistData();
  }, [vehicles, activeVehicle, units, filters]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (!authUser) {
        setVehicles([]);
        setActiveVehicle(null);
        setActiveVehicleData({ fuelUps: [], expenses: [], reminders: [] });
      } else {
        await fetchUserVehicles();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserVehicles = async () => {
    if (!user) return;
    try {
      const fetchedVehicles = await fetchVehicles();
      if (!fetchedVehicles) return;
      setVehicles(fetchedVehicles);

      if (!activeVehicle && fetchedVehicles.length > 0) {
        setActiveVehicle(fetchedVehicles[0]);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleFetchActiveVehicleData = async (vehicleId: string) => {
    try {
      const vehicleData = await fetchActiveVehicleData(vehicleId);
      setActiveVehicleData(
        vehicleData || { fuelUps: [], expenses: [], reminders: [] },
      );
    } catch (error) {
      console.error("Error fetching active vehicle data:", error);
    }
  };

  useEffect(() => {
    if (activeVehicle) {
      handleFetchActiveVehicleData(activeVehicle.id!);
    }
  }, [activeVehicle]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        vehicles,
        activeVehicle,
        setActiveVehicle,
        activeVehicleData,
        setActiveVehicleData,
        filters,
        setFilters,
        units,
        setUnits,
        fetchUserVehicles,
        handleFetchActiveVehicleData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

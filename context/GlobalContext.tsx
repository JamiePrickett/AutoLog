import {
  auth,
  fetchActiveVehicleData,
  fetchVehicles,
} from "@/config/firebaseFunctions";
import {
  expenseData,
  fuelUpData,
  reminderData,
  vehicleData,
} from "@/types/writeData";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
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
  handleFetchUserVehicles: () => void;
  handleFetchActiveVehicleData: (vehicleId: string) => Promise<void>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const hasInitialized = useRef(false);
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

  // // fetch persisted data from AsyncStorage on mount
  // useEffect(() => {
  //   console.log("fetch persisted data called");
  //   const fetchPersistedData = async () => {
  //     const storedVehicles = await AsyncStorage.getItem("vehicles");
  //     const storedActiveVehicle = await AsyncStorage.getItem("activeVehicle");
  //     const storedUnits = await AsyncStorage.getItem("units");
  //     const storedFilters = await AsyncStorage.getItem("filters");

  //     if (storedVehicles) {
  //       setVehicles(JSON.parse(storedVehicles));
  //     }
  //     if (storedActiveVehicle) {
  //       setActiveVehicle(JSON.parse(storedActiveVehicle));
  //     }
  //     if (storedUnits) {
  //       setUnits(JSON.parse(storedUnits));
  //     }
  //     if (storedFilters) {
  //       setFilters(JSON.parse(storedFilters));
  //     }
  //   };

  //   fetchPersistedData();
  // }, []);

  // // persist data to AsyncStorage
  // useEffect(() => {
  //   console.log("persist data called");
  //   const persistData = async () => {
  //     await AsyncStorage.setItem("vehicles", JSON.stringify(vehicles));
  //     await AsyncStorage.setItem(
  //       "activeVehicle",
  //       JSON.stringify(activeVehicle)
  //     );
  //     await AsyncStorage.setItem("units", JSON.stringify(units));
  //     await AsyncStorage.setItem("filters", JSON.stringify(filters));
  //   };

  //   persistData();
  // }, [vehicles, activeVehicle, units, filters]);

  // Auth state change listener
  useEffect(() => {
    console.log("auth state change listener called");
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (!authUser) {
        setVehicles([]);
        setActiveVehicle(null);
        setActiveVehicleData({ fuelUps: [], expenses: [], reminders: [] });
      } else {
        await initializeData();
      }
    });

    return () => unsubscribe();
  }, []);

  // initializeData function
  const initializeData = async () => {
    console.log("initialize data called");

    try {
      const fetchedVehicles = await fetchVehicles();
      if (!fetchedVehicles) return;

      setVehicles(fetchedVehicles);

      if (fetchedVehicles.length > 0) {
        const firstVehicle = fetchedVehicles[0];
        setActiveVehicle(firstVehicle);

        const vehicleData = await fetchActiveVehicleData(firstVehicle.id!);

        setActiveVehicleData(
          vehicleData || { fuelUps: [], expenses: [], reminders: [] }
        );
      }

      hasInitialized.current = true;
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };

  // Fetch vehicles from Firebase
  const handleFetchUserVehicles = async () => {
    console.log("fetch vehicles called");
    if (!user) return;
    try {
      const fetchedVehicles = await fetchVehicles();
      if (!fetchedVehicles) return;

      setVehicles(fetchedVehicles);

      if (!activeVehicle && fetchedVehicles.length > 0) {
        setActiveVehicle(fetchedVehicles[0]);
      } else if (activeVehicle) {
        const existingVehicle = fetchedVehicles.find(
          (vehicle) => vehicle.id === activeVehicle.id
        );
        setActiveVehicle(existingVehicle || null);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // Fetch active vehicle data from Firebase
  const handleFetchActiveVehicleData = async (vehicleId: string) => {
    console.log("fetch active vehicle data called");
    try {
      const vehicleData = await fetchActiveVehicleData(vehicleId);
      setActiveVehicleData(
        vehicleData || { fuelUps: [], expenses: [], reminders: [] }
      );
    } catch (error) {
      console.error("Error fetching active vehicle data:", error);
    }
  };

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
        handleFetchUserVehicles,
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

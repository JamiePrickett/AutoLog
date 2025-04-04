import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  //@ts-ignore
  getReactNativePersistence,
  signOut,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  expenseData,
  fuelUpData,
  reminderData,
  vehicleData,
} from "@/types/writeData";
import { router } from "expo-router";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8Xe_kiHHwBEOiml2E5vaiZ6RswFdjKYc",
  authDomain: "autolog-jp.firebaseapp.com",
  projectId: "autolog-jp",
  storageBucket: "autolog-jp.firebasestorage.app",
  messagingSenderId: "63782708456",
  appId: "1:63782708456:web:04941f8230586f96f8d55d",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const noUser = () => {
  console.log("No user logged in");
  router.replace("/(auth)/onboarding");
};

export const createUser = async (email: string, password: string) => {
  console.log("createUser called\n\n");
  try {
    const signedInUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = signedInUser.user;

    console.log(`User created with UID: ${user.uid}`);
    // const signedInUser = await signInEmailPassword(email, password);

    return user;
  } catch (error) {
    console.error("Error Creating account:", error);
  }
};

export const signInEmailPassword = async (email: string, password: string) => {
  console.log("signInEmailPassword called\n\n");
  try {
    const signedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = signedInUser.user;

    console.log(`User signed in with UID: ${user.uid}`);

    return user;
  } catch (error) {
    console.error("Error Signing In:", error);
  }
};

export const signUserOut = async () => {
  console.log("signUserOut called\n\n");
  try {
    await signOut(auth);
    router.replace("/sign-in");
    console.log("signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const writeVehicle = async (vehicleData: vehicleData) => {
  console.log("writeVehicle called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const vehicleRef = collection(db, "users", user.uid, "vehicles");
    await addDoc(vehicleRef, vehicleData);

    console.log(`Vehicle added with name: ${vehicleData.vehicleName}`);
  } catch (error) {
    console.error("Error writing vehicleData:", error);
  }
};

export const updateVehicle = async (
  vehicleData: vehicleData,
  vehicleId: string
) => {
  console.log("updateVehicle called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const vehicleDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    await updateDoc(vehicleDocRef, vehicleData);

    console.log("Vehicle updated with ID:", vehicleId);
  } catch (error) {
    console.error("Error updating vehicleData:", error);
  }
};

export const deleteVehicle = async (vehicleId: string) => {
  console.log("deleteVehicle called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const vehicleDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    await deleteDoc(vehicleDocRef);

    console.log(`Vehicle Doc: ${vehicleId} deleted`);
  } catch (error) {
    console.error("Error deleting Vehicle:", error);
  }
};

export const writeRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordData: fuelUpData | expenseData | reminderData
) => {
  console.log("writeRecord called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const RecordRef = collection(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType
    );

    await addDoc(RecordRef, recordData);

    const vehicleRef = doc(db, "users", user.uid, "vehicles", vehicleId);
    {
      recordType === "fuelUps" //@ts-ignore
        ? await updateDoc(vehicleRef, { mileage: recordData.mileage })
        : "";
    }
  } catch (error) {
    console.error(`Error writing ${recordType}:`, error);
  }
};

export const updateRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordId: string,
  updatedData: fuelUpData | expenseData | reminderData
) => {
  console.log("updateRecord called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const RecordRef = doc(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType,
      recordId
    );

    await updateDoc(RecordRef, updatedData);
  } catch (error) {
    console.error(`Error updating ${recordType}:`, error);
  }
};

export const deleteRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordId: string
) => {
  console.log("deleteRecord called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const recordRef = doc(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType,
      recordId
    );

    await deleteDoc(recordRef);
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};

export const fetchVehicles = async () => {
  console.log("fetchVehicles called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return [];
    }
    const vehicleRef = collection(db, "users", user.uid, "vehicles");
    const vehicleSnapshot = await getDocs(vehicleRef);

    const vehicles = vehicleSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as vehicleData[];

    return vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

export const fetchActiveVehicleData = async (vehicleId: string) => {
  console.log("fetchActiveVehicleData called\n\n");
  try {
    const user = auth.currentUser;
    if (!user) {
      noUser();
      return;
    }
    const vehicleIdDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    const fuelUpsRef = collection(vehicleIdDocRef, "fuelUps");
    const expensesRef = collection(vehicleIdDocRef, "expenses");
    const remindersRef = collection(vehicleIdDocRef, "reminders");

    if (!fuelUpsRef || !expensesRef || !remindersRef) {
      console.error(
        `Missing Ref, fuelUpRef: ${fuelUpsRef}, expensesRef: ${expensesRef}, remindersRef: ${remindersRef}`
      );
      return;
    }

    const queries = [
      getDocs(query(fuelUpsRef, orderBy("date", "desc"))),
      getDocs(query(expensesRef, orderBy("date", "desc"))),
      getDocs(query(remindersRef, orderBy("date", "desc"))),
    ];
    const [fuelUpsSnapshot, expensesSnapshot, remindersSnapshot] =
      await Promise.all(queries);

    const formatDoc = <type>(doc: any): type => ({ id: doc.id, ...doc.data() });

    return {
      fuelUps: fuelUpsSnapshot.docs.map((doc) => formatDoc<fuelUpData>(doc)),
      expenses: expensesSnapshot.docs.map((doc) => formatDoc<expenseData>(doc)),
      reminders: remindersSnapshot.docs.map((doc) =>
        formatDoc<reminderData>(doc)
      ),
    };
  } catch (error) {
    console.error("Error fetching active vehicle data:", error);
    return;
  }
};

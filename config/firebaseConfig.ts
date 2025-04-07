import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  initializeFirestore,
  onSnapshot,
  orderBy,
  persistentLocalCache,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  // @ts-ignore
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
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("No user logged in");
    router.replace("/(auth)/onboarding");
    return null;
  }
  return user;
};

export const createUser = async (email: string, password: string) => {
  console.log("createUser called\n\n");
  try {
    const currentUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    console.log(`User created with UID: ${currentUser.user.uid}`);

    return currentUser.user;
  } catch (error) {
    console.error("Error Creating account:", error);
  }
};

export const signInEmailPassword = async (email: string, password: string) => {
  console.log("signInEmailPassword called\n\n");
  try {
    const currentUser = await signInWithEmailAndPassword(auth, email, password);

    console.log(`User signed in with UID: ${currentUser.user.uid}`);

    return currentUser.user;
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
  const user = getCurrentUser();
  if (!user) return;

  try {
    const vehicleRef = collection(db, "users", user.uid, "vehicles");
    await addDoc(vehicleRef, vehicleData);

    console.log(`Vehicle added with name: ${vehicleData.vehicleName}`);
  } catch (error) {
    console.error("Error writing vehicleData:", error);
  }
};

export const updateVehicle = async (
  vehicleData: vehicleData,
  vehicleId: string,
) => {
  console.log("updateVehicle called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const vehicleDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    await updateDoc(vehicleDocRef, vehicleData);

    console.log("Vehicle updated with ID:", vehicleId);
  } catch (error) {
    console.error("Error updating vehicle:", error);
  }
};

export const deleteVehicle = async (vehicleId: string) => {
  console.log("deleteVehicle called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const vehicleDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    await deleteDoc(vehicleDocRef);

    console.log(`Vehicle Deleted: ${vehicleId}`);
  } catch (error) {
    console.error("Error deleting Vehicle:", error);
  }
};

export const writeRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordData: fuelUpData | expenseData | reminderData,
) => {
  console.log("writeRecord called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const RecordRef = collection(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType,
    );

    await addDoc(RecordRef, recordData);

    if (recordType === "fuelUps") {
      const vehicleRef = doc(db, "users", user.uid, "vehicles", vehicleId);

      if (recordType === "fuelUps" && "mileage" in recordData) {
        await updateDoc(vehicleRef, {
          mileage: recordData.mileage,
        });
      }
    }

    console.log(`Record added: ${recordType}`);
  } catch (error) {
    console.error(`Error writing ${recordType}:`, error);
  }
};

export const updateRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordId: string,
  updatedData: fuelUpData | expenseData | reminderData,
) => {
  console.log("updateRecord called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const RecordRef = doc(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType,
      recordId,
    );

    await updateDoc(RecordRef, updatedData);
    console.log(`Record updated: ${recordType}`);
  } catch (error) {
    console.error(`Error updating ${recordType}:`, error);
  }
};

export const deleteRecord = async (
  vehicleId: string,
  recordType: "fuelUps" | "expenses" | "reminders",
  recordId: string,
) => {
  console.log("deleteRecord called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const recordRef = doc(
      db,
      "users",
      user.uid,
      "vehicles",
      vehicleId,
      recordType,
      recordId,
    );

    await deleteDoc(recordRef);
    console.log(`Record deleted: ${recordType}`);
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};

export const fetchVehicles = async () => {
  console.log("fetchVehicles called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const vehicleRef = collection(db, "users", user.uid, "vehicles");
    const vehicleSnapshot = await getDocs(vehicleRef);

    return vehicleSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as vehicleData[];
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

export const fetchActiveVehicleData = async (vehicleId: string) => {
  console.log("fetchActiveVehicleData called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  try {
    const vehicleIdDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

    const fuelUpsRef = collection(vehicleIdDocRef, "fuelUps");
    const expensesRef = collection(vehicleIdDocRef, "expenses");
    const remindersRef = collection(vehicleIdDocRef, "reminders");

    const [fuelUps, expenses, reminders] = await Promise.all([
      getDocs(query(fuelUpsRef, orderBy("date", "desc"))),
      getDocs(query(expensesRef, orderBy("date", "desc"))),
      getDocs(query(remindersRef, orderBy("date", "desc"))),
    ]);

    const formatDoc = <type>(doc: any): type => ({ id: doc.id, ...doc.data() });

    return {
      fuelUps: fuelUps.docs.map((doc) => formatDoc<fuelUpData>(doc)),
      expenses: expenses.docs.map((doc) => formatDoc<expenseData>(doc)),
      reminders: reminders.docs.map((doc) => formatDoc<reminderData>(doc)),
    };
  } catch (error) {
    console.error("Error fetching active vehicle data:", error);
    return;
  }
};

export const listenToVehicles = (
  callback: (vehicles: vehicleData[]) => void,
) => {
  console.log("listenToVehicles called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  const vehicleRef = collection(db, "users", user.uid, "vehicles");

  const unsubscribe = onSnapshot(vehicleRef, (snapshot) => {
    const vehicles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as vehicleData[];

    callback(vehicles);
  });
  return unsubscribe;
};

export const listenToActiveVehicleData = (
  vehicleId: string,
  callback: (data: {
    fuelUps: fuelUpData[];
    expenses: expenseData[];
    reminders: reminderData[];
  }) => void,
) => {
  console.log("listenToActiveVehicleData called\n\n");
  const user = getCurrentUser();
  if (!user) return;

  const vehicleIdDocRef = doc(db, "users", user.uid, "vehicles", vehicleId);

  const fuelUpsRef = collection(vehicleIdDocRef, "fuelUps");
  const expensesRef = collection(vehicleIdDocRef, "expenses");
  const remindersRef = collection(vehicleIdDocRef, "reminders");

  const fuelUpsQuery = query(fuelUpsRef, orderBy("date", "desc"));
  const expensesQuery = query(expensesRef, orderBy("date", "desc"));
  const remindersQuery = query(remindersRef, orderBy("date", "desc"));

  const unsubscribeFuelUps = onSnapshot(fuelUpsQuery, (snapshot) => {
    const fuelUps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as fuelUpData[];

    callback({ fuelUps, expenses: [], reminders: [] });
  });

  const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as expenseData[];

    callback({ fuelUps: [], expenses, reminders: [] });
  });

  const unsubscribeReminders = onSnapshot(remindersQuery, (snapshot) => {
    const reminders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as reminderData[];

    callback({ fuelUps: [], expenses: [], reminders });
  });

  return () => {
    unsubscribeFuelUps();
    unsubscribeExpenses();
    unsubscribeReminders();
  };
};

export type vehicleData = {
  id?: string;
  vehicleName: string;
  mileage: number;
  make?: string;
  model?: string;
  year?: number;
  fuelType?: string;
  image?: string;
  notes?: string;
};

export type fuelUpData = {
  id?: string;
  date: string;
  mileage: number;
  fuelQuantity: number;
  price: number;
  notes?: string;
};

export type expenseData = {
  id?: string;
  date: string;
  dueMileage: number;
  expense: string;
  price: number;
  notes?: string;
};

export type reminderData = {
  id?: string;
  date: string;
  dueMileage: number;
  reminder: string;
  done?: boolean;
  repeat?: boolean;
  notes?: string;
};

export const convertDistance = (
  distance: number,
  unit: "km" | "mi"
): string => {
  if (unit === "mi") {
    return `${Math.round((distance / 1.60934) * 100) / 100}`;
  }
  return `${Math.round(distance * 100) / 100}`;
};

export const convertFuel = (
  fuel: number,
  unit: "L" | "gal (US)" | "gal (UK)"
): string => {
  if (unit === "gal (US)") {
    return `${Math.round((fuel / 3.78541) * 100) / 100}`;
  } else if (unit === "gal (UK)") {
    return `${Math.round((fuel / 4.54609) * 100) / 100}`;
  }
  return `${Math.round(fuel * 100) / 100}`;
};

export const convertEconomy = (
  economy: number,
  unit: "L/100km" | "mpg (US)" | "mpg (UK)"
): string => {
  if (unit === "mpg (US)") {
    return `${Math.round((235.215 / economy) * 100) / 100}`;
  } else if (unit === "mpg (UK)") {
    return `${Math.round((282.481 / economy) * 100) / 100}`;
  }
  return `${Math.round(economy * 100) / 100}`;
};

export const convertToLitre = (
  fuel: number,
  unit: "L" | "gal (US)" | "gal (UK)"
): number => {
  if (unit === "gal (US)") {
    return Math.round(fuel * 3.78541);
  } else if (unit === "gal (UK)") {
    return Math.round(fuel * 4.54609);
  }
  return fuel;
};

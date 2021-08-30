import { QueryFilter } from "./CommonSpec";

interface FoodItemSpec {
  id: string;
  name: string;
  description: string;
  image?: string;
  kcal: number;
  fat: number;
  sugar: number;
  carbs: number;
  protein: number;
  fiber: number;
  water: number;
}

export enum MeasurementType {
  VOLUME = "VOLUME",
  MASS = "MASS",
  INTEGRAL_QUANTITY = "INTEGRAL_QUANTITY",
}

export interface CreateMealConstituentRequestSpec {
  measurementType: MeasurementType;
  amount: number;
  optional: boolean;
  foodItem: string;
}

export interface FetchMealConstituentsResponseSpec {
  id: string;
  measurementType: MeasurementType;
  amount: number;
  optional: boolean;
  foodItem: FoodItemSpec;
}

export interface UpdateMealConstituentRequestSpec {
  id: string;
  measurementType?: MeasurementType;
  amount?: number;
  optional?: boolean;
  foodItem?: string;
}

export interface RemoveMealConstituentRequestSpec {
  id: string;
}

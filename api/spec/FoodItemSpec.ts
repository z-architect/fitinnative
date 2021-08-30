import { QueryFilter } from "./CommonSpec";

export interface CreateFoodItemRequestSpec extends FetchFoodItemsResponseSpec {
  custom?: boolean;
}

export interface FetchFoodItemsRequestSpec extends QueryFilter {
  custom?: boolean;
}

export interface FetchFoodItemsResponseSpec {
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

export interface UpdateFoodItemRequestSpec {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  kcal?: number;
  fat?: number;
  sugar?: number;
  carbs?: number;
  protein?: number;
  fiber?: number;
  water?: number;
}

export interface RemoveFoodItemRequestSpec {
  id: string;
}

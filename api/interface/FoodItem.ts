import {
  CreateFoodItemRequestSpec,
  FetchFoodItemsRequestSpec,
  FetchFoodItemsResponseSpec,
  RemoveFoodItemRequestSpec,
  UpdateFoodItemRequestSpec,
} from "../spec/FoodItemSpec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdate,
} from "../utils";

export class FoodItem {
  static async createActivity(data: CreateFoodItemRequestSpec) {
    return requestCreate<CreateFoodItemRequestSpec, string>("/food-item", data);
  }

  static async fetchActivities(params: FetchFoodItemsRequestSpec) {
    return requestFetch<FetchFoodItemsResponseSpec[]>("/food-item", { params });
  }

  static async updateActivity(data: UpdateFoodItemRequestSpec) {
    return requestUpdate<UpdateFoodItemRequestSpec>("/food-item", data);
  }

  static async removeActivity(params: RemoveFoodItemRequestSpec) {
    return requestDelete("/food-item", { params });
  }
}

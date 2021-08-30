import {
  CreateMealConstituentRequestSpec,
  FetchMealConstituentsResponseSpec,
  RemoveMealConstituentRequestSpec,
  UpdateMealConstituentRequestSpec,
} from "../spec/MealConstituentSpec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdate,
} from "../utils";

export class MealConstituent {
  static async createActivity(data: CreateMealConstituentRequestSpec) {
    return requestCreate<CreateMealConstituentRequestSpec, string>(
      "/meal-constituent",
      data
    );
  }

  static async fetchActivitySets() {
    return requestFetch<FetchMealConstituentsResponseSpec[]>(
      "/meal-constituent"
    );
  }

  static async updateActivity(data: UpdateMealConstituentRequestSpec) {
    return requestUpdate<UpdateMealConstituentRequestSpec>(
      "/meal-constituent",
      data
    );
  }

  static async removeActivity(params: RemoveMealConstituentRequestSpec) {
    return requestDelete("/meal-constituent", { params });
  }
}

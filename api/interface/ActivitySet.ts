import {} from "../spec/ActivitySpec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdate,
} from "../utils";
import {
  CreateActivitySetRequestSpec,
  FetchActivitySetsResponseSpec,
  RemoveActivitySetRequestSpec,
  UpdateActivitySetRequestSpec,
} from "../spec/ActivitySetSpec";

export class ActivitySet {
  static async createActivity(data: CreateActivitySetRequestSpec) {
    return requestCreate<CreateActivitySetRequestSpec, string>(
      "/activity-set",
      data
    );
  }

  static async fetchActivitySets() {
    return requestFetch<FetchActivitySetsResponseSpec[]>("/activity-set");
  }

  static async updateActivitySet(data: UpdateActivitySetRequestSpec) {
    return requestUpdate<UpdateActivitySetRequestSpec>("/activity-set", data);
  }

  static async removeActivitySet(params: RemoveActivitySetRequestSpec) {
    return requestDelete("/activity-set", { params });
  }
}

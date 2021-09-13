import {
  CreateActivityRequestSpec,
  FetchActivitiesRequestSpec,
  FetchActivitiesResponseSpec,
  RemoveActivityRequestSpec,
  UpdateActivityRequestSpec,
} from "../spec/ActivitySpec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdate,
} from "../utils";

export class Activity {
  static async createActivity(data: CreateActivityRequestSpec) {
    return requestCreate<CreateActivityRequestSpec, string>("/activity", data);
  }

  static async fetchActivities(params?: FetchActivitiesRequestSpec) {
    return requestFetch<FetchActivitiesResponseSpec[]>("/activity", { params });
  }

  static async updateActivity(data: UpdateActivityRequestSpec) {
    return requestUpdate<UpdateActivityRequestSpec>("/activity", data);
  }

  static async removeActivity(params: RemoveActivityRequestSpec) {
    return requestDelete("/activity", { params });
  }
}

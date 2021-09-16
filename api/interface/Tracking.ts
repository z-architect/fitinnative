import {
  GetEngagementHistoryRequestSpec,
  GetEngagementHistoryResponseSpec,
  RecordEngagementRequestSpec,
} from "../spec/TrackingSpec";
import { requestCreate, requestFetch } from "../utils";

export class Tracking {
  static async recordEngagement(data: RecordEngagementRequestSpec) {
    return requestCreate<RecordEngagementRequestSpec, string>(
      "/tracking",
      data
    );
  }

  static async getEngagementHistory(params?: GetEngagementHistoryRequestSpec) {
    return requestFetch<GetEngagementHistoryResponseSpec[]>("/tracking", {
      params,
    });
  }
}

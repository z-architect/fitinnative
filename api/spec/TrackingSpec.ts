import { Paging } from "./CommonSpec";
import { FetchSessionResponseSpec } from "./SessionSpec";
import { FetchPlanResponseSpec } from "./PlanSpec";
import { ProfileGetResponseSpec } from "./ProfileSpec";

export interface RecordEngagementRequestSpec {
  caloriesBurned?: number;
  hoursOfSleep?: number;
  glassesOfWater?: number;
  unplanned: boolean;
  plan?: string;
  session?: string;
}

export interface GetEngagementHistoryRequestSpec extends Paging {}

export interface GetEngagementHistoryResponseSpec {
  id: string;
  caloriesBurned?: number;
  hoursOfSleep?: number;
  glassesOfWater?: number;
  unplanned: boolean;
  plan?: string | FetchPlanResponseSpec;
  session?: string | FetchSessionResponseSpec;
  user: string | ProfileGetResponseSpec;
}

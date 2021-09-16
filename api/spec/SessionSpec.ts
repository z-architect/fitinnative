import { QueryFilter } from "./CommonSpec";
import { FetchActivitySetsResponseSpec } from "./ActivitySetSpec";
import { ProfileGetResponseSpec } from "./ProfileSpec";

export enum PlanType {
  MEAL = "MEAL",
  WORKOUT = "WORKOUT",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface CreateSessionRequestSpec {
  name: string;
  image?: string;
  type: PlanType;
  description: string;
  recommendedTimeOfDay: number;
  private?: boolean;
  setOrders?: object[];
}

export interface FetchSessionsRequestSpec extends QueryFilter {
  private?: boolean;
  type?: PlanType;
}

export interface FetchSessionsResponseSpec {
  id: string;
  name: string;
  image?: string;
  type: PlanType;
  description: string;
  duration?: number;
  caloriesToBurn?: number;
  recommendedTimeOfDay: number;
  private?: boolean;
  createdBy?: ProfileGetResponseSpec | string;
}

export interface FetchSetOrdersRequestSpec {
  id: string;
}

export interface FetchSetOrdersResponseSpec {
  setOrders: {
    order: number;
    set: FetchActivitySetsResponseSpec | FetchSetOrdersRequestSpec | string; // TODO replace the second one with meal counterpart
  }[];
}

export interface FetchSessionRequestSpec {
  id: string;
  private?: boolean;
}

export interface FetchSessionResponseSpec
  extends FetchSessionsResponseSpec,
    FetchSetOrdersResponseSpec {}

export interface UpdateSessionRequestSpec {
  id: string;
  name?: string;
  image?: string;
  description?: string;
  recommendedTimeOfDay?: number;
  private?: boolean;
  setOrders?: object[];
}

export interface RemoveSessionRequestSpec {
  id: string;
}

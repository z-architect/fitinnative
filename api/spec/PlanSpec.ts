import { Goal } from "./AccessSpec";
import { QueryFilter } from "./CommonSpec";
import { FetchActivitySetsResponseSpec } from "./ActivitySetSpec";
import {
  FetchSessionsResponseSpec,
  FetchSetOrdersRequestSpec,
} from "./SessionSpec";

export enum PlanType {
  MEAL = "MEAL",
  WORKOUT = "WORKOUT",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface CreatePlanRequestSpec {
  image?: string;
  type: PlanType;
  category: Goal;
  difficulty: Difficulty;
  title: string;
  description: string;
  private: boolean;
  sessionIntervals?: object[];
}

export interface FetchPlansRequestSpec extends QueryFilter {
  private?: boolean;
  type?: PlanType;
  category?: Goal;
  difficulty?: Difficulty;
}

export interface FetchPlansResponseSpec {
  id: string;
  image?: string;
  type: PlanType;
  category: Goal;
  difficulty: Difficulty;
  title: string;
  description: string;
  private: boolean;
  createdBy?: boolean;
}

export interface FetchSessionIntervalsRequestSpec {
  id: string;
}

export interface FetchSessionIntervalsResponseSpec {
  sessionIntervals: {
    interval: number;
    set: FetchSessionsResponseSpec;
  }[];
}

export interface FetchPlanRequestSpec {
  id: string;
  private: boolean;
}

export interface FetchPlanResponseSpec
  extends FetchPlansResponseSpec,
    FetchSessionIntervalsResponseSpec {}

export interface UpdatePlanRequestSpec {
  id: string;
  image?: string;
  category?: Goal;
  difficulty?: Difficulty;
  title?: string;
  description?: string;
  private?: boolean;
}

export interface RemovePlanRequestSpec {
  id: string;
}

export interface SubscribeToPlanRequestSpec {
  id: string;
  startsOn?: string | Date;
}

export interface FetchPlanSubscriptionsResponseSpec {
  id: string;
  startsOn: string | Date;
  plan: FetchPlansResponseSpec;
}

export interface UpdatePlanSubscriptionRequestSpec {
  id: string;
  startsOn: string | Date;
}

export interface UnsubscribeFromPlanRequestSpec {
  id: string;
}

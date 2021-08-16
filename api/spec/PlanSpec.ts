import { Goal } from "./AccessSpec";
import { QueryFilter } from "./CommonSpec";

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
  type: PlanType;
  category: Goal;
  difficulty: Difficulty;
  title: string;
  description: string;
  private: boolean;
}

export interface FetchPlansRequestSpec extends QueryFilter {
  private: boolean;
  type: PlanType;
  category: Goal;
  difficulty: Difficulty;
}

export interface FetchPlansResponseSpec {
  id: string;
  type: PlanType;
  category: Goal;
  difficulty: Difficulty;
  title: string;
  description: string;
  createdBy: boolean;
}

export interface FetchPlanRequestSpec {
  id: string;
  private: boolean;
}

export interface FetchPlanResponseSpec extends FetchPlansResponseSpec {}

export interface UpdatePlanRequestSpec {
  id: string;
  category?: Goal;
  difficulty?: Difficulty;
  title?: string;
  description?: string;
  private?: boolean;
}

export interface SubscribeToPlanRequestSpec {
  id: string;
  startsOn?: string | Date;
}

export interface GetPlanSubscriptionsResponseSpec {
  // TODO extend planned session
  id: string;
  startsOn: string | Date;
  planSessionInterval: any;
}

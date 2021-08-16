import { QueryFilter } from "./CommonSpec";
import { Goal, Honor, Role, Sex } from "./AccessSpec";

export enum Subscription {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export interface ProfilesGetResponseSpec {
  profilePicture?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  sex: Sex;
  dateOfBirth: string | Date;
  role: Role;
  totalFortitude: number;
  leagueFortitude: number;
  league?: string;
  honor: Honor;
  streak: number;
}

export interface ProfileGetOwnResponseSpec extends ProfileGetResponseSpec {
  id: string;
  subscriptionPlan: Subscription;
  email?: string;
  phoneNumber?: string;
  isFollowingPlan: boolean;
  lastTracked?: string | Date;
  currentGoal?: Goal | null;
  dailyGlassesOfWater: number;
  dailyHoursOfSleep: number;
}

export interface ProfilesGetRequestSpec extends QueryFilter {
  ids?: string[];
}

export interface ProfileGetResponseSpec extends ProfilesGetResponseSpec {}

export interface ProfileUpdateRequestSpec {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  sex?: Sex;
  dateOfBirth?: string | Date;
  profilePicture?: string;
  dailyGlassesOfWater?: number;
  dailyHoursOfSleep?: number;
}

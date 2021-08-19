export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Role {
  TRAINEE = "TRAINEE",
  TRAINER = "TRAINER",
  NUTRITIONIST = "NUTRITIONIST",
  ADMIN = "ADMIN",
}

export enum Honor {
  NOOB = "NOOB",
  AMATEUR = "AMATEUR",
  MONSTER = "MONSTER",
}

export enum Goal {
  ATHLETICISM_ENHANCEMENT = "ATHLETICISM_ENHANCEMENT",
  WEIGHT_LOSS = "WEIGHT_LOSS",
  MASS_GAIN = "MASS_GAIN",
  FITNESS_MAINTENANCE = "FITNESS_MAINTENANCE",
}

export interface SignupRequestSpec {
  firstName?: string;
  middleName?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  sex: Sex;
  dateOfBirth: string | Date;
  role: Role;
}

export interface SignupResponseSpec {
  id: string;
  emailVerified: boolean;
  totalFortitude: number;
  leagueFortitude: number;
  honor: Honor;
  streak: number;
  isFollowingPlan: boolean;
  currentGoal?: Goal | null;
  dailyGlassesOfWater: number;
  dailyHoursOfSleep: number;
}

export interface SigninResponseSpec {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  emailVerified: boolean;
  email?: string;
  phoneNumber?: string;
  sex: Sex;
  dateOfBirth: string | Date;
  role: Role;
  totalFortitude: number;
  leagueFortitude: number;
  honor: Honor;
  streak: number;
  isFollowingPlan: boolean;
  currentGoal?: Goal | null;
  dailyGlassesOfWater: number;
  dailyHoursOfSleep: number;
}

export interface UpdateFCMTokenRequestSpec {
  newFCMToken: string;
}

export interface UpdateInstanceIdRequestSpec {
  newInstanceId: string;
}

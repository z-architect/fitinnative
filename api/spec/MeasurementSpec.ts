import { Paging } from "./CommonSpec";

export interface RecordMeasurementRequestSpec {
  bloodPressure?: number;
  restingHeartRate?: number;
  height?: number;
  mass?: number;
  waistSize?: number;
  hipSize?: number;
  shoulderSize?: number;
  armSize?: number;
  bloodGlucose?: number;
  bmi?: number;
  bodyFat?: number;
  bmr?: number;
  tdee?: number;
  leanMass?: number;
}

export interface FetchMeasurementsResponseSpec
  extends RecordMeasurementRequestSpec {}

export interface FetchMeasurementHistoryRequestSpec extends Paging {}

export interface FetchMeasurementHistoryResponseSpec
  extends RecordMeasurementRequestSpec {}

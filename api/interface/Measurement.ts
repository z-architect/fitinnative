import {
  FetchMeasurementHistoryRequestSpec,
  FetchMeasurementHistoryResponseSpec,
  FetchMeasurementsResponseSpec,
  RecordMeasurementRequestSpec,
} from "../spec/MeasurementSpec";
import { requestCreate, requestFetch } from "../utils";

export class Measurement {
  static async recordMeasurement(data: RecordMeasurementRequestSpec) {
    return requestCreate<RecordMeasurementRequestSpec, string>(
      "/measurement",
      data
    );
  }

  static async fetchMeasurements() {
    return requestFetch<FetchMeasurementsResponseSpec>("/measurement");
  }

  static async fetchMeasurementHistory(
    params: FetchMeasurementHistoryRequestSpec
  ) {
    return requestFetch<FetchMeasurementHistoryResponseSpec[]>(
      "/measurement/history",
      {
        params,
      }
    );
  }
}

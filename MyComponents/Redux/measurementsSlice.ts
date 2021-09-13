import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { FetchMeasurementsResponseSpec } from "../../api/spec/MeasurementSpec";

const EntityName = "measurements";
const DefaultEntityName = "STARTER";

interface MeasurementState extends FetchMeasurementsResponseSpec {
  user: string;
}

interface MeasurementsState {
  currentMeasurement: string;
  measurements: {
    [measurementId: string]: MeasurementState;
  };
}

const initialState: MeasurementsState = {
  currentMeasurement: DefaultEntityName,
  measurements: {
    [DefaultEntityName]: {
      id: DefaultEntityName,
      height: 0,
      mass: 0,
      bmi: 0,
      heartRate: 0,
      bloodPressure: 0,
      waistSize: 0,
      hipSize: 0,
      shoulderSize: 0,
      armSize: 0,
      bloodGlucose: 0,
      bodyFat: 0,
      leanMass: 0,
      bmr: 0,
      tdee: 0,
      latest: true,
      user: DefaultEntityName,
    },
  },
};

export const measurementsSlice = createSlice({
  name: EntityName,
  initialState: initialState,
  reducers: {
    updateMeasurements: (state, action: PayloadAction<MeasurementState>) => {
      if (!!state.currentMeasurement)
        state.measurements[state.currentMeasurement].latest = false;
      state.currentMeasurement = action.payload.id;
      state.measurements[action.payload.id] = { ...action.payload };
    },
  },
});

const persistConfig = {
  key: EntityName,
  storage: AsyncStorage,
};

export const { updateMeasurements } = measurementsSlice.actions;
export default persistReducer<MeasurementsState>(
  persistConfig,
  measurementsSlice.reducer
);

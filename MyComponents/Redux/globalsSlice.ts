import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { PlanType } from "../../api/spec";

const EntityName = "globals";

interface GlobalsState {
  hasBeenOnboarded: boolean;
  chosenPlanType: PlanType;
}

const initialState: GlobalsState = {
  hasBeenOnboarded: false,
  chosenPlanType: PlanType.WORKOUT,
};

export const globalsSlice = createSlice({
  name: EntityName,
  initialState: initialState,
  reducers: {
    updateHasBeenOnboarded: (state) => {
      state.hasBeenOnboarded = true;
    },
    changePlanType: (state, action: PayloadAction<PlanType>) => {
      state.chosenPlanType = action.payload;
    },
  },
});

const persistConfig = {
  key: EntityName,
  storage: AsyncStorage,
  exclude: ["chosenPlanType"],
};

export const { updateHasBeenOnboarded, changePlanType } = globalsSlice.actions;
export default persistReducer<GlobalsState>(
  persistConfig,
  globalsSlice.reducer
);

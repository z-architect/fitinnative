import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  ProfileGetOwnResponseSpec,
  ProfileUpdateRequestSpec,
} from "../../api/spec";

const EntityName = "profiles";
const DefaultEntityName = "STARTER";

export enum AppTheme {
  LIGHT = "LIGHT",
  DIMMED = "DIMMED",
  DARK = "DARK",
}

export enum Language {
  ENGLISH = "en",
  AMHARIC = "am",
  FRENCH = "fr",
}

interface ProfileState {
  user?: ProfileGetOwnResponseSpec;
  signedIn: boolean;
  firstTimeToProfile: boolean;
  firstTimeToGoalSetting: boolean;
  firstTimeToMeasurements: boolean;
  settings?: {
    language: Language;
    theme: AppTheme;
  };
}

interface ProfilesState {
  activeProfile: string;
  profiles: {
    [profileId: string]: ProfileState;
  };
}

const initialState: ProfilesState = {
  activeProfile: DefaultEntityName,
  profiles: {
    [DefaultEntityName]: {
      signedIn: false,
      firstTimeToProfile: true,
      firstTimeToGoalSetting: true,
      firstTimeToMeasurements: true,
      settings: {
        language: Language.ENGLISH,
        theme: AppTheme.LIGHT,
      },
    },
  },
};

export const profilesSlice = createSlice({
  name: EntityName,
  initialState: initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{ user: ProfileGetOwnResponseSpec }>
    ) => {
      state.profiles[action.payload.user.id] = {
        ...initialState.profiles[DefaultEntityName],
        signedIn: true,
        user: action.payload.user,
      };
      state.activeProfile = action.payload.user.id;
    },
    logIn: (
      state,
      action: PayloadAction<{ user: ProfileGetOwnResponseSpec }>
    ) => {
      state.profiles[action.payload.user.id] = {
        ...(state.profiles[action.payload.user.id] ||
          initialState.profiles[DefaultEntityName]),
        signedIn: true,
        firstTimeToProfile: false,
        firstTimeToGoalSetting: false,
        firstTimeToMeasurements: false,
        user: action.payload.user,
      };
      state.activeProfile = action.payload.user.id;
    },
    signOut: (state) => {
      console.log("I do get here.");
      state.profiles[state.activeProfile].signedIn = false;
      state.activeProfile = DefaultEntityName;
    },
    updateFirstTimeToProfile: (state) => {
      state.profiles[state.activeProfile].firstTimeToProfile = false;
    },
    updateFirstTimeToGoalSetting: (state) => {
      state.profiles[state.activeProfile].firstTimeToGoalSetting = false;
    },
    updateFirstTimeToMeasurements: (state) => {
      state.profiles[state.activeProfile].firstTimeToMeasurements = false;
    },
    changeLanguage: (state, action: PayloadAction<Language>) => {
      // @ts-ignore
      state.profiles[state.activeProfile].settings.language = action.payload;
    },
    changeTheme: (state, action: PayloadAction<AppTheme>) => {
      // @ts-ignore
      state.profiles[state.activeProfile].settings.theme = action.payload;
    },
    updateProfileState: (
      state,
      action: PayloadAction<ProfileUpdateRequestSpec>
    ) => {
      state.profiles[state.activeProfile].user = {
        ...(state.profiles[state.activeProfile]
          .user as ProfileGetOwnResponseSpec),
        ...(action.payload as ProfileGetOwnResponseSpec),
      };
    },
    removeProfile: (state) => {
      delete state.profiles[state.activeProfile];
      state.activeProfile = DefaultEntityName;
    },
  },
});

const persistConfig = {
  key: EntityName,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

export const {
  register,
  logIn,
  signOut,
  updateProfileState,
  removeProfile,
  updateFirstTimeToProfile,
  updateFirstTimeToGoalSetting,
  updateFirstTimeToMeasurements,
  changeLanguage,
  changeTheme,
} = profilesSlice.actions;
export default persistReducer<ProfilesState>(
  persistConfig,
  profilesSlice.reducer
);

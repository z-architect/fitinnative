import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import profilesReducer from "./profilesSlice";
import globalsReducer from "./globalsSlice";
import measurementsReducer from "./measurementsSlice";

export const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      profiles: profilesReducer,
      globals: globalsReducer,
      measurements: measurementsReducer,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false /*{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },*/,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

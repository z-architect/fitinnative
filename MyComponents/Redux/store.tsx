import { configureStore } from "@reduxjs/toolkit"
import { useStore } from "react-redux";
import profileReducer from './profileSlice';

const store = configureStore({
    reducer: {
        profile: profileReducer,
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
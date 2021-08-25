import { createSlice } from "@reduxjs/toolkit";

interface profileState {
    signedIn: boolean
}

const profileState: profileState = {
    signedIn: false
}
// Workaround: cast state instead of declaring variable type
// const initialState = {
//     value: 0,
//   } as CounterState


//{
//    id:"",
//    firstName:"",
//    lastName:"",
//    type:"",

//    isFollowingPlan:false,
//    currentGoal:"",
//    dailyGlassesOfWater: 0,
//    dailyHoursOfSleep: 0,

//signedIn: true

//},
export const profileSlice = createSlice({
    name: 'profile',
    initialState: profileState,
    reducers: {
        logIn: (state) => {
            state.signedIn = true;
        },
        signOut: (state) => {
            state.signedIn = false;
        }
    }

})
export const { logIn, signOut } = profileSlice.actions;


export default profileSlice.reducer;
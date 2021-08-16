import { createSlice } from "@reduxjs/toolkit";

interface userState {
    signedIn: boolean
}

const UserState: userState = {
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

signedIn: true

//},
export const userSlice = createSlice({
    name: 'user',
    initialState: UserState,
    reducers: {
        logIn: (state) => {
            state.signedIn = true;
        },
        signOut: (state) => {
            state.signedIn = false;
        }
    }

})
export const { logIn, signOut } = userSlice.actions;


export default userSlice.reducer;
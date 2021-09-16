import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { persistStore } from "redux-persist";
import { RootStackParamList } from "./MyComponents/types";
import { useAppDispatch, useAppSelector } from "./MyComponents/Redux/hooks";
import SplashScreen from "react-native-splash-screen";

import Landingpage from "./MyComponents/Views/Landing/landing";
import OnBoarding from "./MyComponents/Views/Onboarding/onboarding";
import Authselection from "./MyComponents/Views/AuthSelection/authselection";
import Login from "./MyComponents/Views/Login/login";
import Signup from "./MyComponents/Views/Signup/signup";
import Profile from "./MyComponents/Views/Profile/Profile";
import NetInfo from "@react-native-community/netinfo";
import Home from "./MyComponents/Views/HomeTabs/home";
import Goal from "./MyComponents/Views/GoalSetting/goal";
import Plans from "./MyComponents/Views/Plans/planshome";

import MealPlan from "./MyComponents/Views/Plans/plancreationmeal";
import MealEdit from "./MyComponents/Views/Plans/mealplanedit";
import MealView from "./MyComponents/Views/Plans/mealplanview";
import PlanCreation from "./MyComponents/Views/Plans/plancreation";
import PlanEdit from "./MyComponents/Views/Plans/planedit";
import PlanView from "./MyComponents/Views/Plans/planview";

import MyPlans from "./MyComponents/Views/Plans/MyPlans";
import PlanSearch from "./MyComponents/Views/Plans/PlanSearch";

import SessionCreation from "./MyComponents/Views/Session/session";
import SessionView from "./MyComponents/Views/Session/sessionview";
import SessionEdit from "./MyComponents/Views/Session/sessionedit";
import MealSession from "./MyComponents/Views/MealSession/mealsession";
import MealSessionView from "./MyComponents/Views/MealSession/mealsessionview";
import MealSessionEdit from "./MyComponents/Views/MealSession/mealsessionedit";

import SetCreation from "./MyComponents/Views/ActivitySet/activityset";
import SetEdit from "./MyComponents/Views/ActivitySet/setedit";
import SetView from "./MyComponents/Views/ActivitySet/setview";
import Constituent from "./MyComponents/Views/MealConstituent/mealconstituent";
import ConstituentEdit from "./MyComponents/Views/MealConstituent/constituentEdit";
import ConstituentView from "./MyComponents/Views/MealConstituent/constituentView";

import Monitoring from "./MyComponents/Views/Monitoring/graphs";
import Tracking from "./MyComponents/Views/Tracking/tracking";
import Meal from "./MyComponents/Views/Tracking/meal";
import Vitals from "./MyComponents/Views/Tracking/vitals";
import Exercise from "./MyComponents/Views/Tracking/exercise";
import Current from "./MyComponents/Views/Plans/currentplan";
import {
  onAuthStateChanged,
  refreshAuth,
  signoutOfFirebase,
} from "./api/utils";
import DailyGoals from "./MyComponents/Views/DailyGoals/dailygoal";
import Comp from "./MyComponents/Views/Monitoring/graphs";
import Auth from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import { persistConfig, persistor, store } from "./MyComponents/Redux/store";
import {
  signOut,
  updateProfileState,
} from "./MyComponents/Redux/profilesSlice";
import { updateHasBeenOnboarded } from "./MyComponents/Redux/globalsSlice";
import ActivitySet from "./MyComponents/Views/ActivitySet/setedit";
import Plan from "./MyComponents/Views/Plans/Plan";
import { Profile as _Profile } from "./api/interface";
import { ProfileUpdateRequestSpec } from "./api/spec";
import SavedPlans from "./MyComponents/Views/Plans/SavedPlans";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const profiles = useAppSelector((state) => state.profiles);
  const globals = useAppSelector((state) => state.globals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  useEffect(() => {
    return Auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  useEffect(() => {
    NetInfo.addEventListener((networkState) => {
      console.log("Connection type - ", networkState.type);
      console.log("Is connected? - ", networkState.isInternetReachable);
    });
  }, []);

  useEffect(() => void fetchProfile(), []);

  async function fetchProfile() {
    await refreshAuth(await Auth().currentUser?.getIdToken());
    const result = await _Profile.getOwnProfile();

    if (result)
      dispatch(updateProfileState(result.data as ProfileUpdateRequestSpec));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          !globals.hasBeenOnboarded
            ? "Landing"
            : !profiles.profiles[profiles.activeProfile].signedIn
            ? "Auth"
            : profiles.profiles[profiles.activeProfile].firstTimeToProfile
            ? "Profile"
            : profiles.profiles[profiles.activeProfile].firstTimeToGoalSetting
            ? "Goal"
            : profiles.profiles[profiles.activeProfile].firstTimeToMeasurements
            ? "Vitals"
            : "Home"
        }
        screenOptions={{
          headerShown: false,
        }}
      >
        {!profiles.profiles[profiles.activeProfile].signedIn ? (
          <>
            {!globals.hasBeenOnboarded ? (
              <>
                <Stack.Screen name="Landing" component={Landingpage} />
                <Stack.Screen name="Onboarding" component={OnBoarding} />
              </>
            ) : null}
            <Stack.Screen name="Auth" component={Authselection} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            {profiles.profiles[profiles.activeProfile]
              .firstTimeToGoalSetting ? (
              <Stack.Screen name="Goal" component={Goal} />
            ) : null}
            <Stack.Screen name="Vitals" component={Vitals} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Plan" component={Plan} />
            <Stack.Screen name="MealPlan" component={MealPlan} />
            <Stack.Screen name="MealEdit" component={MealEdit} />
            <Stack.Screen name="MealView" component={MealView} />
            <Stack.Screen name="PlanEdit" component={PlanEdit} />
            <Stack.Screen name="PlanView" component={PlanCreation} />
            <Stack.Screen name="MyPlans" component={MyPlans} />
            <Stack.Screen name="SavedPlans" component={SavedPlans} />
            <Stack.Screen name="Session" component={SessionView} />
            <Stack.Screen name="SessionView" component={SessionCreation} />
            <Stack.Screen name="SessionEdit" component={SessionEdit} />
            <Stack.Screen name="MealSession" component={MealSession} />
            <Stack.Screen name="MealSessionView" component={MealSessionView} />
            <Stack.Screen name="MealSessionEdit" component={MealSessionEdit} />
            <Stack.Screen name="Constituent" component={Constituent} />
            <Stack.Screen name="ConstituentEdit" component={ConstituentEdit} />
            <Stack.Screen name="ConstituentView" component={ConstituentView} />
            <Stack.Screen name="Set" component={ActivitySet} />
            <Stack.Screen name="SetEdit" component={SetEdit} />
            <Stack.Screen name="SetView" component={SetView} />
            <Stack.Screen name="Search" component={PlanSearch} />
            <Stack.Screen name="Current" component={Current} />
            <Stack.Screen name="Exercise" component={Exercise} />
            <Stack.Screen name="DailyWaterIntakeGoal" component={DailyGoals} />
            <Stack.Screen name="DailySleepGoal" component={DailyGoals} />
            <Stack.Screen name="Engagements" component={Comp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

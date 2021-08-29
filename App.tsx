import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "./MyComponents/types";
import { useAppSelector } from "./MyComponents/Redux/hooks";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Landingpage from "./MyComponents/Views/Landing/landing";
import OnBoarding from "./MyComponents/Views/Onboarding/onboarding";
import Authselection from "./MyComponents/Views/AuthSelection/authselection";
import Login from "./MyComponents/Views/Login/login";
import Signup from "./MyComponents/Views/Signup/signup";
import Profile from "./MyComponents/Views/Profile/Profile";
import NetInfo from "@react-native-community/netinfo";
import Home from './MyComponents/Views/HomeTabs/home';
import Goal from './MyComponents/Views/GoalSetting/goal';
import Plans from './MyComponents/Views/Plans/planshome';

import MealPlan from './MyComponents/Views/Plans/plancreationmeal';
import MealEdit from './MyComponents/Views/Plans/mealplanedit';
import MealView from './MyComponents/Views/Plans/mealplanview';
import PlanCreation from './MyComponents/Views/Plans/plancreation';
import PlanEdit from './MyComponents/Views/Plans/planedit';
import PlanView from './MyComponents/Views/Plans/planview';

import MyPlans from './MyComponents/Views/Plans/myplans';
import Search from './MyComponents/Views/Plans/plansearch';

import SessionCreation from './MyComponents/Views/Session/session';
import SessionView from './MyComponents/Views/Session/sessionview';
import SessionEdit from './MyComponents/Views/Session/sessionedit';
import MealSession from './MyComponents/Views/MealSession/session';
import MealSessionView from './MyComponents/Views/MealSession/sessionview';
import MealSessionEdit from './MyComponents/Views/MealSession/sessionedit';

import SetCreation from './MyComponents/Views/ActivitySet/activityset';
import SetEdit from './MyComponents/Views/ActivitySet/setedit';
import SetView from './MyComponents/Views/ActivitySet/setview';
import Constituent from './MyComponents/Views/MealConstituent/mealconstituent';
import ConstituentEdit from './MyComponents/Views/MealConstituent/constituentEdit';
import ConstituentView from './MyComponents/Views/MealConstituent/constituentView';

import Monitoring from './MyComponents/Views/Monitoring/graphs';
import Tracking from './MyComponents/Views/Tracking/tracking'
import Meal from './MyComponents/Views/Tracking/meal';
import Vitals from './MyComponents/Views/Tracking/vitals';
import Exercise from './MyComponents/Views/Tracking/exercise';
import Current from './MyComponents/Views/Plans/currentplan';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [hasBeenOnboarded, setHasBeenOnboarded] = useState(null);
  const [profile, setProfile] = useState(null);

  const IsSignedIn = useAppSelector((state) => state.profile.signedIn);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    try {
      AsyncStorage.getItem("@hasOnboarded").then((r) => {
        setHasBeenOnboarded(JSON.parse(r as string)?.hasOnboarded);
      });
      AsyncStorage.getItem("@profile").then((r) => {
        setProfile(JSON.parse(r as string)?.hasOnboarded);
      });
    } catch (err) {
      Alert.alert(err.message); // TODO do something else
    }
  }, []);

  useEffect(() => {
    NetInfo.addEventListener((networkState) => {
      console.log("Connection type - ", networkState.type);
      console.log("Is connected? - ", networkState.isConnected);
    });
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        {!IsSignedIn ? (
          <>
            <Stack.Screen name="Landing" component={Landingpage} />
            {!hasBeenOnboarded ? (
              <Stack.Screen name="Onboarding" component={OnBoarding} />
            ) : null}
            <Stack.Screen name="Auth" component={Authselection} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) :
          (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Goal" component={Goal} />
              <Stack.Screen name="Plan" component={PlanCreation} />
              <Stack.Screen name="MealPlan" component={MealPlan} />
              <Stack.Screen name="MealEdit" component={MealEdit} />
              <Stack.Screen name="MealView" component={MealView} />
              <Stack.Screen name="PlanEdit" component={PlanEdit} />
              <Stack.Screen name="PlanView" component={PlanView} />
              <Stack.Screen name="MyPlans" component={MyPlans} />
              <Stack.Screen name="Session" component={SessionCreation} />
              <Stack.Screen name="SessionView" component={SessionView} />
              <Stack.Screen name="SessionEdit" component={SessionEdit} />
              <Stack.Screen name="MealSession" component={MealSession} />
              <Stack.Screen name="MealSessionView" component={MealSessionView} />
              <Stack.Screen name="MealSessionEdit" component={MealSessionEdit} />
              <Stack.Screen name="Constituent" component={Constituent} />
              <Stack.Screen name="ConstituentEdit" component={ConstituentEdit} />
              <Stack.Screen name="ConstituentView" component={ConstituentView} />
              <Stack.Screen name="Set" component={SetCreation} />
              <Stack.Screen name="SetEdit" component={SetEdit} />
              <Stack.Screen name="SetView" component={SetView} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Current" component={Current} />
              <Stack.Screen name="Exercise" component={Exercise} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default App;

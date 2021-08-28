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

import Home from "./MyComponents/Views/HomeTabs/home";
import Goal from "./MyComponents/Views/GoalSetting/goal";
import Plan from "./MyComponents/Views/Plans/plancreation";
import PlanEdit from "./MyComponents/Views/Plans/planedit";
import PlanView from "./MyComponents/Views/Plans/planview";
import Search from "./MyComponents/Views/Plans/plansearch";

import Session from "./MyComponents/Views/Session/session";
import SessionView from "./MyComponents/Views/Session/sessionview";
import SessionEdit from "./MyComponents/Views/Session/sessionedit";
import Set from "./MyComponents/Views/ActivitySet/activityset";
import Exercise from "./MyComponents/Views/Tracking/exercise";
import Current from "./MyComponents/Views/Plans/currentplan";
import { Access } from "./api/interface";
import { Provider } from "react-redux";
import store from "./MyComponents/Redux/store";
import NetInfo from "@react-native-community/netinfo";

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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Goal"
          screenOptions={{
            headerShown: false,
          }}
        >
          {!IsSignedIn ? (
            <>
              {/*<Stack.Screen name="Goal" component={Goal} />*/}
              <Stack.Screen name="Profile" component={Profile} />
              {/*<Stack.Screen name="Landing" component={Landingpage} />*/}
              {/*{!hasBeenOnboarded ? (*/}
              {/*  <Stack.Screen name="Onboarding" component={OnBoarding} />*/}
              {/*) : null}*/}
              {/*<Stack.Screen name="Auth" component={Authselection} />*/}
              {/*<Stack.Screen name="Signup" component={Signup} />*/}
              {/*<Stack.Screen name="Login" component={Login} />*/}
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Set" component={Set} />
              <Stack.Screen name="Session" component={Session} />
              <Stack.Screen name="SessionView" component={SessionView} />
              <Stack.Screen name="SessionEdit" component={SessionEdit} />
              <Stack.Screen name="Goal" component={Goal} />
              <Stack.Screen name="Plan" component={Plan} />
              <Stack.Screen name="PlanEdit" component={PlanEdit} />
              <Stack.Screen name="PlanView" component={PlanView} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Current" component={Current} />
              <Stack.Screen name="Exercise" component={Exercise} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

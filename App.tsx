
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landingpage from './MyComponents/Views/Landing/landing';
import OnBoarding from './MyComponents/Views/Onboarding/onboarding';
import Authselection from './MyComponents/Views/AuthSelection/authselection';
import Login from './MyComponents/Views/Login/login';
import Signup from './MyComponents/Views/Signup/signup';
import Profile from './MyComponents/Views/Profile/Profile';

import Home from './MyComponents/Views/HomeTabs/home';
import Goal from './MyComponents/Views/GoalSetting/goal';
import Plan from './MyComponents/Views/Plans/plancreation';
import Plans from './MyComponents/Views/Plans/planshome';
import PlanEdit from './MyComponents/Views/Plans/planedit';
import PlanView from './MyComponents/Views/Plans/planview';
import Search from './MyComponents/Views/Plans/plansearch';

import Session from './MyComponents/Views/Session/session';
import SessionView from './MyComponents/Views/Session/sessionview';
import SessionEdit from './MyComponents/Views/Session/sessionedit';
import Set from './MyComponents/Views/ActivitySet/activityset';
import Monitoring from './MyComponents/Views/Monitoring/graphs';
import Tracking from './MyComponents/Views/Tracking/tracking'
import Meal from './MyComponents/Views/Tracking/meal';
import Vitals from './MyComponents/Views/Tracking/vitals';
import Exercise from './MyComponents/Views/Tracking/exercise';
import Current from './MyComponents/Views/Plans/currentplan';

import { RootStackParamList } from './MyComponents/types';
import { logIn, signOut } from './MyComponents/Redux/userSlice';
import { RootState } from './MyComponents/Redux/store';
import { useAppSelector, useAppDispatch } from './MyComponents/Redux/hooks';

// import { useSelector, useDispatch } from 'react-redux';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  // const dispatch = useDispatch();
  // const IsSignedIn = useSelector((state: RootState) => state.user.signedIn)
  // const [IsSignedIn, SetIsSignedIn] = useState(false);

  const IsSignedIn = useAppSelector((state) => state.user.signedIn);
  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
        headerShown: false
      }}>
        {
          !IsSignedIn ?
            (<>
              <Stack.Screen name="Landing" component={Landingpage} />
              <Stack.Screen name="Onboarding" component={OnBoarding} />
              <Stack.Screen name="Auth" component={Authselection} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
            </>
            ) :
            (
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
            )
        }
      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default App;



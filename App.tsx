
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

import { RootStackParamList } from './MyComponents/types';
import { logIn, signOut } from './MyComponents/Redux/profileSlice';
import { RootState } from './MyComponents/Redux/store';
import { useAppSelector, useAppDispatch } from './MyComponents/Redux/hooks';

// import { useSelector, useDispatch } from 'react-redux';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  // const dispatch = useDispatch();
  // const IsSignedIn = useSelector((state: RootState) => state.user.signedIn)
  // const [IsSignedIn, SetIsSignedIn] = useState(false);

  const IsSignedIn = useAppSelector((state) => state.profile.signedIn);
  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        {
          IsSignedIn ?
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



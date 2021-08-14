
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
import Plan from './MyComponents/Views/Plans/plan';
import Plans from './MyComponents/Views/Plans/plans';
import Session from './MyComponents/Views/Session/session';
import Set from './MyComponents/Views/ActivitySet/activityset';
import Monitoring from './MyComponents/Views/Monitoring/graphs';
import Tracking from './MyComponents/Views/Tracking/tracking'

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
      <Stack.Navigator screenOptions={{
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
                <Stack.Screen name="Set" component={Set} />
                <Stack.Screen name="Session" component={Session} />
                <Stack.Screen name="Goal" component={Goal} />
                <Stack.Screen name="Plan" component={Plan} />
              </>
            )
        }





      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default App;



import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';
import { NativeBaseProvider } from 'native-base';

import { Provider } from 'react-redux';
import store from './MyComponents/Redux/store';
import App from './App';

import Landingpage from './MyComponents/Views/Landing/landing';
import OnBoarding from './MyComponents/Views/Onboarding/onboarding';
import Authselection from './MyComponents/Views/AuthSelection/authselection';
import Login from './MyComponents/Views/Login/login';
import Signup from './MyComponents/Views/Signup/signup';
import Profile from './MyComponents/Views/Profile/Profile';

import Home from './MyComponents/Views/HomeTabs/home';
import PlanCreation from './MyComponents/Views/Plans/plancreation';
import Plans from './MyComponents/Views/Plans/plans';
import CurrentPlan from './MyComponents/Views/Plans/currentplan';
import Session from './MyComponents/Views/Session/session';
import Set from './MyComponents/Views/ActivitySet/activityset';
import Monitoring from './MyComponents/Views/Monitoring/graphs';
import Tracking from './MyComponents/Views/Tracking/tracking';
import Meal from './MyComponents/Views/Tracking/meal';
import Vitals from './MyComponents/Views/Tracking/vitals';
import Exercise from './MyComponents/Views/Tracking/exercise';
import GIFTEST from './MyComponents/Views/ActivitySet/giftest';
import { NavigationContainer } from '@react-navigation/native';
const MeApp = () => {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </NativeBaseProvider>
    )
}
AppRegistry.registerComponent(appName, () => MeApp);

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
import Plan from './MyComponents/Views/Plans/plan';
import Plans from './MyComponents/Views/Plans/plans';
import CurrentPlan from './MyComponents/Views/Plans/currentplan';
import Session from './MyComponents/Views/Session/session';
import Set from './MyComponents/Views/ActivitySet/activityset';
import Monitoring from './MyComponents/Views/Monitoring/graphs';
import Tracking from './MyComponents/Views/Tracking/tracking'

const MeApp = () => {
    return (
        <NativeBaseProvider>
            <Provider store={store}>

                <CurrentPlan />

            </Provider>
        </NativeBaseProvider>
    )
}
AppRegistry.registerComponent(appName, () => MeApp);

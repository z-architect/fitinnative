import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { name as appName } from './app.json';
import CompTwa from './MyComponents/planwhy';
import Session from './MyComponents/session';
import Plan from './MyComponents/plan';
import Compee from './MyComponents/graphs';
import Landingpage from './MyComponents/2day/landing';
import Profile from './MyComponents/2day/Profile';
import { NativeBaseProvider } from 'native-base';
import Authselection from './MyComponents/2day/authselection';
import Signin from './MyComponents/2day/login';
import Signup from './MyComponents/2day/signup';
import LandingPage from './MyComponents/2day/landing';
import Tracking from './MyComponents/planet/tracking'
import { Provider } from 'react-redux';
import store from './MyComponents/Reduxshit/store';
import OnBoarding from './MyComponents/2day/onboarding';
import Plans from './MyComponents/planet/plans'
import Home from './MyComponents/planet/home';
//import Goals from './MyComponents/2day/goal';
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

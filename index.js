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
import Goals from './MyComponents/2day/goal';
const MeApp = () => {
    return (<NativeBaseProvider>
        <Goals />
    </NativeBaseProvider>)
}
AppRegistry.registerComponent(appName, () => MeApp);

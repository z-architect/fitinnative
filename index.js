import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CompTwa from './MyComponents/planwhy';
import CompThree from './MyComponents/session';
import CompFour from './MyComponents/plan';
AppRegistry.registerComponent(appName, () => CompFour);


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


import Landing from './MyComponents/2day/landing';
import Auth from './MyComponents/2day/authselection';
import Login from './MyComponents/2day/login';
import Signup from './MyComponents/2day/signup';
import Goal from './MyComponents/2day/goal';
import Plan from './MyComponents/plan';
import Session from './MyComponents/session';
import Set from './MyComponents/activityset';
import Profile from './MyComponents/2day/Profile';
import Onboarding from './MyComponents/2day/onboarding';
import { RootStackParamList } from './MyComponents/types';
import Home from './MyComponents/planet/home';
// import { useSelector, useDispatch } from 'react-redux';
import { logIn, signOut } from './MyComponents/Reduxshit/userSlice';
import { RootState } from './MyComponents/Reduxshit/store';
import { useAppSelector, useAppDispatch } from './MyComponents/Reduxshit/hooks';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  // const dispatch = useDispatch();
  // const IsSignedIn = useSelector((state: RootState) => state.user.signedIn)
  const IsSignedIn = useAppSelector((state) => state.user.signedIn);
  // const [IsSignedIn, SetIsSignedIn] = useState(false);
  return (


    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {
          IsSignedIn ?
            (<>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Auth" component={Auth} />
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
//  import {
//    Colors,
//    DebugInstructions,
//    Header,
//    LearnMoreLinks,
//    ReloadInstructions,
//  } from 'react-native/Libraries/NewAppScreen';

//  const Section: React.FC<{
//    title: string;
//  }> = ({children, title}) => {
//    const isDarkMode = useColorScheme() === 'dark';
//    return (
//      <View style={styles.sectionContainer}>
//        <Text
//          style={[
//            styles.sectionTitle,
//            {
//              color: isDarkMode ? Colors.white : Colors.black,
//            },
//          ]}>
//          {title}
//        </Text>
//        <Text
//          style={[
//            styles.sectionDescription,
//            {
//              color: isDarkMode ? Colors.light : Colors.dark,
//            },
//          ]}>
//          {children}
//        </Text>
//      </View>
//    );
//  };

//  const App = () => {
//    const isDarkMode = useColorScheme() === 'dark';

//    const backgroundStyle = {
//      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//    };

//    return (
//      <SafeAreaView style={backgroundStyle}>
//        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//        <ScrollView
//          contentInsetAdjustmentBehavior="automatic"
//          style={backgroundStyle}>
//          <Header />
//          <View
//            style={{
//              backgroundColor: isDarkMode ? Colors.black : Colors.white,
//            }}>
//            <Section title="Step One">
//              Edit <Text style={styles.highlight}>App.js</Text> to change this
//              screen and then come back to see your edits.
//            </Section>
//            <Section title="See Your Changes">
//              <ReloadInstructions />
//            </Section>
//            <Section title="Debug">
//              <DebugInstructions />
//            </Section>
//            <Section title="Learn More">
//              Read the docs to discover what to do next:
//            </Section>
//            <LearnMoreLinks />
//          </View>
//        </ScrollView>
//      </SafeAreaView>
//    );
//  };

//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });



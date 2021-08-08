import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
export type RootStackParamList = {
    Landing: undefined;
    Auth: undefined;
    Login: undefined;
    Signup: undefined;
    Goal: undefined;
    Home: undefined;
    Plan: undefined;
    Session: undefined;
    Set: undefined;
    Onboarding: undefined;
    Monitor: undefined;
    Profile: undefined;
}


export type LandingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Landing'>;
export type LandingScreenRouteProp = RouteProp<
    RootStackParamList,
    'Landing'>;

export type AuthScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Auth'>;
export type AuthScreenRouteProp = RouteProp<
    RootStackParamList,
    'Auth'>;

export type SignupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Signup'>;
export type SignupScreenRouteProp = RouteProp<
    RootStackParamList,
    'Signup'>;

export type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'>;
export type LoginScreenRouteProp = RouteProp<
    RootStackParamList,
    'Login'>;

export type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Profile'>;
export type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'Profile'>;

export type GoalScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Goal'>;
export type GoalScreenRouteProp = RouteProp<
    RootStackParamList,
    'Goal'>;

export type PlanScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Plan'>;
export type PlanScreenRouteProp = RouteProp<
    RootStackParamList,
    'Plan'>;

export type SessionScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Session'>;
export type SessionScreenRouteProp = RouteProp<
    RootStackParamList,
    'Session'>;

export type SetScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Set'>;
export type SetScreenRouteProp = RouteProp<
    RootStackParamList,
    'Set'>;

export type Props = {
    navigation: LandingScreenNavigationProp,
    route: LandingScreenRouteProp
}
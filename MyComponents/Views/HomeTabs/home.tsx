import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
  Touchable,
} from "react-native";
import FontAwesome1 from "react-native-vector-icons/FontAwesome";
import { BlurView } from "@react-native-community/blur";
import { Input, Modal } from "native-base";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Plans from "../Plans/planshome";
import Monitor from "../Monitoring/graphs";
import Tracking from "../Tracking/tracking";
import Meal from "../Tracking/meal";
import Daily from "../DailyGoals/dailygoal";
import Vitals from "../Tracking/vitals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Setting from "../Settings/settings";
import Profile from "../Profile/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();
import { Props } from "../../types";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{}}
      contentContainerStyle={{
        justifyContent: "space-between",
        backgroundColor: "rgb(240,240,240)",
        height: y,
        width: x * 0.7,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-start", padding: 25 }}
        onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      >
        <AntDesign name="close" color="grey" size={38} />
      </TouchableOpacity>
      <View style={{ width: x * 0.7 - 20, marginLeft: 20 }}>
        <DrawerItemList {...props} />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 28 }}>Fitin </Text>
        <View
          style={{
            transform: [{ rotate: "45deg" }],
            marginHorizontal: 10,
          }}
        >
          <AntDesign name="closesquareo" color="rgb(217,125,84)" size={30} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerWraped = ({ navigation, route }: Props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Fitin Hub"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Fitin Hub" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Setting} />
    </Drawer.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const Home = ({ navigation, route }: Props) => {
  const [modal, setModal] = useState(false);
  const [showQuickTrackModal, setShowQuickTrackModal] = useState(false);

  return (
    <>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { height: 70 },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Plans") iconName = "compass";
            else if (route.name === "Monitor") iconName = "pie-chart";
            else if (route.name === "Meal") iconName = "leaf";
            else if (route.name === "Vitals") iconName = "heart";
            else iconName = "left";

            return <FontAwesome1 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "rgb(110,140,160)",
          tabBarInactiveTintColor: "gray",
        })}
        tabBar={(props) => (
          <View style={styles.navigatorContainer}>
            <BottomTabBar {...props} />
          </View>
        )}
      >
        <Tabs.Screen
          name="Plans"
          options={{ tabBarShowLabel: false }}
          component={Plans}
        />
        <Tabs.Screen
          name="Monitor"
          options={{ tabBarShowLabel: false }}
          component={Monitor}
        />
        <Tabs.Screen
          name="Tracking"
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <View
                {...props}
                pointerEvents={"box-none"}
                style={[styles.mainCircle]}
              >
                <TouchableOpacity
                  onPress={props.onPress}
                  style={styles.mainButton}
                >
                  <AntDesign name="close" color="white" size={34} />
                </TouchableOpacity>
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Alert.alert("tabpressed");
              if (!modal) setModal(true);
              else if (modal) setModal(false);
            },
          }}
          component={Tracking}
        />
        <Tabs.Screen
          name="Meal"
          options={{ tabBarShowLabel: false }}
          component={Daily}
        />
        <Tabs.Screen
          name="Vitals"
          options={{ tabBarShowLabel: false }}
          component={Vitals}
        />
      </Tabs.Navigator>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <BlurView
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          blurType="dark"
          blurAmount={3}
          reducedTransparencyFallbackColor="black"
        />
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={0.9}
          onPress={() => {
            setModal(false);
          }}
        >
          {!showQuickTrackModal ? (
            <>
              <TouchableOpacity
                style={[styles.circle, styles.circle1]}
                onPress={() => {
                  setModal(false);
                  navigation.navigate("Meal");
                }}
              >
                <Text>
                  <MaterialCommunityIcons name="food" color="black" size={34} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circle, styles.circle2]}
                onPress={() => setShowQuickTrackModal(true)}
              >
                <Text style={{ padding: 2 }}>
                  <MaterialCommunityIcons
                    name="sleep"
                    color="black"
                    size={32}
                  />
                  <MaterialCommunityIcons
                    name="water"
                    color="black"
                    size={32}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circle, styles.circle3]}
                onPress={() => {
                  setModal(false);
                  navigation.navigate("MyPlans");
                }}
              >
                <Text>
                  <FontAwesome name="running" color="black" size={34} />
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255, 0.73)",
                  padding: 20,
                  minWidth: 240,
                  marginVertical: 10,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowQuickTrackModal(false);
                  setModal(false);
                  navigation.navigate("DailyWaterIntakeGoal", {
                    waterIntake: true,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "rgba(255,255,255, 0.73)" }}
                >
                  Water Intake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255, 0.73)",
                  padding: 20,
                  minWidth: 240,
                  marginVertical: 10,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowQuickTrackModal(false);
                  setModal(false);
                  navigation.navigate("DailySleepGoal", {
                    waterIntake: false,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "rgba(255,255,255, 0.73)" }}
                >
                  Sleep
                </Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circle, styles.circlex]}
          onPress={() => {
            setShowQuickTrackModal(false);
            setModal(false);
          }}
        >
          <Text>
            <AntDesign name="close" color="white" size={34} />
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(100,100,100,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: y,
    width: x,
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  mainCircle: {
    position: "relative",
    zIndex: 999,
    width: 65,
    alignItems: "center",
  },
  mainButton: {
    top: -31,
    height: 65,
    width: 65,
    zIndex: 999,
    borderRadius: 40,
    backgroundColor: "rgb(217,125,84)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle1: {
    position: "absolute",
    bottom: 90,
    left: 55,
  },
  circle2: {
    position: "absolute",
    bottom: 170,
    marginHorizontal: (x - 80) / 2,
  },
  circle3: {
    position: "absolute",
    bottom: 90,
    right: 55,
  },
  circlex: {
    position: "absolute",
    bottom: 34.5,
    marginHorizontal: (x - 65) / 2,
    backgroundColor: "rgba(217,125,84,1)",
    borderWidth: 0,
    shadowColor: "rgb(217,125,84)",
    shadowRadius: 3.0,
    shadowOpacity: 0.5,
    elevation: 6,
  },
});
export default DrawerWraped;

// tabBarButton: () => (i
//     <TouchableOpacity style={styles.maincircle} onPress={() => { SetModal(false) }}>
//         <Text>H</Text>
//     </TouchableOpacity>)

// }}

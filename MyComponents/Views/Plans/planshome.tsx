import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Image } from "native-base";
import { Badge } from "react-native-elements";

import { Props } from "../../types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../../../MyAssets/splash_logo.svg";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  FetchPlansResponseSpec,
  PlanType,
  ProfileUpdateRequestSpec,
} from "../../../api/spec";
import { changePlanType } from "../../Redux/globalsSlice";
import { Plan as _Plan } from "../../../api/interface";
import { instance } from "../../../api/config";
import { useIsFocused } from "@react-navigation/native";
import PlanCard from "./PlanCard";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Plans = ({ navigation }: Props) => {
  const focusIsHere = useIsFocused();
  const chosenPlanType = useAppSelector(
    (state) => state.globals.chosenPlanType
  );
  const dispatch = useAppDispatch();

  const [meal, setMeal] = useState(false);
  const currentGoal = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile]?.user?.currentGoal
  );
  const subscribedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile]?.user
        ?.subscribedPlans
  );
  const [featuredPlans, setFeaturedPlans] = useState({
    activity: [] as FetchPlansResponseSpec[],
    meal: [] as FetchPlansResponseSpec[],
  });
  const [myPlans, setMyPlans] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [currentPlans, setCurrentPlans] = useState(null);
  const [notifications, setNotifications] = useState([]);

  async function fetchPlans() {
    const result = await _Plan.fetchPlans({
      category: currentGoal,
      type: meal ? PlanType.MEAL : PlanType.WORKOUT,
      private: false,
      limit: 7,
    });

    if (!!result) {
      if (meal)
        setFeaturedPlans({
          meal: result.data,
          activity: featuredPlans.activity,
        });
      else
        setFeaturedPlans({ meal: featuredPlans.meal, activity: result.data });
    }
  }

  async function fetchCurrentPlans() {
    const result = await _Plan.fetchPlanSubscriptions({});
    const temp = !!currentPlans
      ? { ...currentPlans }
      : { activity: null, meal: null };

    if (!!result?.data) {
      result.data.forEach((sub) => {
        if (sub.plan.type === PlanType.WORKOUT) temp.activity = sub.plan;
        else temp.meal = sub.plan;
      });
    }

    setCurrentPlans(temp);
  }

  useEffect(() => {
    setMeal(chosenPlanType !== PlanType.WORKOUT);
  }, [chosenPlanType]);

  useEffect(() => {
    void fetchPlans();
  }, [subscribedPlans, meal, focusIsHere]);

  useEffect(() => {
    void fetchCurrentPlans();
  }, [subscribedPlans, meal, focusIsHere]);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <MaterialIcons name="menu" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 17,
          }}
        >
          <Logo width={80} />
        </View>

        <View
          style={{ alignItems: "flex-end", justifyContent: "center", flex: 1 }}
        >
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="notifications" size={28} color="black" />
            {!notifications.length ? null : (
              <Badge
                badgeStyle={{
                  borderRadius: 9,
                  height: 10,
                  minWidth: 0,
                  width: 10,
                }}
                textStyle={{ fontSize: 10, paddingHorizontal: 0 }}
                // value={notifications.length}
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.activityButton,
            {
              backgroundColor: meal ? "rgba(0,0,0,0.0)" : "white",
              borderBottomColor: meal ? "rgba(0,0,0,0.1)" : "rgb(217,125,84)",
              // width: Meal ? "45%" : "55%",
              flex: 1,
            },
          ]}
          onPress={() => {
            dispatch(changePlanType(PlanType.WORKOUT));
          }}
        >
          <Text style={[styles.buttonText, { color: meal ? "grey" : "black" }]}>
            Activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mealButton,
            {
              backgroundColor: meal ? "white" : "rgba(0,0,0,0.0)",
              borderBottomColor: meal ? "rgb(217,125,84)" : "rgba(0,0,0,0.1)",
              // width: Meal ? "55%" : "45%",
              flex: 1,
            },
          ]}
          onPress={() => {
            dispatch(changePlanType(PlanType.MEAL));
          }}
        >
          <Text style={[styles.buttonText, { color: meal ? "black" : "grey" }]}>
            Nutrition
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.containerInner}
      >
        <View
          style={{ width: "100%", backgroundColor: "rgba(190,210,240,0.1)" }}
        >
          <View style={[styles.textContainer, { paddingVertical: 0 }]}>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 20,
                color: "black",
              }}
            >
              Featured Plans
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "teal" }}>See All Plans</Text>
                <MaterialIcons name="chevron-right" color="teal" size={24} />
              </View>
            </TouchableOpacity>
          </View>

          {(meal && !!featuredPlans.meal.length) ||
          (!meal && !!featuredPlans.activity.length) ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                width: "100%",
              }}
              contentContainerStyle={{ alignItems: "center" }}
              horizontal={true}
            >
              <View style={{ width: 20 }} />
              {(meal ? featuredPlans.meal : featuredPlans.activity).map(
                (plan, index) => (
                  <View key={index} style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity
                      style={styles.cardsFeatured}
                      onPress={() => {
                        navigation.navigate("Plan", { plan });
                      }}
                    >
                      <Image
                        alt={"."}
                        source={
                          plan?.image
                            ? {
                                uri: `${instance.defaults.baseURL}/upload/${
                                  typeof plan?.image === "string"
                                    ? plan?.image
                                    : plan?.image?.id
                                }`,
                              }
                            : require("../../../MyAssets/weighloss.jpg")
                        }
                        style={styles.cardsFeaturedImage}
                      />

                      <View style={styles.featuredText}>
                        <Text
                          style={{ fontSize: 18, textAlign: "center" }}
                        >{`${plan?.title}`}</Text>
                        <Text
                          style={{
                            color: "grey",
                            letterSpacing: 1,
                            textAlign: "center",
                          }}
                        >
                          {`${plan?.createdBy?.firstName} ${plan?.createdBy?.lastName}`.toUpperCase()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              )}
              <View style={{ width: 20 }} />
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>The are no featured plans.</Text>
            </View>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 20,
              color: "black",
            }}
          >
            Current Plan
          </Text>
        </View>

        {(meal && !currentPlans?.meal) ||
        (!meal && !!currentPlans?.activity) ? (
          <PlanCard
            plan={!meal ? currentPlans?.meal : currentPlans?.activity}
            onPress={(plan) => {
              navigation.navigate("Plan", { plan });
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              height: 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              You are not following any plans.
            </Text>
            <Button.Group variant="unstyled">
              <Button
                onPress={() => {
                  navigation.navigate("Search");
                }}
              >
                <Text style={{ color: "teal", fontSize: 18 }}>Find Plans</Text>
              </Button>
            </Button.Group>
          </View>
        )}

        <View style={{ width: "100%", paddingTop: 10 }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() => navigation.navigate("MyPlans")}
          >
            <View
              style={{
                paddingHorizontal: 17,
                width: "100%",
                paddingVertical: 10,
                marginTop: 5,
                backgroundColor: "rgba(255,255,255, 0.4)",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                My Plans
              </Text>
              <MaterialIcons name={"chevron-right"} size={38} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() => navigation.navigate("SavedPlans")}
          >
            <View
              style={{
                paddingHorizontal: 17,
                width: "100%",
                paddingVertical: 10,
                backgroundColor: "rgba(255,255,255, 0.4)",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Saved Plans
              </Text>
              <MaterialIcons name={"chevron-right"} size={38} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(190,210,240,0.05)",
  },

  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 5,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  containerInner: {
    // justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 17,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textheader: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  createbutton: {
    width: "60%",
    height: 80,
    marginHorizontal: "20%",
    marginVertical: 10,
    borderRadius: 32,
    backgroundColor: "rgb(110,140,160)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
  mealButton: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
  },
  activityButton: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
  },
  cardsPlan: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  cardsPlanContainer: {
    overflow: "hidden",
    width: x * 0.9,
    height: 230,
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 0,
    shadowColor: "black",
    shadowRadius: 5.0,
    shadowOpacity: 0.1,
    elevation: 10,
    borderRadius: 10,
  },

  cardsPlanText: {
    marginVertical: 55,
    marginHorizontal: 30,
  },
  cardsFeatured: {
    overflow: "hidden",
    width: 154.5,
    height: 210,
    marginBottom: 20,
    marginTop: 10,
    shadowColor: "black",
    elevation: 15,
    backgroundColor: "white",
    borderRadius: 20,
    // borderBottomEndRadius: 20,
    // borderBottomStartRadius: 20,
    justifyContent: "space-between",
  },
  cardsFeaturedImage: {
    width: "100%",
    height: "57%",
  },
  featuredText: {
    paddingVertical: 15,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "yellow"
  },
});
export default Plans;

import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { instance } from "../../../api/config";
import React, { useEffect, useState } from "react";
import { FetchPlansResponseSpec, PlanType } from "../../../api/spec";
import { useAppSelector } from "../../Redux/hooks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const x = Dimensions.get("window").width;

interface PlanCardProps {
  plan: FetchPlansResponseSpec;
  onPress: (plan: FetchPlansResponseSpec) => void;
  onUnsubscribe?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onUnBookmark?: (id: string) => void;
  onEdit?: (plan: FetchPlansResponseSpec) => void;
  onDelete?: (id: string) => void;
  saved?: boolean;
  mine?: boolean;
}

function PlanCard({
  plan: _plan,
  onPress,
  onEdit,
  onDelete,
  onUnsubscribe,
  onBookmark,
  onUnBookmark,
  saved,
  mine,
}: PlanCardProps) {
  const [plan] = useState(_plan ?? null);
  const subscribedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user.subscribedPlans
  );

  function handleControlPress() {
    if (subscribedPlans.includes(plan?.id) && !saved && !mine && onUnsubscribe)
      onUnsubscribe(plan.id);
    else if (!!saved && onUnBookmark) onUnBookmark(plan.id);
    else if (onBookmark) onBookmark(plan.id);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.cardsPlanContainer}
        onPress={() => onPress(plan)}
      >
        <ImageBackground
          source={
            !!plan?.image
              ? {
                  uri: `${instance.defaults.baseURL}/upload/${
                    typeof plan?.image === "string"
                      ? plan?.image
                      : plan?.image.id
                  }`,
                }
              : { uri: "no-image" }
          }
          style={styles.cardsPlan}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <View style={styles.cardsPlanText}>
              <Text
                style={{
                  fontSize: 32,
                  color: "white",
                }}
              >
                {plan?.title ?? ""}
              </Text>
              <Text style={{ color: "white" }}>
                {plan?.type === PlanType.WORKOUT
                  ? plan?.difficulty
                  : plan?.description ?? ""}
              </Text>
            </View>
            <View style={styles.controlsContainer}>
              <TouchableOpacity disabled={mine} style={styles.controls}>
                {subscribedPlans.includes(plan?.id) && !saved && !mine ? (
                  <View style={styles.unsubscribeButton}>
                    <Text style={styles.unsubscribeButtonText}>
                      Stop Following
                    </Text>
                  </View>
                ) : !!mine ? (
                  <>
                    <View style={styles.ownerControls}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => onEdit && onEdit(plan)}
                      >
                        <MaterialIcons
                          name={"edit"}
                          size={32}
                          color={"rgba(255,255,255,0.8)"}
                        />
                      </TouchableOpacity>
                      <View style={styles.separator} />
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => onDelete && onDelete(plan.id)}
                      >
                        <MaterialIcons
                          name={"delete"}
                          size={32}
                          color={"rgba(255,255,255,0.8)"}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.bookmarkIcon}>
                      <MaterialIcons
                        name={saved ? "bookmark" : "bookmark-outline"}
                        size={32}
                        color={"rgba(255,255,255,0.8)"}
                      />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 55,
    marginHorizontal: 30,
    maxWidth: "55%",
    justifyContent: "flex-end",
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
  },
  controlsContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: 100,
    maxWidth: "30%",
  },
  controls: { justifyContent: "center", alignItems: "center", flex: 1 },
  unsubscribeButton: {},
  unsubscribeButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "rgba(255,255,255,0.75)",
  },
  bookmarkIcon: {},
  ownerControls: {
    flex: 1,
    width: "100%",
  },
  editButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  deleteButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlanCard;

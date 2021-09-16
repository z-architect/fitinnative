import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Props } from "../../types";
import { Button } from "native-base";
import { useAppSelector } from "../../Redux/hooks";
import { FetchPlansResponseSpec, PlanType } from "../../../api/spec";
import { useIsFocused } from "@react-navigation/native";
import { Plan } from "../../../api/interface";
import PlanCard from "./PlanCard";
import DeleteModal from "../../Utils/DeleteModal";

const y = Dimensions.get("window").height;

function MyPlans({ navigation }: Props) {
  const focusIsHere = useIsFocused();

  const chosenPlanType = useAppSelector(
    (state) => state.globals.chosenPlanType
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const [plans, setPlans] = useState<FetchPlansResponseSpec[]>([]);

  async function fetchPlans() {
    const result = await Plan.fetchPlans({ mine: true });

    if (!!result?.data) {
      setPlans([...result.data]);
    }
  }

  async function handleDelete() {
    const result = await Plan.removePlan({ id: toBeDeleted as string });

    if (result) {
      setPlans([...plans.filter((plan) => plan.id !== toBeDeleted)]);
    }

    setToBeDeleted(null);
  }

  useEffect(() => {
    if (focusIsHere) {
      void fetchPlans();
    }
  }, [focusIsHere]);

  return (
    <View style={styles.container}>
      {showDeleteModal ? (
        <DeleteModal
          onDelete={() => {
            setShowDeleteModal(false);
            void handleDelete();
          }}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onCancel={() => setToBeDeleted(null)}
          prompt={"Are you sure you want to delete this plan?"}
        />
      ) : null}
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="navigate-before" size={40} color="black" />
        </TouchableOpacity>

        <View style={{ justifyContent: "center", marginLeft: 20 }}>
          <Text style={{ fontSize: 22 }}>My Plans</Text>
        </View>

        {plans.length ? (
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Plan", { createMode: true });
              }}
            >
              <MaterialIcons name="add" size={32} color="black" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {!!plans.length ? (
        <ScrollView contentContainerStyle={styles.plansContainer}>
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onPress={(plan) => navigation.navigate("Plan", { plan })}
              mine={true}
              onDelete={(id) => {
                setToBeDeleted(id);
                setShowDeleteModal(true);
              }}
              onEdit={(plan) => {
                navigation.replace("Plan", { plan, editMode: true });
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>
            You don't have any
            {chosenPlanType === PlanType.WORKOUT ? " workout " : " meal "}plans
            of your own.
          </Text>
          <Button.Group variant="unstyled">
            <Button
              onPress={() => {
                navigation.navigate("Plan", { createMode: true });
              }}
            >
              <Text style={{ color: "teal", fontSize: 18 }}>Create Plan</Text>
            </Button>
          </Button.Group>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(110,140,160,0.1)",
  },
  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 5,
  },
  plansContainer: {
    paddingVertical: 40,
  },
});

export default MyPlans;

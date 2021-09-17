import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Props } from "../../types";
import { FetchPlansRequestSpec, FetchPlansResponseSpec, PlanType } from "../../../api/spec";
import { Button } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { Plan } from "../../../api/interface";
import PlanCard from "./PlanCard";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const PlanSearch = ({ navigation, route }: Props) => {
  const focusIsHere = useIsFocused();

  const [searchValue, setSearchValue] = useState("");
  const [plans, setPlans] = useState<FetchPlansResponseSpec[]>([]);

  async function fetchPlans(searchString?: string) {
    const params: FetchPlansRequestSpec = { private: false, mine: false };

    if (!!searchString) params.searchString = searchString

    const result = await Plan.fetchPlans({ ...params });

    if (result) {
      setPlans(result.data);
    }
  }

  useEffect(() => {
    if (focusIsHere) void fetchPlans();
  }, [focusIsHere]);

  useEffect(() => {
    void fetchPlans(searchValue);
  }, [searchValue])

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="chevron-left" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              marginLeft: 5,
              justifyContent: "center",
            }}
          >
            <TextInput
              autoFocus={true}
              placeholder="Search"
              placeholderTextColor="grey"
              style={[
                styles.searchBar,
                {
                  borderColor:
                    searchValue !== "" ? "transparent" : "rgba(0,0,0, 0.2)",
                },
              ]}
              fontSize={20}
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
            />
          </View>
        </View>
      </View>

      {!!plans.length ? (
        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContainerInner}
        >
          {plans.map((plan) => (
            <>
              <PlanCard
                plan={plan}
                onPress={(plan) => navigation.navigate("Plan", { plan })}
              />
            </>
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
          <Text style={{ fontSize: 16 }}>No plans found.</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 5,
  },
  searchheader: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  bar: {
    flexDirection: "row",
    marginHorizontal: x * 0.1,
    marginVertical: 15,
  },
  searchbutton: {
    backgroundColor: "orange",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  searchBar: {
    paddingVertical: 5,
    color: "black",
    borderBottomWidth: 1,
  },
  card: {
    width: x * 0.4,
    justifyContent: "flex-end",
    backgroundColor: "yellow",
    height: 250,
    borderRadius: 18,
    marginTop: 30,
    marginHorizontal: x * 0.025,
  },
  resultsContainerInner: {
    paddingVertical: 40,
  },
});
export default PlanSearch;

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image } from "native-base";
import { instance } from "../../../api/config";
import { useAppSelector } from "../../Redux/hooks";
import { SetStateStructure } from "../ActivitySet/setedit";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface SetSnackProps {
  set: SetStateStructure;
  selected: boolean;
  onTouch: (id: string) => void;
  editSet: (currentSet: SetStateStructure) => void;
  deleteSet: (id: string) => void;
}

const SetCard = ({
  set,
  onTouch,
  editSet,
  deleteSet,
  selected,
}: SetSnackProps) => {
  const profile = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile].user
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.setSnack,
          { backgroundColor: selected ? "rgb(200,220,240)" : "white" },
        ]}
        onPress={() => onTouch(set.id)}
      >
        <View
          style={[styles.activityGif, { marginRight: 15, overflow: "hidden" }]}
        >
          {set.activity?.actionGif ? (
            <Image
              height="100%"
              width="100%"
              alt="Action Gif"
              resizeMode="cover"
              style={{ borderRadius: 75 }}
              source={{
                uri: `${instance.defaults.baseURL}/upload/${set.activity.actionGif.id}`,
              }}
            />
          ) : null}
        </View>
        <View style={styles.setName}>
          <Text>{set.activity?.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingTop: 2,
            }}
          >
            <MaterialIcons
              name={set.forReps ? "repeat" : "av-timer"}
              size={12}
              color="black"
            />
            <Text>
              {set?.forReps
                ? ` ${set?.reps ?? 0} reps`
                : ` ${set?.duration ?? 0} min`}
            </Text>
          </View>
        </View>
        {!!set.createdBy &&
        profile.id ===
          (typeof set.createdBy === "string"
            ? set.createdBy
            : set.createdBy.id) ? (
          <>
            <View style={styles.customControlsContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => editSet(set)}
              >
                <MaterialIcons name="edit" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteSet(set.id)}
              >
                <MaterialIcons name="delete-outline" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  setSnack: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
  },
  activityGif: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  setName: {
    paddingRight: 24,
    paddingLeft: 5,
    maxWidth: "45%",
    width: "45%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customControlsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  customDisclaimer: {},
  deleteButton: {
    paddingLeft: 16,
  },
});
export default SetCard;

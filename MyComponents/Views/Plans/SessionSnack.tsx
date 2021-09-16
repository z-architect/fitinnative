import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "native-base";
import { instance } from "../../../api/config";
import { useAppSelector } from "../../Redux/hooks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface SessionSnackProps {
  session: any;
  selected: boolean;
  onTouch: (id: string) => void;
  editSession: (currentSet: any) => void;
  deleteSession: (id: string) => void;
}

const SessionSnack = ({
  session,
  onTouch,
  editSession,
  deleteSession,
  selected,
}: SessionSnackProps) => {
  const profile = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile].user
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.sessionSnack,
          { backgroundColor: selected ? "rgb(200,220,240)" : "white" },
        ]}
        onPress={() => onTouch(session.id)}
      >
        <View
          style={[
            styles.image,
            {
              marginRight: 15,
              overflow: "hidden",
              borderRightWidth: 1,
              borderColor: "rgba(0,0,0,0.05)",
            },
          ]}
        >
          {session.image ? (
            <Image
              height="100%"
              width="100%"
              alt="Action Gif"
              resizeMode="cover"
              source={{
                uri: `${instance.defaults.baseURL}/upload/${session.image?.id}`,
              }}
            />
          ) : null}
        </View>
        <View style={styles.sessionName}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text>{session.name}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingTop: 2,
            }}
          >
            <MaterialIcons name={"av-timer"} size={12} color="black" />
            <Text>{` ${session?.duration ?? 0} min`}</Text>
          </View>
        </View>
        {!!session.createdBy &&
        profile.id ===
          (typeof session.createdBy === "string"
            ? session.createdBy
            : session.createdBy.id) ? (
          <>
            <View style={styles.customControlsContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => editSession(session)}
              >
                <MaterialIcons name="edit" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteSession(session.id)}
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
  sessionSnack: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 80,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionName: {
    paddingVertical: 20,
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
    paddingRight: 20,
    flex: 1,
  },
  deleteButton: {
    paddingLeft: 16,
  },
});
export default SessionSnack;

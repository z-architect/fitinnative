import { Button, Image, ScrollView } from "native-base";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import ActivityView, { ActivityStateStructure } from "../Activity/Activity";
import { instance } from "../../../api/config";
import { Activity } from "../../../api/interface";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface ActivityListProps {
  onSubmit: (activity: ActivityStateStructure) => void;
  onBack: () => void;
}

const y = Dimensions.get("window").height;

function ActivityList({ onBack, onSubmit }: ActivityListProps) {
  const [activities, setActivities] = useState<ActivityStateStructure[]>([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityValue, setActivityValue] = useState<ActivityStateStructure>(
    {} as ActivityStateStructure
  );

  async function fetchActivityList() {
    const result = await Activity.fetchActivities({});

    setActivities((result?.data as ActivityStateStructure[]) ?? []);
  }

  useEffect(() => {
    void fetchActivityList();
  }, []);

  async function deleteActivity(id: string) {
    // TODO remove file locally or remotely depending on the connection
    // TODO if removed locally only, mark for sync
    let removedFile = false;

    const result = await Activity.removeActivity({ id });

    if (result) removedFile = true;

    if (removedFile)
      setActivities((activities) => {
        return activities.filter((act) => act.id !== id);
      });
  }

  function handleActivityListUpdate(activity: ActivityStateStructure | null) {
    if (activity !== null) {
      const index = activities.findIndex(
        (_activity) => _activity.id === activity.id
      );

      if (index !== -1)
        setActivities((activities) => {
          activities[index] = activity;
          return activities;
        });
      else
        setActivities((activities) => {
          return activities
            .concat(activity)
            .sort((a, b) => (a.custom ? -1 : 1));
        });

      // onSubmit(activity);
    }
  }

  return (
    <>
      {showActivityModal ? (
        <ActivityView
          showModal={showActivityModal}
          setShowModal={setShowActivityModal}
          onSubmit={handleActivityListUpdate}
          activity={activityValue}
        />
      ) : null}

      <ScrollView
        style={styles.activityListContainer}
        contentContainerStyle={[
          { justifyContent: "center", paddingBottom: 25 },
        ]}
      >
        {activities.length ? (
          <>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.activitySnack}
                onPress={() => onSubmit(activity)}
              >
                <View
                  style={[
                    styles.activityGif,
                    { marginRight: 15, overflow: "hidden" },
                  ]}
                >
                  {activity.actionGif ? (
                    <Image
                      height="100%"
                      width="100%"
                      alt="Action Gif"
                      resizeMode="cover"
                      style={{ borderRadius: 75 }}
                      source={{
                        uri: `${instance.defaults.baseURL}/upload/${activity.actionGif}`,
                      }}
                    />
                  ) : null}
                </View>
                <Text style={styles.activityName}>{activity.name}</Text>

                {activity.custom ? (
                  <>
                    <View style={styles.customControlsContainer}>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                          setShowActivityModal(true);
                          setActivityValue(activity);
                        }}
                      >
                        <MaterialIcons name="edit" size={26} color="darkblue" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteActivity(activity.id)}
                      >
                        <MaterialIcons name="delete" size={26} color="red" />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View
            style={{
              minHeight: y * 0.55,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text> No activities</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.createNewActivityButton}>
        <Button.Group variant="ghost" space={2}>
          <Button
            onPress={() => {
              setActivityValue({} as ActivityStateStructure);
              setShowActivityModal(true);
            }}
          >
            + New Activity
          </Button>
        </Button.Group>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  activityListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  createNewActivityButton: {
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
  },

  activitySnack: {
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
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activityName: {
    paddingHorizontal: 24,
    maxWidth: "45%",
    width: "45%",
  },
  customControlsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  customDisclaimer: {},
  deleteButton: {
    paddingLeft: 24,
  },
});

export default ActivityList;

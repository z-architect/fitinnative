import { Button, Modal, ScrollView } from "native-base";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Session } from "../../../api/interface";
import { SetStateStructure } from "../ActivitySet/setedit";
import SessionSnack from "./SessionSnack";
import { Props } from "../../types";

interface SetListProps extends Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedSessions: any[] | null;
  setSelectedSessions: (sets: any[]) => void;
}

const y = Dimensions.get("window").height;
const x = Dimensions.get("window").width;

function SessionList({
  showModal,
  setShowModal,
  selectedSessions,
  setSelectedSessions,
  navigation,
}: SetListProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionValues, sessionSetValues] = useState<any[]>(
    selectedSessions || []
  );

  async function fetchSetList() {
    const result = await Session.fetchSessions({});
    setSessions((result?.data as any[]) ?? []);
  }

  useEffect(() => {
    void fetchSetList();
  }, []);

  async function deleteSet(id: string) {
    const result = await Session.removeSession({ id });

    if (result)
      setSessions((_sessions) => {
        return _sessions.filter((item) => item.id !== id);
      });
  }

  const addSetValue = (id: string) => {
    sessionSetValues((_sets) =>
      _sets.concat([
        sessions.find((set) => set?.id === id) as SetStateStructure,
      ])
    );
  };
  const removeSetValue = (id: string) => {
    sessionSetValues((_sessions) => {
      return _sessions.filter((item) => item.id !== id);
    });
  };

  function handleSelect(id: string) {
    const index = sessionValues.findIndex((session) => session?.id === id);

    if (index !== -1) removeSetValue(id);
    else addSetValue(id);
  }

  return (
    <>
      <Modal
        style={{ backgroundColor: "rgba(0,0,0, 0.4)" }}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.CloseButton />
        <View
          style={{
            flex: 1,
            width: x * 0.9,
            maxHeight: y * 0.8,
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
          }}
        >
          <ScrollView style={{ padding: 20 }}>
            {sessions.length &&
            !(
              sessions.length === selectedSessions?.length &&
              !!sessions.map((set) => selectedSessions?.includes(set)).length
            ) ? (
              <>
                {sessions.map((set) => {
                  if (
                    selectedSessions?.findIndex(
                      (value: SetStateStructure) => set.id === value.id
                    ) === -1
                  )
                    return (
                      <SessionSnack
                        key={set.id}
                        session={set}
                        selected={
                          sessionValues.findIndex(
                            (setValue) => setValue?.id === set?.id
                          ) !== -1
                        }
                        onTouch={(id: string) => handleSelect(id)}
                        deleteSession={(id: string) => deleteSet(id)}
                        editSession={(currentSet: SetStateStructure) => {
                          console.log(currentSet.met);
                          setShowModal(false);
                          navigation.navigate("Session", {
                            editMode: true,
                            set: currentSet,
                          });
                        }}
                      />
                    );
                })}
                <View style={{ height: 40 }} />
              </>
            ) : (
              <View
                style={{
                  height: y * 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>
                  {!(
                    sessions.length === selectedSessions?.length &&
                    !!sessions.map((set) => selectedSessions?.includes(set))
                      .length
                  )
                    ? "No exercises"
                    : "No available exercises"}
                </Text>
              </View>
            )}
          </ScrollView>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: 10,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
            }}
          >
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Session", { createMode: true });
                }}
              >
                + New Exercise
              </Button>
              <Button
                variant="solid"
                disabled={!sessionValues.length}
                onPress={() => {
                  setShowModal(false);
                  setSelectedSessions(sessionValues);
                }}
              >
                Done
              </Button>
            </Button.Group>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});

export default SessionList;

import { Button, Image, Modal, ScrollView } from "native-base";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivitySet } from "../../../api/interface";
import { SetStateStructure } from "../ActivitySet/setedit";
import SetSnack from "./setCardUnselected";
import { Props } from "../../types";

interface SetListProps extends Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedSets: SetStateStructure[] | null;
  setSelectedSets: (sets: SetStateStructure[]) => void;
}

const y = Dimensions.get("window").height;
const x = Dimensions.get("window").width;

function SetList({
  showModal,
  setShowModal,
  selectedSets,
  setSelectedSets,
  navigation,
}: SetListProps) {
  const [sets, setSets] = useState<SetStateStructure[]>([]);
  const [setValues, setSetValues] = useState<SetStateStructure[]>(
    selectedSets || []
  );

  async function fetchSetList() {
    const result = await ActivitySet.fetchActivitySets();
    setSets((result?.data as SetStateStructure[]) ?? []);
  }

  useEffect(() => {
    void fetchSetList();
  }, []);

  async function deleteSet(id: string) {
    const result = await ActivitySet.removeActivitySet({ id });

    if (result)
      setSets((_sets) => {
        return _sets.filter((item) => item.id !== id);
      });
  }

  const addSetValue = (id: string) => {
    setSetValues((_sets) =>
      _sets.concat([sets.find((set) => set?.id === id) as SetStateStructure])
    );
  };
  const removeSetValue = (id: string) => {
    setSetValues((_sets) => {
      return _sets.filter((item) => item.id !== id);
    });
  };

  function handleSelect(id: string) {
    const index = setValues.findIndex((set) => set?.id === id);

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
            {sets.length &&
            !(
              sets.length === selectedSets?.length &&
              !!sets.map((set) => selectedSets?.includes(set)).length
            ) ? (
              <>
                {sets.map((set, index) => {
                  if (
                    selectedSets?.findIndex(
                      (value: SetStateStructure) => set.id === value.id
                    ) === -1
                  )
                    return (
                      <SetSnack
                        key={set.id}
                        set={set}
                        selected={
                          setValues.findIndex(
                            (setValue) => setValue?.id === set?.id
                          ) !== -1
                        }
                        onTouch={(id: string) => handleSelect(id)}
                        deleteSet={(id: string) => deleteSet(id)}
                        editSet={(currentSet: SetStateStructure) => {
                          console.log(currentSet.met);
                          setShowModal(false);
                          navigation.navigate("Set", {
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
                    sets.length === selectedSets?.length &&
                    !!sets.map((set) => selectedSets?.includes(set)).length
                  )
                    ? "No sets"
                    : "No available sets"}
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
                  navigation.navigate("Set", { createMode: true });
                }}
              >
                + New Set
              </Button>
              <Button
                variant="solid"
                disabled={!setValues.length}
                onPress={() => {
                  setShowModal(false);
                  setSelectedSets(setValues);
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

export default SetList;

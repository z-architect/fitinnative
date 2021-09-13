import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EntryModal from "../../../Utils/EntryModal";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

interface VitalsCardProps {
  measurement: string;
  value: string | number;
  staticValue: string | number;
  editMode: boolean;
  unit: string;
  descriptor: string;
  onRecord: (value: string) => void;
  children?: JSX.Element;
  generated?: string | number;
}

const VitalsCard = (props: VitalsCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          {props.children}
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 20 }}>{props.measurement}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {props.editMode ? props.value : props.staticValue}
              </Text>
              <Text style={{ fontSize: 16, paddingLeft: 5 }}>{props.unit}</Text>
            </View>
          </View>
        </View>

        {props.editMode && !props.generated ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Record</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <EntryModal
        entryFor={props.measurement}
        showModal={showModal}
        setShowModal={setShowModal}
        inputPlaceholder={props.descriptor}
        onRecord={props.onRecord}
        value={props.value}
      >
        {props.children}
      </EntryModal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: x * 0.9,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.6)",
    marginVertical: 7.5,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#6E8CA0",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#6E8CA0",
  },
});

export default VitalsCard;

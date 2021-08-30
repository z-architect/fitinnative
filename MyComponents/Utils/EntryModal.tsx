import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modal } from "native-base";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

export enum EntryModalInputTypes {
  NUMERIC = "NUMERIC",
}

interface EntryModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onRecord: (value: string) => void;
  entryFor: string;
  inputLabel?: string;
  inputPlaceholder: string;
  inputType?: EntryModalInputTypes;
  children?: JSX.Element;
  value: string | number;
}

const EntryModal = (props: EntryModalProps) => {
  const [entry, setEntry] = useState(props.value as string);

  return (
    <>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <View style={styles.modalTopHalf}>
            <View style={styles.giantXContainer}>{props.children}</View>
            <Text style={{ fontSize: 34, fontWeight: "bold" }}>
              {props.entryFor}
            </Text>
          </View>
          <View style={styles.modalBottomHalf}>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="numeric"
                placeholder={props.inputPlaceholder}
                style={styles.input}
                autoFocus={true}
                value={
                  Number.parseFloat(entry) !== 0 &&
                  !isNaN(Number.parseFloat(entry))
                    ? entry
                    : ""
                }
                onChangeText={setEntry}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: "rgb(110,140,160)" },
                ]}
                onPress={() => props.setShowModal(false)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: "rgba(0, 170, 0, 0.7)" },
                ]}
                onPress={() => {
                  props.onRecord(entry);
                  props.setShowModal(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Record
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal.Content>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  modalTopHalf: {
    height: y * 0.25,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  giantXContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "rgb(217, 125, 84)",
  },
  modalBottomHalf: {
    height: y * 0.25,
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    fontSize: 22,
    textAlign: "center",
    borderBottomWidth: 1,
    color: "black",
    width: "80%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  modalButton: {
    borderRadius: 10,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EntryModal;

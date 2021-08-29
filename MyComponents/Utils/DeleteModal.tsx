import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modal } from "native-base";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

interface DeleteModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  prompt?: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <View style={styles.modalTopHalf}>
            <View style={styles.giantXContainer}>
              <AntDesign name="close" size={78} color="black" />
            </View>
            <Text style={{ fontSize: 34, fontWeight: "bold" }}>
              Are you sure?
            </Text>
          </View>
          <View style={styles.modalBottomHalf}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>{props.prompt}</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                This action can not be undone!
              </Text>
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
                  { backgroundColor: "rgba(255, 0, 0, 0.7)" },
                ]}
                onPress={props.onDelete}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Delete
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
  modalBottomHalf: {
    height: y * 0.25,
    width: "100%",
    justifyContent: "space-around",
    padding: 20,
  },
  giantXContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "orange",
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
export default DeleteModal;

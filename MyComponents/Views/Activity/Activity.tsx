import { Button, Image, Modal } from "native-base";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { GifSearch } from "react-native-gif-search";
import { v4 as uuidv4 } from "uuid";
import { Activity as _Activity, Upload } from "../../../api/interface";
import { UploadEntity } from "../../../api/spec";
import { instance } from "../../../api/config";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

export interface ActivityStateStructure {
  id: string;
  name: string;
  description: string;
  actionGif?: string;
  custom?: boolean;
}

interface ActivityProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  activity: ActivityStateStructure;
  onSubmit: (activity: ActivityStateStructure | null) => void;
}

function Activity({
  showModal,
  setShowModal,
  activity: {
    id: _id,
    name: _name,
    description: _description,
    actionGif: _actionGif,
  },
  onSubmit,
}: ActivityProps) {
  const [showGifModal, setShowGifModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [updateOperation, setUpdateOperation] = useState(!!_id);
  const [id, setId] = useState(_id ?? uuidv4());
  const [name, setName] = useState(_name ?? "");
  const [description, setDescription] = useState(_description ?? "");
  const [actionGif, setActionGif] = useState(_actionGif ?? "");
  const [removedActionGif, setRemovedActionGif] = useState(false);
  const [updatedActionGif, setUpdatedActionGif] = useState(false);
  const [updatingActionGif, setUpdatingActionGif] = useState(false);
  const [updatedActivityWithActionGif, setUpdatedActivityWithActionGif] =
    useState(false);
  const [actionGifURL, setActionGifURL] = useState<string | null>(
    !!actionGif ? `${instance.defaults.baseURL}/upload/${actionGif}` : null
  );

  async function handleSubmit() {
    // TODO check to see if this is an update operation
    // TODO if so update locally or remotely depending on the connection
    // TODO if it is not an update operation create remotely or locally depending on the connection
    // TODO if updated or created locally only, then mark for later sync

    if (updateOperation) {
      if (removedActionGif) {
        const removeResult = await Upload.removeResources({
          for: UploadEntity.ACTIVITY,
          entityID: id,
          mediaIDs: [actionGif],
        });

        if (removeResult) setActionGif("");
      }

      if (updatedActionGif) {
        const updateResult = await Upload.replaceResource(
          {
            uri: actionGifURL,
            type: "image/gif",
            name: `${actionGifURL}.gif`,
          },
          {
            for: UploadEntity.ACTIVITY,
            entityID: id,
            mediaID: actionGif,
          }
        );

        if (updateResult)
          setActionGifURL(`${instance.defaults.baseURL}/upload/${actionGif}`);

        setUpdatedActionGif(false);
      }

      const result = await _Activity.updateActivity({
        id,
        name,
        description,
        actionGif: updatedActivityWithActionGif ? actionGif : undefined,
      });

      if (result) {
        console.log("success");
        // TODO figure out what to do here
      }
      setUpdatedActivityWithActionGif(false);
    } else {
      const result = await _Activity.createActivity({
        custom: true,
        actionGif,
        description,
        name,
        id,
      });

      if (result) {
        console.log("success");
        // TODO Figure out what to do here
      }
    }

    onSubmit({ id, name, description, actionGif, custom: true });
  }

  function handleModalClose() {
    setId(uuidv4());
    setName("");
    setDescription("");
    setActionGif("");
    setActionGifURL("");
    setShowModal(false);
    setRemovedActionGif(false);
    setUpdatedActionGif(false);
    setUpdatingActionGif(false);
  }

  async function handleCreateGif(gif_url: string) {
    const result = await Upload.uploadResource(
      [
        {
          uri: gif_url,
          type: "image/gif",
          name: `${gif_url}.gif`,
        },
      ],
      UploadEntity.ACTIVITY
    );

    if (result) setActionGif(result.data[0]);
  }

  async function handleSelectGif(gif_url: string) {
    setActionGifURL(gif_url);

    if (updateOperation) {
      if (updatingActionGif) setUpdatedActionGif(true);
      else {
        await handleCreateGif(gif_url);
        setUpdatedActivityWithActionGif(true);
      }

      setUpdatingActionGif(false);
    } else {
      await handleCreateGif(gif_url);
    }

    setVisible(false);
    setShowGifModal(false);
  }

  function handleRemoveGif() {
    setActionGifURL(null);
    setRemovedActionGif(true);
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleModalClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                styles.activityGif,
                { marginRight: 15, overflow: "hidden" },
              ]}
            >
              {actionGifURL ? (
                <Image
                  height="100%"
                  width="100%"
                  alt="Action Gif"
                  resizeMode="cover"
                  style={{ borderRadius: 75 }}
                  source={{ uri: actionGifURL as string }}
                />
              ) : null}
            </View>
            Create Activity
          </Modal.Header>
          <Modal.Body>
            <TextInput
              placeholder="Name"
              value={name}
              placeholderTextColor="black"
              style={{
                color: "black",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
              onChangeText={(val) => {
                setName(val);
              }}
            />

            <TextInput
              placeholder="Description"
              value={description}
              placeholderTextColor="black"
              style={{
                color: "black",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
              onChangeText={(val) => {
                setDescription(val);
              }}
            />

            {!actionGifURL ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowGifModal(true);
                  setVisible(true);
                }}
              >
                <Text style={{ color: "white" }}>Add a GIF</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 30,
                  }}
                >
                  <Button.Group style={{ flexDirection: "row" }}>
                    <Button
                      variant={"outline"}
                      onPress={() => {
                        setUpdatingActionGif(true);
                        setShowGifModal(true);
                        setVisible(true);
                      }}
                    >
                      Change GIF
                    </Button>
                    <Button
                      variant={"solid"}
                      style={{ backgroundColor: "darkred" }}
                      onPress={handleRemoveGif}
                    >
                      Remove Gif
                    </Button>
                  </Button.Group>
                </View>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              {!_id ? (
                <Button
                  onPress={() => {
                    handleSubmit();
                    handleModalClose();
                  }}
                >
                  Create
                </Button>
              ) : (
                <Button
                  onPress={() => {
                    handleSubmit();
                    handleModalClose();
                  }}
                >
                  Update
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showGifModal}
        onClose={() => {
          setShowGifModal(false);
          setVisible(false);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>GIF Selection</Modal.Header>
          <Modal.Body>
            <View style={styles.gifContainerRouter}>
              <GifSearch
                style={styles.gifContainer}
                giphyApiKey={"bEbcELv6yDBowe2xR9Yem24sMUQflMNR"}
                onGifSelected={handleSelectGif}
                horizontal={false}
                gifsToLoad={10}
                maxGifsToLoad={25}
                visible={visible}
                numColumns={3}
                loadingSpinnerColor={"blue"}
                placeholderTextColor={"grey"}
                placeholderText={"Search an exercise "}
                textInputStyle={{
                  fontWeight: "bold",
                  color: "black",
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }}
                onBackPressed={() => {
                  setVisible(false);
                  setShowGifModal(false);
                }}
                noGifsFoundText={"No Gifs found :("}
                noGifsFoundTextStyle={{ fontWeight: "bold" }}
                onError={(error) => {
                  if (visible) {
                    Alert.alert(error);
                  }
                }}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  activityGif: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "60%",
    marginVertical: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgb(110,140,160)",
  },
  gifContainerRouter: {
    height: y * 0.5,
    alignItems: "center",
  },
  gifContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    width: "100%",
    borderColor: "rgb(50,71,85)",
    borderRadius: 20,
  },
});

export default Activity;

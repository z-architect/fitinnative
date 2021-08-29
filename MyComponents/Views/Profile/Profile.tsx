import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { signOut, logIn } from "../../Redux/profileSlice";
import {
  Input,
  Icon,
  Modal,
  Image,
  Select,
  NumberInput,
  NumberInputField,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { Props } from "../../types";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";
import { Goal, Sex } from "../../../api/spec";
import NumericInput from "react-native-numeric-input";
import DeleteModal from "../../Utils/DeleteModal";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

// console.log(x,"X",y)
const Profile = ({ navigation, route }: Props) => {
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [profileImageAsset, setProfileImageAsset] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [firstTimeToProfile, setFirstTimeToProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [firstName, setFirstName] = useState("Daniel");
  const [lastName, setLastName] = useState("Tsegaw");
  const [currentGoal, setCurrentGoal] = useState(Goal.FITNESS_MAINTENANCE);
  const [sex, setSex] = useState(Sex.MALE);
  const [weight, setWeight] = useState("55");
  const [height, setHeight] = useState("1.7");
  const [dailyWaterIntakeGoal, setDailyWaterIntakeGoal] = useState(8);
  const [dailyHoursOfSleepGoal, setDailyHoursOfSleepGoal] = useState(8);
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(new Date().getMilliseconds() - 3.784e11)
  );

  const dispatch = useAppDispatch();
  // TODO first time profile access flag is needed
  // TODO prepare an edit mode flag with in component
  // TODO prepare a flag for profile image available with in component

  function handleProfileDelete() {
    //TODO handle profile delete
    setShowDeleteModal(false);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{}}>
      <View style={styles.titleContainer}>
        {!firstTimeToProfile ? (
          <>
            <Text style={{ ...styles.title }}>Profile</Text>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              {editMode ? (
                <>
                  <TouchableOpacity onPress={() => setEditMode(false)}>
                    <AntDesign color="red" size={32} name="close" />
                  </TouchableOpacity>
                  <View style={{ width: 30 }} />
                  <TouchableOpacity onPress={() => setEditMode(false)}>
                    <AntDesign color="green" size={32} name="check" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => setEditMode(true)}>
                  <AntDesign size={32} name="edit" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ ...styles.title }}>Profile Setup</Text>
        )}
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileContainerLeft}>
          <TouchableOpacity
            style={styles.profileContainerCircle}
            onPress={() => {
              // TODO handle pic select and storage
              setShowImagePickerModal(true);
            }}
          >
            {!profileImageAsset ? (
              <AntDesign name="camera" size={60} color="rgb(217,125,84)" />
            ) : (
              <Image
                height="100%"
                width="100%"
                alt="Profile Picture"
                resizeMode="cover"
                style={{ borderRadius: 75 }}
                source={profileImageAsset}
              />
            )}
          </TouchableOpacity>
          <Modal
            isOpen={showImagePickerModal}
            onClose={() => {
              setShowImagePickerModal(false);
            }}
          >
            <Modal.Content maxWidth="400px">
              <Modal.Header>Choose profile picture</Modal.Header>
              <Modal.Body>
                <TouchableOpacity
                  style={styles.signOutButton}
                  onPress={() => {
                    // TODO handle camera
                    setShowImagePickerModal(false);
                    launchCamera(
                      { saveToPhotos: true, mediaType: "photo" },
                      (response) => {
                        if (response.didCancel || response.assets?.length !== 1)
                          return;

                        setProfileImageAsset(response.assets[0]);
                      }
                    );
                  }}
                >
                  <Text style={styles.signOutButtonText}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeProfileButton}
                  onPress={() => {
                    // TODO handle library
                    setShowImagePickerModal(false);
                    launchImageLibrary({ mediaType: "photo" }, (response) => {
                      if (response.didCancel || response.assets?.length !== 1)
                        return;

                      setProfileImageAsset(response.assets[0]);
                    });
                  }}
                >
                  <Text style={styles.signOutButtonText}>
                    Choose from library
                  </Text>
                </TouchableOpacity>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </View>

        {!editMode ? (
          <View style={styles.profileContainerRight}>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text style={{ fontSize: 22, padding: 5, fontWeight: "bold" }}>
                Daniel Tsegaw
                {/* TODO handle value */}
              </Text>
            </View>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text style={{ fontSize: 16, padding: 5, fontStyle: "italic" }}>
                dullkingsman@gmail.com
                {/* TODO handle value */}
              </Text>
            </View>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  padding: 5,
                  fontStyle: "italic",
                }}
              >
                Trainee
                {/* TODO handle value */}
              </Text>
            </View>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text
                style={{
                  color: "darkgreen",
                  fontSize: 16,
                  padding: 5,
                  fontStyle: "italic",
                }}
              >
                Active
                {/* TODO handle value */}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.profileContainerRight}>
            <View style={styles.inputLine}>
              <Input
                width={"100%"}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputLine}>
              <Input
                width={"100%"}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.dataContainer}>
        <View style={{ ...styles.inputLine, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Personal information
          </Text>
        </View>
        <View style={styles.dataContainerInside}>
          <View style={styles.inputLine}>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 18,
                width: editMode ? "30%" : "50%",
                textAlign: "left",
              }}
            >
              Date of birth
            </Text>
            {editMode ? (
              <TouchableOpacity
                style={{ width: editMode ? "70%" : "50%" }}
                onPress={() => setShowDatePicker(true)}
              >
                <Input
                  p={2}
                  isDisabled={true}
                  variant="filled"
                  value={dateOfBirth.toDateString()}
                />
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: 18, fontWeight: "bold", width: "50%" }}>
                {dateOfBirth.toDateString()}
              </Text>
            )}

            <Modal
              isOpen={showDatePicker}
              onClose={() => {
                setShowDatePicker(false);
              }}
            >
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Choose date</Modal.Header>
                <Modal.Body>
                  <DatePicker
                    testID={"dateOfBirthPicker"}
                    date={dateOfBirth}
                    mode={"date"}
                    onDateChange={setDateOfBirth}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </View>
          <View style={styles.inputLine}>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 18,
                width: editMode ? "30%" : "50%",
              }}
            >
              Sex
            </Text>
            {editMode ? (
              <Select
                selectedValue={sex}
                width={editMode ? "70%" : "50%"}
                accessibilityLabel={`Gender selector`}
                placeholder={`Choose your gender`}
                onValueChange={(value) => setSex(value as Sex)}
              >
                {Object.values(Sex).map((value) => (
                  <Select.Item key={value} label={value} value={value} />
                ))}
              </Select>
            ) : (
              <Text style={{ fontSize: 18, fontWeight: "bold", width: "50%" }}>
                {sex}
              </Text>
            )}
          </View>
          {firstTimeToProfile ? (
            <>
              <View style={styles.inputLine}>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 18,
                    width: editMode ? "30%" : "50%",
                  }}
                >
                  Weight
                </Text>
                <View style={{ width: editMode ? "70%" : "50%" }}>
                  <Input
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                  />
                </View>
              </View>
              <View style={styles.inputLine}>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 18,
                    width: editMode ? "30%" : "50%",
                  }}
                >
                  Height
                </Text>
                <View style={{ width: editMode ? "70%" : "50%" }}>
                  <Input
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                  />
                </View>
              </View>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={{ ...styles.inputLine, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Long term goal
          </Text>
        </View>
        <View style={styles.dataContainerInside}>
          <View style={styles.inputLine}>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 18,
                width: editMode ? "30%" : "50%",
              }}
            >
              Goal
            </Text>
            {editMode ? (
              <Select
                selectedValue={currentGoal}
                width={editMode ? "70%" : "50%"}
                accessibilityLabel={`Gender selector`}
                placeholder={`Choose your gender`}
                onValueChange={(value) => setCurrentGoal(value as Goal)}
              >
                {Object.values(Goal).map((value) => (
                  <Select.Item key={value} label={value} value={value} />
                ))}
              </Select>
            ) : (
              <Text style={{ fontSize: 18, fontWeight: "bold", width: "50%" }}>
                {currentGoal}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={{ ...styles.inputLine, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Daily goals</Text>
        </View>
        <View style={styles.dataContainerInside}>
          {/**
           * Do not touch the following empty views or you will be fired
           */}
          <View />
          <View />
          <View />
          <View />
          <View />

          <View style={styles.inputLine}>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 18,
                width: editMode ? "30%" : "50%",
              }}
            >
              Hours of sleep
            </Text>
            <View style={{ width: editMode ? "70%" : "50%" }}>
              {editMode ? (
                <NumericInput
                  containerStyle={{ width: "100%" }}
                  value={dailyHoursOfSleepGoal}
                  onChange={setDailyHoursOfSleepGoal}
                />
              ) : (
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {dailyHoursOfSleepGoal}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.inputLine}>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 18,
                width: editMode ? "30%" : "50%",
              }}
            >
              Glasses of water
            </Text>
            <View style={{ width: editMode ? "70%" : "50%" }}>
              {editMode ? (
                <NumericInput
                  containerStyle={{ width: "100%" }}
                  value={dailyWaterIntakeGoal}
                  onChange={setDailyWaterIntakeGoal}
                />
              ) : (
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {dailyWaterIntakeGoal}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {firstTimeToProfile ? (
        <View style={styles.activityContainer}>
          <View style={{ ...styles.inputLine, marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Activity level
            </Text>
          </View>
          <View style={styles.circlesContainer}>
            <TouchableOpacity style={styles.activityBoxes}>
              <View style={styles.circles}>
                <FontAwesome name="couch" size={40} color="grey" />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Sedentery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityBoxes}>
              <View style={styles.circles}>
                <FontAwesome name="walking" size={40} color="grey" />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Average
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityBoxes}>
              <View style={styles.circles}>
                <FontAwesome name="running" size={40} color="grey" />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Active
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {!editMode ? (
        <View style={styles.removeProfileButtonContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => {
              console.log("signout handled"); // TODO handle signout
            }}
          >
            <Text style={styles.signOutButtonText}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeProfileButton}
            onPress={() => setShowDeleteModal(true)}
          >
            <Text style={styles.removeProfileButtonText}>Remove profile</Text>
          </TouchableOpacity>
          <DeleteModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            onDelete={handleProfileDelete}
            prompt={"Do you really want to delete your profile?"}
          />
        </View>
      ) : null}

      {firstTimeToProfile ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            setFirstTimeToProfile(true);
            navigation.navigate("Goal");
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: y,
    // borderWidth: 2,
    //  borderColor:"pink",
    backgroundColor: "rgb(241,243,245)",
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inputLine: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // marginHorizontal: 10,
    // width: "80%",
    //backgroundColor: "pink",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
  },
  profileContainer: {
    shadowColor: "grey",
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    flexDirection: "row",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    borderRadius: 10,
    alignItems: "center",
    // alignItems: "center"
  },
  profileContainerLeft: {
    width: "35%",

    justifyContent: "center",
    alignItems: "center",
  },
  profileContainerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainerRight: {
    // alignItems: "baseline"
    // backgroundColor: "pink",
    width: "70.7%",
  },
  dataContainer: {
    shadowColor: "grey",
    backgroundColor: "white",
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    borderRadius: 10,
  },
  dataContainerInside: {
    // marginHorizontal: "1%",
    // borderWidth: 1
  },
  activityContainer: {
    shadowColor: "grey",
    backgroundColor: "white",
    margin: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
  removeProfileButtonContainer: {
    shadowColor: "grey",
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 20,
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    borderRadius: 10,
  },
  signOutButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  signOutButtonText: { color: "#324755", fontSize: 20 },
  removeProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  removeProfileButtonText: { color: "red", fontSize: 20 },

  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  circles: {
    borderRadius: 40,
    width: 80,
    height: 80,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  nextButton: {
    width: "60%",
    marginHorizontal: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    height: y * 0.07,
    borderRadius: 30,
    margin: 20,
    backgroundColor: "rgb(50,71,85)",
  },
  activityContainerText: {
    fontSize: 23,
    paddingLeft: 30,
    fontWeight: "bold",
  },
  activityBoxes: {},
  activityBoxesTitle: {},
});
export default Profile;

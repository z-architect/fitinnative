import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Image, Input, Modal, Select } from "native-base";
import { Props } from "../../types";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import DatePicker from "react-native-date-picker";
import {
  ActivityLevel,
  Goal,
  ProfileUpdateRequestSpec,
  Sex,
  UploadEntity,
} from "../../../api/spec";
import NumericInput from "react-native-numeric-input";
import DeleteModal from "../../Utils/DeleteModal";
import { Access, Profile as _Profile, Upload } from "../../../api/interface";
import { instance } from "../../../api/config";
import {
  removeProfile,
  signOut,
  updateFirstTimeToProfile,
  updateProfileState,
} from "../../Redux/profilesSlice";
import { useNetInfo } from "@react-native-community/netinfo";

const y = Dimensions.get("window").height;

const Profile = ({ navigation }: Props) => {
  const profile = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile]
  );
  const dispatch = useAppDispatch();

  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [profileImageAsset, setProfileImageAsset] = useState<any>(
    profile.user?.profilePicture
      ? {
          uri: `${instance.defaults.baseURL}/upload/${profile.user?.profilePicture}`,
        }
      : null
  );
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profile.user?.profilePicture
  );
  const [email] = useState(profile.user?.email);
  const [role] = useState(profile.user?.role);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    profile.user?.activityLevel || ActivityLevel.AVERAGE
  );
  const [firstName, setFirstName] = useState(profile.user?.firstName);
  const [lastName, setLastName] = useState(profile.user?.lastName);
  const [currentGoal, setCurrentGoal] = useState(profile.user?.currentGoal);
  const [sex, setSex] = useState(profile.user?.sex);
  const [dailyWaterIntakeGoal, setDailyWaterIntakeGoal] = useState(
    profile.user?.dailyGlassesOfWater
  );
  const [dailyHoursOfSleepGoal, setDailyHoursOfSleepGoal] = useState(
    profile.user?.dailyHoursOfSleep
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(
      profile.user?.dateOfBirth || new Date().getMilliseconds() - 3.784e11
    )
  );

  useEffect(() => void fetchProfile(), []);

  async function fetchProfile() {
    const result = await _Profile.getOwnProfile();

    if (result)
      dispatch(updateProfileState(result.data as ProfileUpdateRequestSpec));
  }

  async function handleProfileUpload(asset: Asset) {
    const result = await Upload.uploadResource([asset], UploadEntity.CONSUMER);
    if (result) {
      setProfileImageAsset(asset);
      setProfilePicture(result.data[0]);
    }
  }

  async function handleProfileDelete() {
    const result = await _Profile.removeProfile();
    if (result) {
      dispatch(removeProfile());

      setShowDeleteModal(false);
      navigation.navigate("Login");
    }
  }

  function getProfileObject() {
    const _profile: any = {};

    if (profilePicture) _profile.profilePicture = profilePicture;
    if (firstName) _profile.firstName = firstName;
    if (lastName) _profile.lastName = lastName;
    if (dateOfBirth) _profile.dateOfBirth = dateOfBirth;
    if (sex) _profile.sex = sex;
    if (currentGoal) _profile.currentGoal = currentGoal;
    if (dailyWaterIntakeGoal)
      _profile.dailyGlassesOfWater = dailyWaterIntakeGoal;
    if (dailyHoursOfSleepGoal)
      _profile.dailyHoursOfSleep = dailyHoursOfSleepGoal;
    if (selectedActivityLevel) _profile.activityLevel = selectedActivityLevel;

    return _profile;
  }

  async function updateProfile() {
    const _profile = getProfileObject();
    const result = await _Profile.updateProfile(_profile);

    if (result)
      dispatch(updateProfileState(_profile as ProfileUpdateRequestSpec));
    return result;
  }

  async function handleFirstTimeProfileSetting() {
    const result = await updateProfile();

    if (result) {
      dispatch(updateFirstTimeToProfile());
      navigation.navigate("Goal");
    } else console.log({ result });
  }

  async function handleProfileUpdate() {
    await updateProfile();
    setEditMode(false);
  }

  async function handleSignOut() {
    const result = await Access.signOut();
    if (result) {
      dispatch(signOut());
      navigation.navigate("Login");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{}}>
      <View style={styles.titleContainer}>
        {!profile.firstTimeToProfile ? (
          <>
            <Text style={{ ...styles.title }}>Profile</Text>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              {editMode ? (
                <>
                  <TouchableOpacity onPress={() => setEditMode(false)}>
                    <AntDesign color="red" size={32} name="close" />
                  </TouchableOpacity>
                  <View style={{ width: 30 }} />
                  <TouchableOpacity onPress={handleProfileUpdate}>
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
            activeOpacity={editMode ? undefined : 1}
            onPress={() => {
              if (editMode) setShowImagePickerModal(true);
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
                source={{
                  uri: `${instance.defaults.baseURL}/upload/${profilePicture}`,
                }}
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

                        void handleProfileUpload(response.assets[0]);
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
                    launchImageLibrary(
                      { selectionLimit: 1, mediaType: "photo" },
                      (response) => {
                        if (response.didCancel || response.assets?.length !== 1)
                          return;

                        void handleProfileUpload(response.assets[0]);
                      }
                    );
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

        {!editMode && !profile.firstTimeToProfile ? (
          <View style={styles.profileContainerRight}>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text style={{ fontSize: 22, padding: 5, fontWeight: "bold" }}>
                {`${firstName} ${lastName}`}
                {/* TODO handle value */}
              </Text>
            </View>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text style={{ fontSize: 16, padding: 5, fontStyle: "italic" }}>
                {email}
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
                {role}
                {/* TODO handle value */}
              </Text>
            </View>
            <View style={{ ...styles.inputLine, paddingVertical: 0 }}>
              <Text
                style={{
                  color:
                    selectedActivityLevel === ActivityLevel.SEDENTARY
                      ? "saddlebrown"
                      : selectedActivityLevel === ActivityLevel.AVERAGE
                      ? "darkblue"
                      : "darkgreen",
                  fontSize: 16,
                  padding: 5,
                  fontStyle: "italic",
                }}
              >
                {selectedActivityLevel}
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
            {editMode || profile.firstTimeToProfile ? (
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
            {editMode || profile.firstTimeToProfile ? (
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
        </View>
      </View>

      {!profile.firstTimeToProfile ? (
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
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", width: "50%" }}
                >
                  {currentGoal}
                </Text>
              )}
            </View>
          </View>
        </View>
      ) : null}

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
              {editMode || profile.firstTimeToProfile ? (
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
              {editMode || profile.firstTimeToProfile ? (
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

      {profile.firstTimeToProfile ? (
        <View style={styles.activityContainer}>
          <View style={{ ...styles.inputLine, marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Activity level
            </Text>
          </View>
          <View style={styles.circlesContainer}>
            <TouchableOpacity
              style={styles.activityBoxes}
              onPress={() => setSelectedActivityLevel(ActivityLevel.SEDENTARY)}
            >
              <View
                style={{
                  ...styles.circles,
                  borderColor:
                    selectedActivityLevel === ActivityLevel.SEDENTARY
                      ? "rgb(100,71,85)"
                      : "grey",
                }}
              >
                <FontAwesome
                  name="couch"
                  size={40}
                  color={
                    selectedActivityLevel === ActivityLevel.SEDENTARY
                      ? "rgb(100,71,85)"
                      : "grey"
                  }
                />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Sedentery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activityBoxes}
              onPress={() => setSelectedActivityLevel(ActivityLevel.AVERAGE)}
            >
              <View
                style={{
                  ...styles.circles,
                  borderColor:
                    selectedActivityLevel === ActivityLevel.AVERAGE
                      ? "rgb(50,71,165)"
                      : "grey",
                }}
              >
                <FontAwesome
                  name="walking"
                  size={40}
                  color={
                    selectedActivityLevel === ActivityLevel.AVERAGE
                      ? "rgb(50,71,165)"
                      : "grey"
                  }
                />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Average
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activityBoxes}
              onPress={() => setSelectedActivityLevel(ActivityLevel.ACTIVE)}
            >
              <View
                style={{
                  ...styles.circles,
                  borderColor:
                    selectedActivityLevel === ActivityLevel.ACTIVE
                      ? "rgb(50, 141, 85)"
                      : "grey",
                }}
              >
                <FontAwesome
                  name="running"
                  size={40}
                  color={
                    selectedActivityLevel === ActivityLevel.ACTIVE
                      ? "rgb(50, 141, 85)"
                      : "grey"
                  }
                />
              </View>
              <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                Active
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {!editMode && !profile.firstTimeToProfile ? ( //TODO add !firstTimeToProfile
        <View style={styles.removeProfileButtonContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
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

      {profile.firstTimeToProfile ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            void handleFirstTimeProfileSetting();
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

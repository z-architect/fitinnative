import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "native-base";
import Emoji from "react-native-emoji";
import * as yup from "yup";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Formik } from "formik";
import { Props } from "../../types";
import { useAppDispatch } from "../../Redux/hooks";
import { logIn } from "../../Redux/profileSlice";
import { FirebaseAccessMethod, Role, Sex } from "../../../api/spec";
import { Access } from "../../../api/interface";
import { onAuthStateChanged, signupToFirebase } from "../../../api/utils";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const y = Dimensions.get("window").height;

const signupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short")
    .max(15, "Too Long!")
    .required("Your Name is required"),
  lastName: yup.string().required("Your Middle Name is required"),
  email: yup.string().email("Please enter valid email"),
  phoneNumber: yup
    .string()
    .matches(/(\+251)(\d){9}\b/, "Enter a valid phone number"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  dateOfBirth: yup.date().required("Your Date of Birth is Neccesary"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Signup = ({ navigation }: Props) => {
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: new Date(new Date().getMilliseconds() - 3.784e11),
    sex: Sex.MALE,
    role: Role.TRAINEE,
    password: "",
    confirmPassword: "",
  };

  const [pagePosition, setPagePosition] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useAppDispatch();

  // function automaticSignup() {
  //   void handleSubmit({
  //     firstName: "Daniel",
  //     middleName: "",
  //     lastName: "Tsegaw",
  //     email: "dullkingsman@gmail.com",
  //     phoneNumber: "+251975250953",
  //     dateOfBirth: "2021-08-25T14:33:09.429Z",
  //     sex: Sex.MALE,
  //     role: Role.TRAINEE,
  //     password: "alabama",
  //     confirmPassword: "alabama",
  //   });
  // }

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  const handleSubmit = async (values: any) => {
    console.log(pagePosition);
    if (pagePosition < 2) {
      handleNext();
      return;
    }

    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      sex,
      dateOfBirth,
      role,
      password,
    } = values;

    try {
      const fireResult = await signupToFirebase(
        FirebaseAccessMethod.EMAIL_AND_PASSWORD,
        {
          email,
          password,
        }
      );

      await onAuthStateChanged(
        (fireResult as FirebaseAuthTypes.UserCredential).user
      );
    } catch (err) {
      console.error(err);
      // TODO handle firebase signup failure
    }

    try {
      const result = await Access.signup({
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        sex,
        dateOfBirth,
        role,
      });

      if (result) {
        await AsyncStorage.setItem(
          "@profile",
          JSON.stringify({ profile: result.data })
        );
        await dispatch(logIn());
        navigation.navigate("Profile");
      } else {
        // TODO handle fitin signup failure
      }
    } catch (err) {
      console.error(err);
    }
  };

  function handleNext() {
    setPagePosition(pagePosition + 1);
  }

  function handleBack() {
    setPagePosition(pagePosition - 1);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.logoContainer}>
        <View
          style={{
            transform: [{ rotate: "45deg" }],
          }}
        >
          <AntDesign name="closesquareo" color="white" size={60} />
        </View>

        <Text style={styles.logoText}>FIT IN </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={signupValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
          } = formik;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>Sign Up</Text>
              </View>
              <View style={styles.form}>
                {/* <Text style={{ borderBottomWidth: 1, fontSize: 18, marginVertical: 20 }}>  </Text> */}
                <View
                  style={{
                    marginTop: 5,
                    marginBottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {pagePosition !== 0 ? (
                    <TouchableOpacity onPress={() => handleBack()}>
                      <AntDesign name={"left"} size={22} />
                    </TouchableOpacity>
                  ) : null}
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      fontSize: 18,
                      marginLeft: pagePosition === 0 ? 0 : 10,
                      color: "grey",
                      fontWeight: "bold",
                      borderColor: "lightgrey",
                      width: pagePosition === 0 ? "100%" : "87%",
                    }}
                  >
                    {pagePosition === 0
                      ? "Who are you?"
                      : pagePosition === 1
                      ? "Getting to know you"
                      : "Security"}
                  </Text>
                </View>

                {pagePosition === 0 ? (
                  <>
                    <Text style={styles.label}>First Name</Text>
                    <Input
                      p={2}
                      placeholder=""
                      variant="filled"
                      isInvalid={!!(errors.firstName && touched.firstName)}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                    />
                    {errors.firstName && touched.firstName && (
                      <Text style={styles.errorLabel}>{errors.firstName}</Text>
                    )}
                    <Text style={styles.label}>Last Name</Text>
                    <Input
                      p={2}
                      placeholder=""
                      variant="filled"
                      isInvalid={!!(errors.lastName && touched.lastName)}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                    />
                    {errors.lastName && touched.lastName && (
                      <Text style={styles.errorLabel}>{errors.lastName}</Text>
                    )}
                  </>
                ) : pagePosition === 1 ? (
                  <>
                    <Text style={styles.label}>PhoneNumber</Text>
                    <PhoneInput
                      containerStyle={styles.phoneNumber}
                      textContainerStyle={styles.phoneNumberInputContainer}
                      defaultValue={values.phoneNumber}
                      defaultCode="ET"
                      layout="first"
                      onChangeFormattedText={handleChange("phoneNumber")}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text style={styles.errorLabel}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <Text style={styles.label}>Sex</Text>
                    <Select
                      selectedValue={values.sex}
                      minWidth={200}
                      accessibilityLabel={`Gender selector`}
                      placeholder={`Choose your gender`}
                      onValueChange={handleChange("sex")}
                    >
                      {Object.values(Sex).map((value) => (
                        <Select.Item key={value} label={value} value={value} />
                      ))}
                    </Select>
                    {errors.sex && touched.sex && (
                      <Text style={styles.errorLabel}>{errors.sex}</Text>
                    )}
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Input
                        p={2}
                        isDisabled={true}
                        placeholder={new Date(
                          values.dateOfBirth
                        ).toDateString()}
                        variant="filled"
                        isInvalid={
                          !!(errors.dateOfBirth && touched.dateOfBirth)
                        }
                        value={new Date(values.dateOfBirth).toDateString()}
                      />
                    </TouchableOpacity>

                    <Modal
                      isOpen={showDatePicker}
                      onClose={() => {
                        setShowDatePicker(false);
                        setShowDatePicker(false);
                      }}
                    >
                      <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Choose date</Modal.Header>
                        <Modal.Body>
                          <DatePicker
                            testID={"dateOfBirthPicker"}
                            date={new Date(values.dateOfBirth)}
                            mode={"date"}
                            onDateChange={(date) =>
                              handleChange("dateOfBirth")(date.toISOString())
                            }
                          />
                        </Modal.Body>
                      </Modal.Content>
                    </Modal>

                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <Text style={styles.errorLabel}>
                        {errors.dateOfBirth}
                      </Text>
                    )}
                    <Text style={styles.label}>Role</Text>
                    <Select
                      selectedValue={values.role}
                      minWidth={200}
                      accessibilityLabel={`Gender role`}
                      placeholder={`Choose your role`}
                      onValueChange={handleChange("role")}
                    >
                      {Object.values(Role).map((value) => (
                        <Select.Item key={value} label={value} value={value} />
                      ))}
                    </Select>
                    {errors.role && touched.role && (
                      <Text style={styles.errorLabel}>{errors.role}</Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.label}>Email</Text>
                    <Input
                      p={2}
                      placeholder=""
                      variant="filled"
                      isInvalid={!!(errors.email && touched.email)}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorLabel}>{errors.email}</Text>
                    )}
                    <Text style={styles.label}>Password</Text>
                    <Input
                      p={2}
                      type="password"
                      placeholder=""
                      variant="filled"
                      isInvalid={!!(errors.password && touched.password)}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorLabel}>{errors.password}</Text>
                    )}
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input
                      p={2}
                      type="password"
                      placeholder=""
                      variant="filled"
                      isInvalid={
                        !!(errors.confirmPassword && touched.confirmPassword)
                      }
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={styles.errorLabel}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </>
                )}

                {pagePosition === 2 ? (
                  <Button
                    // disabled={!(dirty && isValid)}
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    // disabled={!(dirty && isValid)}
                    onPress={handleNext}
                    style={styles.nextButton}
                  >
                    Next
                  </Button>
                )}
              </View>
            </View>
          );
        }}
      </Formik>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}> Already Have an account?</Text>
        <TouchableOpacity style={{}}>
          <Text
            style={{ fontSize: 18, color: "white" }}
            onPress={() => {
              setPagePosition(0);
              navigation.navigate("Login");
            }}
          >
            Login <Emoji name="smiley" style={{ fontSize: 22 }} />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "rgb(50,71,85)",
    height: y,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    // position: "absolute",
    // top: 25,
    height: y * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 40,
    color: "white",
  },
  card: {
    borderRadius: 40,
    width: "80%",
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    backgroundColor: "white",
    padding: 20,
  },
  cardHeader: {
    borderBottomWidth: 1,
    marginVertical: 20,
    // alignItems: "center"
  },
  cardHeaderText: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    //  backgroundColor: "yellow"
  },
  label: {},
  errorLabel: {
    color: "red",
    fontSize: 14,
  },
  phoneNumber: {
    height: 50,
    width: "100%",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
  },
  phoneNumberInputContainer: {
    paddingVertical: 0,
    marginVertical: 0,
    height: "100%",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "rgb(217,125,84)",
    marginVertical: 15,
  },
  nextButtonText: {
    color: "rgba(5,95,125,0)",
  },
  nextButton: {
    marginVertical: 15,
    backgroundColor: "black",
  },
  bottomTextContainer: {
    // position: "absolute",
    // bottom: 25,
    marginVertical: 20,
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontSize: 14,
  },
});
export default Signup;

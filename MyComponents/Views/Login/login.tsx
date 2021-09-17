import React, { useEffect, useState } from "react";
import { Button, Input } from "native-base";
import Emoji from "react-native-emoji";
import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logIn } from "../../Redux/profilesSlice";
import { onAuthStateChanged, signinToFirebase } from "../../../api/utils";
import { FirebaseAccessMethod, Subscription } from "../../../api/spec";
import { Access } from "../../../api/interface";
import { RootState } from "../../Redux/store";

import strings from "./strings";
import { Language } from "../../Redux/profilesSlice";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Please enter valid email"),
  phoneNumber: yup.string().matches(/(\d){8}\b/, "Enter a valid phone number"),
  password: yup.string().required("Password is required"),
});

const Login = ({ navigation, route }: Props) => {
  const profiles = useAppSelector((state: RootState) => state.profiles);
  const dispatch = useAppDispatch();
  const language = useAppSelector(state => state.profiles.profiles[state.profiles.activeProfile]?.settings?.language);
  const initialValues = {
    email: "",
    password: "",
    phoneNumber: "",
  };
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    console.log(profiles);
  }, []);

  ////////////////////////////////
  //   PHone Auth
  //////////////////////////////////

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState("");

  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await Auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      if (confirm !== null) await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  const HandleSubmit = async (values: any) => {
    const { email, password, phoneNumber } = values;

    try {
      const fireResult = await signinToFirebase(
        FirebaseAccessMethod.EMAIL_AND_PASSWORD,
        {
          email,
          password,
        }
      );

      await onAuthStateChanged(
        (fireResult as FirebaseAuthTypes.UserCredential).user
      );

      const result = await Access.signin();

      if (result) {
        // TODO remove
        // await AsyncStorage.setItem(
        //   "@profile",
        //   JSON.stringify({ profile: result.data })
        // );

        await dispatch(
          logIn({
            user: {
              ...result.data,
              subscriptionPlan: Subscription.FREE, // TODO send back subscriptionPlan data
            },
          })
        );
        navigation.navigate("Home");
      } else {
        // TODO handle fitin signup failure
      }
    } catch (err) {
      console.error(err);
      // TODO handle firebase signup failure
    }
  };

  if (!user) {
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
          validationSchema={loginValidationSchema}
          onSubmit={HandleSubmit}
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
                  <Text style={styles.cardHeaderText}>{strings[language].login}</Text>
                </View>
                <View style={styles.form}>
                  {true ? (
                    <>
                      <Text style={styles.label}>{strings[language].email}</Text>
                      <Input
                        p={2}
                        placeholder=""
                        variant="filled"
                        isInvalid={errors.email && touched.email ? true : false}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorLabel}>{errors.email}</Text>
                      )}
                    </>
                  ) : (
                    <>
                      <Text style={styles.label}>PhoneNumber</Text>
                      <Input
                        p={2}
                        placeholder=""
                        variant="filled"
                        isInvalid={
                          errors.phoneNumber && touched.phoneNumber
                            ? true
                            : false
                        }
                        value={values.phoneNumber}
                        onChangeText={handleChange("phoneNumber")}
                        onBlur={handleBlur("phoneNumber")}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={styles.errorLabel}>
                          {errors.phoneNumber}
                        </Text>
                      )}
                    </>
                  )}

                  <Text style={styles.label}>{strings[language].password}</Text>
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
                  <Button
                    disabled={false}
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    {strings[language].login}
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>{strings[language].donthaveanaccount}</Text>
          <TouchableOpacity style={{}}>
            <Text
              style={{ fontSize: 18, color: "white" }}
              onPress={() => navigation.navigate("Signup")}
            >
              {strings[language].signup} <Emoji name="smiley" style={{ fontSize: 22 }} />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    position: "relative",
    backgroundColor: "rgb(50,71,85)",
    height: y,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    position: "absolute",
    top: 25,
    height: y * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 40,
    color: "white",
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 25,
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontSize: 14,
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
  },
  cardHeaderText: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    //backgroundColor: "yellow"
  },
  label: {},
  errorLabel: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "rgb(217,125,84)",
    marginVertical: 15,
  },
});
export default Login;

import React, { useState, useEffect } from "react";
import {
    Input,
    Icon,
    Button

} from "native-base";
import Auth from '@react-native-firebase/auth';
import Emoji from 'react-native-emoji';
import * as yup from 'yup';
import { View, Text, Alert, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Formik, Field } from 'formik';
import { Props } from '../../types'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { signOut, logIn } from '../../Redux/userSlice';

//import Axios from 'axios';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const signupValidationSchema = yup.object().shape({
    FirstName: yup
        .string()
        .min(2, "Too Short")
        .max(15, "Too Long!")
        .required('Your Name is required'),
    LastName: yup
        .string()
        .required('Your Middle Name is required'),
    Email: yup
        .string()
        .email("Please enter valid email"),
    PhoneNumber: yup
        .string()
        .matches(/(01)(\d){8}\b/, 'Enter a valid phone number'),
    Password: yup
        .string()
        .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    DateOfBirth: yup
        .string()
        .required('Your Date of Birth is Neccesary'),
    ConfirmPassword: yup
        .string()
        .oneOf([yup.ref('Password')], 'Passwords do not match')
        .required('Confirm password is required'),
})

const Signup = ({ navigation, route }: Props) => {
    const initialValues = {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        DateOfBirth: "",
        Sex: "",
        Role: "",
        Password: "",
        ConfirmPassword: ""
    }
    const dispatch = useAppDispatch();
    const HandleSubmit = async (values: any) => {
        // Alert.alert(JSON.stringify(values))
        await dispatch(logIn());
        navigation.navigate("Profile")
        // try {


        //     let response = await Auth().createUserWithEmailAndPassword(values.Email, values.Password);
        //     if (response && response.user) {
        //         Alert.alert("success", "account succesfully create");
        //     }

        // } catch (e) {
        //     Alert.alert("error ", e.message)
        // }
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentcontainer}>
            <View style={styles.logocontainer}>
                <View style={{
                    transform: [{ rotate: "45deg" }]
                }}>
                    <AntDesign name="closesquareo" color="white" size={60} />
                </View>

                <Text style={styles.logotext}>FIT IN </Text>
            </View>
            <Formik
                initialValues={initialValues}
                validationSchema={signupValidationSchema}
                onSubmit={HandleSubmit}>
                {(formik) => {
                    const { values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty
                    } = formik;
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardheader}>
                                <Text style={styles.cardheadertext}>SignUP</Text>
                            </View>
                            <View style={styles.form}>
                                {/* <Text style={{ borderBottomWidth: 1, fontSize: 18, marginVertical: 20 }}>  </Text> */}
                                <Text style={styles.label}>First Name*</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.FirstName && touched.FirstName ? true : false} value={values.FirstName} onChangeText={handleChange('FirstName')} onBlur={handleBlur('FirstName')} />
                                {errors.FirstName && touched.FirstName && (
                                    <Text style={styles.errorlabel}>{errors.FirstName}</Text>
                                )}
                                <Text style={styles.label}>Last Name*</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.LastName && touched.LastName ? true : false} value={values.LastName} onChangeText={handleChange('LastName')} onBlur={handleBlur('LastName')} />
                                {errors.LastName && touched.LastName && (
                                    <Text style={styles.errorlabel}>{errors.LastName}</Text>
                                )}
                                <Text style={styles.label}>Email</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.Email && touched.Email ? true : false} value={values.Email} onChangeText={handleChange('Email')} onBlur={handleBlur('Email')} />
                                {errors.Email && touched.Email && (
                                    <Text style={styles.errorlabel}>{errors.Email}</Text>
                                )}

                                <Text style={{ borderBottomWidth: 1, fontSize: 18, marginVertical: 20, fontWeight: "bold" }}>   Getting to Know you </Text>

                                <Text style={styles.label}>PhoneNumber</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.PhoneNumber && touched.PhoneNumber ? true : false} value={values.PhoneNumber} onChangeText={handleChange('PhoneNumber')} onBlur={handleBlur('PhoneNumber')} />
                                {errors.PhoneNumber && touched.PhoneNumber && (
                                    <Text style={styles.errorlabel}>{errors.PhoneNumber}</Text>
                                )}
                                <Text style={styles.label}>Sex</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.Sex && touched.Sex ? true : false} value={values.Sex} onChangeText={handleChange('Sex')} onBlur={handleBlur('Sex')} />
                                {errors.Sex && touched.Sex && (
                                    <Text style={styles.errorlabel}>{errors.Sex}</Text>
                                )}
                                <Text style={styles.label}>Date of Birth</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.DateOfBirth && touched.DateOfBirth ? true : false} value={values.DateOfBirth} onChangeText={handleChange('DateOfBirth')} onBlur={handleBlur('DateOfBirth')} />
                                {errors.DateOfBirth && touched.DateOfBirth && (
                                    <Text style={styles.errorlabel}>{errors.DateOfBirth}</Text>
                                )}
                                <Text style={styles.label}>Role</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.Role && touched.Role ? true : false} value={values.Role} onChangeText={handleChange('Role')} onBlur={handleBlur('Role')} />
                                {errors.Role && touched.Role && (
                                    <Text style={styles.errorlabel}>{errors.Role}</Text>
                                )}

                                <Text style={{ borderBottomWidth: 1, fontSize: 18, marginVertical: 20, fontWeight: "bold" }}>  Securtiy </Text>

                                <Text style={styles.label}>PassWord</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.Password && touched.Password ? true : false} value={values.Password} onChangeText={handleChange('Password')} onBlur={handleBlur('Password')} />
                                {errors.Password && touched.Password && (
                                    <Text style={styles.errorlabel}>{errors.Password}</Text>
                                )}
                                <Text style={styles.label}>Confirm Password</Text>
                                <Input p={2} placeholder="" variant="filled" isInvalid={errors.ConfirmPassword && touched.ConfirmPassword ? true : false} value={values.ConfirmPassword} onChangeText={handleChange('ConfirmPassword')} onBlur={handleBlur('ConfirmPassword')} />
                                {errors.ConfirmPassword && touched.ConfirmPassword && (
                                    <Text style={styles.errorlabel}>{errors.ConfirmPassword}</Text>
                                )}
                                <Button
                                    //disabled={!(dirty && isValid) ? true : false} 
                                    onPress={handleSubmit} style={styles.button}>
                                    Sign Up
                                </Button>
                            </View>
                        </View>)
                }
                }
            </Formik>
            <View style={styles.bottomtextcontainer}>
                <Text style={styles.bottomtext}> Already Have an account?</Text>
                <TouchableOpacity style={{}}><Text style={{ fontSize: 18, color: "white" }} onPress={() => navigation.navigate("Login")}>Log In <Emoji name="smiley" style={{ fontSize: 22 }} /></Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentcontainer: {
        // flex: 1,
        backgroundColor: "rgb(50,71,85)",
        //backgroundColor: "rgb(241,243,245)",

        alignItems: "center"

    },
    logocontainer: {
        // position: "absolute",
        // top: 25,
        height: y * 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    logotext: {
        fontSize: 40,
        color: "white"
    },
    card: {
        borderRadius: 40,
        width: "90%",
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        backgroundColor: "white",
        padding: 20
    },
    cardheader: {
        borderBottomWidth: 1,
        marginVertical: 20,
        // alignItems: "center"
    },
    cardheadertext: {
        padding: 20,
        fontSize: 30
        , fontWeight: "bold"
    },
    form: {
        //  backgroundColor: "yellow"
    },
    label: {

    },
    errorlabel: {
        color: "red",
        fontSize: 14
    },
    button: {
        backgroundColor: "rgb(217,125,84)",
        marginVertical: 15
    },
    bottomtextcontainer: {
        // position: "absolute",
        // bottom: 25,
        marginVertical: 20,
        alignItems: "center"
    },
    bottomtext: {
        color: "white",
        fontSize: 14
    },
})
export default Signup;


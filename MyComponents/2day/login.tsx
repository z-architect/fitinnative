import React, { useState, useEffect } from "react";
import {

    Input,
    Icon,
    Button

} from "native-base";
import * as yup from 'yup';
import { View, Text, TouchableOpacity, Alert, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Formik, Field } from 'formik'
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const loginValidationSchema = yup.object().shape({
    Email: yup
        .string()
        .email("Please enter valid email"),
    PhoneNumber: yup
        .string()
        .matches(/(\d){8}\b/, 'Enter a valid phone number'),
    Password: yup
        .string()
        .required('Password is required'),

});

const Login = () => {

    const initialValues = {
        Email: "",
        Password: "",
        PhoneNumber: ""
    }

    const [Email, SetEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Password, setPassword] = useState("");

    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const HandleSubmit = (values: any) => {
        Alert.alert(JSON.stringify(values))
    }
    return (
        <View style={styles.container}>

            <View style={styles.logocontainer}>
                <View style={{
                    transform: [{ rotate: "45deg" }]
                }}>
                    <AntDesign name="closesquareo" color="white" size={60} />
                </View>

                <Text style={styles.logotext}>FIT IN</Text>
            </View>
            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
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
                    return (<View style={styles.card}>
                        <View style={styles.cardheader}>
                            <Text style={styles.cardheadertext}>Signup</Text>
                        </View>
                        <View style={styles.form}>
                            {
                                true ?
                                    <>
                                        <Text style={styles.label}>Email</Text>
                                        <Input p={2} placeholder="" variant="filled" isInvalid={errors.Email && touched.Email ? true : false} value={values.Email} onChangeText={handleChange('Email')} onBlur={handleBlur('Email')} />
                                        {errors.Email && touched.Email && (
                                            <Text style={styles.errorlabel}>{errors.Email}</Text>
                                        )}</>
                                    :
                                    <>
                                        <Text style={styles.label}>PhoneNumber</Text>
                                        <Input p={2} placeholder="" variant="filled" isInvalid={errors.PhoneNumber && touched.PhoneNumber ? true : false} value={values.PhoneNumber} onChangeText={handleChange('PhoneNumber')} onBlur={handleBlur('PhoneNumber')} />
                                        {errors.PhoneNumber && touched.PhoneNumber && (
                                            <Text style={styles.errorlabel}>{errors.PhoneNumber}</Text>
                                        )}</>

                            }


                            <Text style={styles.label}>PassWord</Text>
                            <Input p={2} placeholder="" variant="filled" isInvalid={errors.Password && touched.Password ? true : false} value={values.Password} onChangeText={handleChange('Password')} onBlur={handleBlur('Password')} />
                            {errors.Password && touched.Password && (
                                <Text style={styles.errorlabel}>{errors.Password}</Text>
                            )}
                            <Button disabled={!(dirty && isValid) ? true : false} onPress={handleSubmit} style={styles.button}>
                                Login In
                            </Button>
                        </View>
                    </View>
                    )
                }



                }
            </Formik>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "rgb(50,71,85)",
        // backgroundColor: "rgb(241,243,245)",
        justifyContent: "center",
        alignItems: "center"

    },
    logocontainer: {
        position: "absolute",
        top: 25,
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
        width: "80%",
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        backgroundColor: "white",
        padding: 20
    },
    cardheader: {
        borderBottomWidth: 1,
        marginVertical: 20
    },
    cardheadertext: {
        padding: 20,
        fontSize: 30
        , fontWeight: "bold"
    },
    form: {
        //backgroundColor: "yellow"
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
    }
})
export default Login;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Input } from 'native-base';
// const x = Dimensions.get("window").width;
// const y = Dimensions.get("window").height;

// const Auth = () => {
//     return (
//         <View>

//         </View>
//     )
// }
// const styles = StyleSheet.create({

// })
// export default Auth;
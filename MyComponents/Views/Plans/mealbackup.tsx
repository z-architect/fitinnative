
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, ImageBackground, Dimensions, TextInput, Alert } from 'react-native';
//import SessionCard from './sessioncard';
import MealSessionCard from './mealsessioncard';
import MealSessionCardUnselected from './mealSessioncardvariant';
import { Props } from '../../types';
import { Modal, Checkbox, Switch, Radio } from 'native-base';
import Axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import NumericInput from 'react-native-numeric-input';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const mydays = new Array(30).fill(
    {
        date: 1,
        sessions: [
            {
                sessId: "27",
                time: "1:33",

            },
            {
                sessId: "22",
                time: "1:03"
            },
            {
                sessId: "25",
                time: "2:29"
            }
        ]

    });

const Calander = (props: any) => {

    return (
        <View style={styles.calander}>
            <View style={styles.calanderheader}>
                <AntDesign name="left" size={24} color="white" />
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}> Augest </Text>
                <AntDesign name="right" size={24} color="white" />
            </View>
            <View style={styles.calanderheadertwo}>
                <MaterialCommunityIcons name="calendar-today" size={30} color="black" />
                <Text>Today</Text>
                <Entypo name="plus" size={30} color="black" />
            </View>
            <View style={styles.calanderbody}>
                {
                    myarray.map((item, i) => (
                        <TouchableOpacity key={i} style={[styles.day, { backgroundColor: props.Days[i].isSet ? "grey" : "white" }]} onPress={() => {
                            // props.setDay(i, props.Selected)

                            props.setCalenderModal(true);
                            props.setSelected(i);
                            //Alert.alert(i.toString())
                        }} >
                            <View >
                                <Text style={{ color: props.Days[i].isSet ? "white" : "black" }}>{i + 1}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}


const myarray = new Array(30).fill(7);
const SessionMeta = {
    name: "Plyometrics",
    id: "12"
};
const Plan = ({ navigation, route }: Props) => {
    let userId = 78;
    // useAppSelector(state=>state.user.id)
    // const [Plan, SetPlan] = useState({
    //     type: "",
    //     title: "",
    //     description: "",
    //     image: "",
    //     category: "",
    //     difficulty: "",
    //     private: true
    // });

    const [Type, SetType] = useState();
    const [Description, SetDescription] = useState("");
    const [Image, SetImage] = useState("");
    const [Title, SetTitle] = useState("");
    const [Difficulty, SetDifficulty] = useState("");
    const [Private, SetPrivate] = useState("");

    const [Sessions, SetSessions] = useState([""])


    const [Days, setDays] = useState(mydays);
    const [Value, SetValue] = useState("hard");
    const [Category, SetCategory] = useState("Losing Weight");

    const [Selection, SetSelection] = useState(false)
    const [CalenderModal, SetCalenderModal] = useState(false);
    const [TimeSelect, SetTimeSelect] = useState(false);

    const [SelectedMeal, SetSelectedMeal] = useState("");
    const [SelectedTime, SetSelectedTime] = useState("12");
    const [SelectedDate, SetSelectedDate] = useState(4);


    const addSession = (datenumber: number, sessionId: string, time: string) => {
        setDays((days) => {
            const daysupdated = days.map((day, i) => {
                if (i === datenumber) {
                    return {
                        ...day,
                        sessions: [
                            ...day.sessions,
                            {
                                sessId: sessionId,
                                time: time
                            }
                        ]
                    }
                }
                else {
                    return day
                }
            })
            return daysupdated;

        })
        SetTimeSelect(false);
        SetSelection(false);
    }

    const removeSession = (zday: number, time: string) => {
        //Alert.alert(day.toString(), "h " + time)
        setDays((days) => {
            const daysupdated = days.map((day, i) => {
                if (i === zday) {
                    return {
                        ...day,
                        sessions: day.sessions.filter((item: any, i: any) => item.time !== time)

                    }
                }
                else {
                    return day
                }
            })
            return daysupdated;

        })
    }

    // if (!Days[no].isSet && sessionId === "") {
    //     Alert.alert("sorry Fams, you have to select a session first")
    // }
    // else {
    //     if (Days[no].isSet) {
    //         SetSelectedSession("")
    //     }

    //     setDays((Days) => {
    //         let newdays = [...Days]
    //         if (newdays[no].isSet) {
    //             newdays[no] = {
    //                 isSet: false,
    //                 filledBy: ""
    //             }


    //         }
    //         else {

    //             newdays[no] = {
    //                 isSet: true,
    //                 filledBy: sessionId
    //             }
    //         }

    //         return [...newdays]
    //     });

    // }


    useEffect(() => {
        // Axios.get('api/sessions')
        //     .then(response => {
        //         SetSessions(response.data)
        //     })
        //     .catch(e => {
        //         Alert.alert("sorry papi api fetch failed for sessions")
        //     })
    }, [])
    const createPlan = () => {

        Axios.post('/api/plan/', {
            createdBy: userId,
            plan: Plan
        }).then(response => Alert.alert("plan succesfully created"))
            .catch(e => {
                Alert.alert("Plan creation Api failed")
            })
        /*
        
        */
    }
    const deletePlan = () => {


    }
    const deleteSession = (id: string) => {
        Axios.delete(`/api/session/:${id}`).then(response =>
            // SetSessions(response.data)
            Alert.alert("succesfuly deleted a session"))
            .catch(e => {
                Alert.alert("failed to delete the session, api failed")
            })
    }
    const editSession = (id: string) => {
        // navigation.navigate({
        //     "Session",
        //     {id:id}
        // })
        // navigation.navigate("session")
    }
    return (
        <>
            <Modal isOpen={TimeSelect} onClose={() => SetTimeSelect(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Select Time of Day</Modal.Header>
                    <Modal.Body>

                        <TouchableOpacity style={[styles.modaldaybutton, { backgroundColor: "lightblue" }]} onPress={async () => {
                            await SetSelectedTime("22:45");
                            addSession(SelectedDate, SelectedMeal, SelectedTime)
                        }}>
                            <Text>Morning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modaldaybutton, { backgroundColor: "lightyellow" }]} onPress={async () => {
                            await SetSelectedTime("13:45");
                            addSession(SelectedDate, SelectedMeal, SelectedTime)
                        }}>
                            <Text>Afternoon</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modaldaybutton, { backgroundColor: "orange" }]} onPress={async () => {
                            await SetSelectedTime("03:45");
                            addSession(SelectedDate, SelectedMeal, SelectedTime)
                        }}>
                            <Text style={{ color: "white" }}>Evening</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modaldaybutton, { backgroundColor: "rgba(0,0,0,0.5)" }]} onPress={async () => {
                            await SetSelectedTime("09:45");
                            addSession(SelectedDate, SelectedMeal, SelectedTime)
                        }}>
                            <Text style={{ color: "white" }}>Night</Text>
                        </TouchableOpacity>

                        <Text>OR.....</Text>
                        <Text>Set the time of day yourself</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View>

                                <Text>Hour</Text>
                                <NumericInput
                                    type='up-down'
                                    onChange={value => console.log(value)}
                                    rounded
                                    upDownButtonsBackgroundColor="rgb(50,71,85)"
                                    iconStyle={{ color: "white" }}
                                />
                            </View>
                            <View>

                                <Text>Minute</Text>
                                <NumericInput
                                    type='up-down'
                                    onChange={value => console.log(value)}
                                    rounded
                                    upDownButtonsBackgroundColor="rgb(50,71,85)"
                                    iconStyle={{ color: "white" }}
                                />
                            </View>
                        </View>

                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity style={styles.modalbutton}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>




            <Modal isOpen={Selection} onClose={() => SetSelection(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Select Meal Session</Modal.Header>
                    <Modal.Body>

                        <MealSessionCardUnselected sessionMeta={SessionMeta} setSelected={SetSelectedMeal} setTime={SetTimeSelect} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCardUnselected sessionMeta={SessionMeta} setSelected={SetSelectedMeal} setTime={SetTimeSelect} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCardUnselected sessionMeta={SessionMeta} setSelected={SetSelectedMeal} setTime={SetTimeSelect} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCardUnselected sessionMeta={SessionMeta} setSelected={SetSelectedMeal} setTime={SetTimeSelect} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCardUnselected sessionMeta={SessionMeta} setSelected={SetSelectedMeal} setTime={SetTimeSelect} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />

                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity style={styles.modalbutton} onPress={() => { SetSelection(false) }}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>


            <Modal isOpen={CalenderModal} onClose={() => SetCalenderModal(false)}>
                <Modal.Content maxWidth="600px">
                    <Modal.CloseButton />
                    <Modal.Header>Day 21</Modal.Header>
                    <Modal.Body>
                        <Text>Meals of the Day</Text>
                        {
                            Days[SelectedDate].sessions.map((mealsess: any, i: any) => (
                                <MealSessionCard sessionMeta={mealsess} key={i} deleteSession={() => { removeSession(SelectedDate, mealsess.time) }} />
                            ))
                        }
                        {/* <MealSessionCard sessionMeta={SessionMeta}  deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCard sessionMeta={SessionMeta}  deleteSession={() => { deleteSession("99") }} />
                        <MealSessionCard sessionMeta={SessionMeta}  deleteSession={() => { deleteSession("99") }} /> */}

                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity style={[styles.modalbutton, { backgroundColor: "rgb(217,125,84)" }]} onPress={() => { SetSelection(true) }}>
                            <Text>+ Add New Meal Session</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalbutton} onPress={() => { SetSelection(true) }}>
                            <Text>Add Meal</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>



            <ScrollView style={styles.container} >
                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {
                        createPlan();
                    }}>
                        <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <AntDesign name="close" size={32} color="red" />
                    </TouchableOpacity>


                </View>

                <View style={styles.planimage}>
                    {
                        (Image === "") ?
                            (
                                <View style={[styles.image, { backgroundColor: "lightgrey", justifyContent: "flex-start", alignItems: "center" }]}>
                                    <TouchableOpacity style={{ width: "100%", height: "60%", justifyContent: "center", alignItems: "center" }}>
                                        <AntDesign name="picture" size={62} color="white" />
                                    </TouchableOpacity>
                                    <View style={{ height: "40%", width: "80%" }}>
                                        <TextInput placeholder="Title" placeholderTextColor="white" style={[styles.input, { fontWeight: "bold" }]} />
                                        <TextInput placeholder="Description" placeholderTextColor="white" style={styles.input} />
                                    </View>
                                </View>
                            ) :
                            (
                                <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                                    <Text style={styles.imagetext}>
                                        Cardio
                                    </Text>
                                </ImageBackground>
                            )



                    }

                </View>

                <View style={styles.planmetacontainer}>
                    <View>
                        <Text> Difficulty</Text>
                        <Radio.Group
                            name="myRadioGroup"
                            accessibilityLabel="favorite number"
                            value={Value}
                            onChange={(nextValue) => {
                                SetValue(nextValue)
                            }}
                        >
                            <Radio value="hard" my={1} accessibilityLabel="This is a  checkbox">
                                Hard
                            </Radio>
                            <Radio value="medium" my={2} accessibilityLabel="This is a  checkbox">
                                Medium
                            </Radio>
                            <Radio value="easy" my={2} accessibilityLabel="This is a  checkbox">
                                Easy
                            </Radio>
                        </Radio.Group>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                            <Text> Public</Text>
                            <Switch />
                        </View>

                        <Text> Category</Text>
                        <Radio.Group
                            name="somegroup"
                            onChange={(nextValue) => SetCategory(nextValue)}
                            value={Category}
                            accessibilityLabel="choose numbers"
                        >


                            <Radio
                                value="Losing Weight"
                                accessibilityLabel="This is a  checkbox"

                            //colorScheme="orange"
                            > Losing Weight </Radio>
                            <Radio
                                value="Bulking Up"
                                accessibilityLabel="This is a  checkbox"

                            > Bulking Up </Radio>
                            <Radio
                                value="Athleticism"
                                accessibilityLabel="This is a  checkbox"

                            > Athleticism </Radio>
                            <Radio
                                value="Maintenance"
                                accessibilityLabel="This is a  checkbox"

                            > Maintenance </Radio>
                        </Radio.Group>
                    </View>


                </View>




                <View style={styles.calandertitle}><Text style={{ fontSize: 26 }}>Plan Calander</Text></View>
                <Calander Days={Days} setCalenderModal={SetCalenderModal} setSelected={SetSelectedDate} />

            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    main: {

        // justifyContent:"space-between",

    },
    head: {
        height: y * 0.1,
        width: x,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    container: {
        // flex:1,
        backgroundColor: "rgb(242,243,244)",
        borderWidth: 2

    },
    planimage: {
        height: 300,
        //backgroundColor:"yellow"
    },
    imagetext: {
        color: "white",
        fontSize: 38,
        margin: 20
    },
    planmetacontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",

    },

    sessioncontainer: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
        height: 250,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
        // shadowColor: "black",
        // shadowRadius: 3.0,
        // shadowOpacity: 0.5,

        // elevation: 3
        // borderWidth:1
    },
    sessioncontainerinner: {
        // backgroundColor:"pink"
    },
    sessioncontainerheader: {
        // backgroundColor:"pink",
        padding: 10,
        margin: 10,
    },
    sessioncontainerwindow: {
        height: 400
    },
    calandertitle: {
        //backgroundColor:"pink",
        padding: 10,

        margin: 10,
    },
    calanderheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(50,71,85)",
        height: 60,
        alignItems: "center"
    },
    calanderheadertwo: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        height: 60,
        alignItems: "center",
        borderBottomWidth: 1
    },
    calanderbody: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "98%",
        marginHorizontal: "1%"
    },
    calander: {
        height: 420,


    },
    day: {
        height: 60,
        width: "14%",
        padding: 5,
        backgroundColor: "rgb(200,200,200)",
        justifyContent: "center",
        alignItems: "center"
    },
    sessionbutton: {
        width: "50%",
        height: 60,
        marginHorizontal: "25%",
        marginVertical: 10,
        borderRadius: 32,
        backgroundColor: "rgb(110,140,160)",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        fontSize: 22
    },
    modalbutton: {
        // height: 50,
        // borderRadius: 10,
        // backgroundColor: "rgb(110,140,160)"
        width: "60%",
        height: 60,
        marginHorizontal: "20%",
        // marginVertical: 10,
        borderRadius: 32,
        backgroundColor: "rgb(110,140,160)",
        justifyContent: "center",
        alignItems: "center"
    },
    modaldaybutton: {
        // height: 50,
        // borderRadius: 10,
        // backgroundColor: "rgb(110,140,160)"
        width: "80%",
        height: 80,
        marginHorizontal: "10%",
        marginVertical: 10,
        borderRadius: 22,
        backgroundColor: "rgb(110,140,160)",
        justifyContent: "center",
        alignItems: "center"
    }

});
export default Plan;



/*
<View style={styles.sessioncontainerheader}><Text style={{ fontSize: 26 }}>Plan Sessions</Text></View>
                <View style={styles.sessioncontainerwindow}>


                    <ScrollView style={styles.sessioncontainer} contentContainerStyle={styles.sessioncontainerinner} nestedScrollEnabled={true}>
                        {
                            Sessions.length > 0 ?
                                (<>{

                                    Sessions.map((data, i) =>
                                        (<SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession(i.toString()) }} deleteSession={() => { deleteSession(i.toString()) }} />))
                                }
                                     <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession("weyo") }} deleteSession={() => { deleteSession("99") }} />
                                </>)
                                :
                                (<>
                                    <Text>
                                        There aren't any sessions created yet!!!
                                    </Text>
                                    <SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} />
                                </>)
                        }


                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.sessionbutton} onPress={() => { navigation.navigate("Session") }}>
                    <View>
                        <Text>Add session</Text>
                    </View>
                </TouchableOpacity>
                */
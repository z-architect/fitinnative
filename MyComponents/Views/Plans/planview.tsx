import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, ImageBackground, Dimensions, TextInput, Alert } from 'react-native';
import SessionCard from './sessioncardvarianttwo';
import { Props } from '../../types';
import { Input, Checkbox, Switch, Radio,Modal } from 'native-base';
import Axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import MyModal from './deletemodal';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const mydays = new Array(30).fill(
    {
        isSet: false,
        filledBy: ""
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
                        <TouchableOpacity key={i} style={[styles.day, { backgroundColor: props.Days[i].isSet ? "grey" : "white" }]} onPress={() => { }} >
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
const PlanView = ({ navigation, route }: Props) => {
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

    const [Type, SetType] = useState("");
    const [Description, SetDescription] = useState("");
    const [Image, SetImage] = useState("");
    const [Title, SetTitle] = useState("");
    const [Private, SetPrivate] = useState(true);

    const [Value, SetValue] = useState("hard");
    const [Category, SetCategory] = useState([""]);

    const [Sessions, SetSessions] = useState([""])
    const [SelectedSession, SetSelectedSession] = useState("");

    const [Days, setDays] = useState(mydays);
    const [DeleteModal,setDeleteModal] = useState(true)
    const setDay = (no: number, sessionId: string) => {
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

    }

    useEffect(() => {
        // Axios.get('api/sessions')
        //     .then(response => {
        //         SetSessions(response.data)
        //     })
        //     .catch(e => {
        //         Alert.alert("sorry papi api fetch failed for sessions")
        //     })

        let dataz = new Array(30).fill(
            {
                isSet: false,
                filledBy: ""
            });
        dataz[1] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[5] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[9] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[13] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[17] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[21] = {
            isSet: true,
            filledBy: "7"
        };
        dataz[25] = {
            isSet: true,
            filledBy: "7"
        };

        dataz[5]["isSet"] = true; dataz[5]["filledBy"] = "21";
        dataz[9]["isSet"] = true; dataz[9]["filledBy"] = "23";
        dataz[13]["isSet"] = true; dataz[13]["filledBy"] = "21";
        dataz[17]["isSet"] = true; dataz[17]["filledBy"] = "23";
        dataz[21]["isSet"] = true; dataz[21]["filledBy"] = "21";
        dataz[25]["isSet"] = true; dataz[25]["filledBy"] = "23";
        setDays(dataz);
        SetType("Workout");
        SetImage("//lkjlk");
        SetTitle("My plan");
        SetDescription("a plan for all the athletes");
        SetPrivate(false);
        SetValue("easy");
        SetCategory(["LosingWeight", "", "Athleticism", ""]);

    
        //     const [Type, SetType] = useState();
        // const [Description, SetDescription] = useState("");
        // const [Image, SetImage] = useState("");
        // const [Title, SetTitle] = useState("");
        // const [Private, SetPrivate] = useState("");

        // const [Value, SetValue] = useState("hard");
        // const [Category, SetCategory] = useState([]);


    }, [])

    const createPlan = () => {

        // Axios.post('/api/plan/', {
        //     createdBy: userId,
        //     plan: "Plan"
        // }).then(response => Alert.alert("plan succesfully created"))
        //     .catch(e => {
        //         Alert.alert("Plan creation Api failed")
        //     })
        // /*

        // */
    }
    const deletePlan = () => {


    }
    const deleteSession = (id: string) => {
        // Axios.delete(`/api/session/:${id}`).then(response =>
        //     // SetSessions(response.data)
        //     Alert.alert("succesfuly deleted a session"))
        //     .catch(e => {
        //         Alert.alert("failed to delete the session, api failed")
        //     })
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
        <MyModal DeleteModal={DeleteModal} setDeleteModal={setDeleteModal}/>
         {/* <Modal isOpen={DeleteModal} onClose={() => setDeleteModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <View style={styles.modaltophalf}>

                       <View style={styles.giantxcontainer}>
                           <AntDesign name="close" size={78} color="black"/>
                        </View> 
                        <Text style={{fontSize:34,fontWeight:"bold"}}>
                            Are you Sure?
                        </Text>
                    </View>
                    <View style={styles.modalbottomhalf}>
                        <View>
                <Text> Do you really want to delete these records?</Text>
                <Text>This action can not be undone!!!</Text>
                        </View>
        <View style={styles.modlabuttoncontainer}>
                    <TouchableOpacity style={[styles.modalbutton,{backgroundColor:"rgb(110,140,160)"}]}>
                <Text style={{color:"white",fontWeight:"bold"}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalbutton,{backgroundColor:"rgba(217,125,84,0.9)"}]}>
                <Text style={{color:"white",fontWeight:"bold"}}>Delete</Text>
            </TouchableOpacity>
        </View>
                    </View>
                </Modal.Content>
            </Modal> */}



        <ScrollView style={styles.container} >
            <View style={styles.head}>
                <TouchableOpacity onPress={() => {
                    createPlan();
                }}>
                    <AntDesign name="left" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>



                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
                    <TouchableOpacity onPress={() => {
                        setDeleteModal(true)
                    }}>
                        <AntDesign name="delete" size={32} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("PlanEdit");
                    }}>
                        <AntDesign name="edit" size={32} color="rgb(217,125,84)" />
                    </TouchableOpacity>
                </View>


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
                                <View style={{ height: "60%", width: "100%" ,justifyContent:"flex-end"}}>
                                   
                                    <Text  style={[{color:"white",fontSize:22,marginVertical:15,fontWeight:"bold",paddingLeft:15}]} >{Description}</Text>
                                   <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",}}> 
                                        <Text style={{borderLeftColor:"white",color:"white",fontSize:22,fontWeight:"bold"}}>{'\u2B24'} Meal</Text>
                                        <Text style={{borderLeftColor:"white",color:"white",fontSize:22,fontWeight:"bold"}}>{'\u2B24'} Maintainance</Text>
                                        <Text style={{borderLeftColor:"white",color:"white",fontSize:22,fontWeight:"bold"}}>{'\u2B24'} Easy</Text>
                                    </View> 
                                </View>
                            </ImageBackground>
                        )



                }

            </View>

          


            <View style={styles.sessioncontainerheader}><Text style={{ fontSize: 26 }}>Sessions in the Plan</Text></View>
            <View style={styles.sessioncontainerwindow}>


                <ScrollView style={styles.sessioncontainer} contentContainerStyle={styles.sessioncontainerinner} nestedScrollEnabled={true}>
                    {
                        Sessions.length > 0 ?
                            (<>{

                                Sessions.map((data, i) =>
                                    (<SessionCard sessionMeta={SessionMeta} setSelected={SetSelectedSession} editSession={() => { editSession(i.toString()) }} deleteSession={() => { deleteSession(i.toString()) }} />))
                            }

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
            {/*
            <TouchableOpacity style={styles.sessionbutton} onPress={() => { navigation.navigate("Session") }}>
                <View>
                    <Text>Add session</Text>
                </View>
            </TouchableOpacity>
*/}
            <View style={styles.calandertitle}><Text style={{ fontSize: 26 }}>Plan Calander</Text></View>
            <Calander Days={Days} setDay={setDay} Selected={SelectedSession} setSelected={SetSelectedSession} />

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
        padding: 20,

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
    // modaltophalf:{
    //     height:y*0.25,
    //     width:"100%",
    //     alignItems:"center",
    //     justifyContent:"flex-end"
    // },
    // modalbottomhalf:{
    //     height:y*0.25,
    //     width:"100%",
    //     justifyContent:"space-around",
    //     padding:20
    // },
    // giantxcontainer:{
    //     justifyContent:"center",
    //     alignItems:"center",
    //     height:160,
    //     width:160,
    //     borderRadius:80,
    //     borderWidth:1,
    //     borderColor:"orange"
    // },
    // modlabuttoncontainer:{
    //     flexDirection:"row",
    //     width:"100%",
    //     justifyContent:"space-evenly"
    // },
    // modalbutton:{
    //     borderRadius:10,
    //     height:50,
    //     width:140,
    //     justifyContent:"center",
    //     alignItems:"center",


    // }


});
export default PlanView;


/*
<View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
                    <TouchableOpacity onPress={() => {
                        deletePlan();
                    }}>
                        <AntDesign name="delete" size={32} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <AntDesign name="close" size={32} color="red" />
                    </TouchableOpacity>
                </View>
                */



                /*
                  <View style={styles.planmetacontainer}>
                <View style={{ width: "50%" }}>

                    <View >
                        <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 15 }}> Public</Text>
                        {/* <Text>{Private ? "No" : "Yes"} </Text> 
                 
                        </View>

                        <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 15 }}> Easy</Text>
                         <Text> {Value}</Text> 
                    </View>
                    <View style={{ width: "50%", alignItems: "baseline", paddingLeft: 20 }}>
    
    
                        <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 15 }}> Maintainance</Text>
                         <Text>Maintainance</Text> 
                         <Checkbox
                            value="Maintenance"
                            accessibilityLabel="This is a  checkbox"
                            defaultIsChecked
                            isDisabled={true}
                        > Maintenance </Checkbox> 
    
                        <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 15 }}> Meal</Text>
                        <Text>Meal </Text> 
                    </View>
    
    
                </View>
                */
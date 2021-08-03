import React,{useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons'; 
import { View,Text,StyleSheet,Button,TouchableOpacity,ScrollView} from 'react-native';
import SessionCard from './sessioncard';

const Plan = ()=>{
    return (
        <View style={styles.container}>
            <View style={styles.planimage}>

            </View>

        </View>
    )
}

const styles= StyleSheet.create({
 
    container:{
        flex:1,
        backgroundColor:"rgb(242,243,244)",
        borderWidth:2
        
    },
    planimage:{
        height:"250",
        backgroundColor:"yellow"
    },
    // sessioncontainer:{
    //     margin:20,
    //     height:350,
    //     borderWidth:1
    // },
    // sessioncontainerheader:{
    //     backgroundColor:"pink",
    //     padding:10,
    //     margin:10,

        
    // },
    // calandertitle:{
    //     backgroundColor:"pink",
    //     padding:10,
    //     margin:10,
    // },
    // calanderheader:{
    //     flexDirection:"row",
    //     justifyContent:"space-between",
    //     backgroundColor:"rgb(100,130,150)",
    //     height:60,
    //     alignItems:"center"
    // },
    // calanderheadertwo:{
    //     flexDirection:"row",
    //     justifyContent:"space-between",
    //     paddingHorizontal:20,
    //     height:60,
    //     alignItems:"center",
    //     borderBottomWidth:1
    // },
    // calanderbody:{
    //     flexDirection:"row",
    //     flexWrap:"wrap",
    //     width:"98",
    //     marginHorizontal:"1"
    // },
    // calander:{
    //    height:420,
      

    // },
    // day:{
    //     height:60,
    //     width:"14",
    //     //padding:5,
    //     //backgroundColor:"rgb(200,200,200)",
    //     justifyContent:"center",
    //     alignItems:"center"
    // },
    // sessionbutton:{
    //     width:"50",
    //     height:60,
    //     marginHorizontal:"25",
    //     borderRadius:32,
    //     backgroundColor:"rgb(110,140,160)",
    //     justifyContent:"center",
    //     alignItems:"center"
    // }

});
export default Plan;
/*
 <View style={styles.sessioncontainerheader}><Text>Plan Sessions</Text></View>
            <View style={styles.sessioncontainer}>

            
            <View >
                <SessionCard/>
                <SessionCard/>
                <SessionCard/>
                <SessionCard/>
            </View>
            </View>
            <TouchableOpacity style={styles.sessionbutton}>
                <View>
                    <Text>Add session</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.calandertitle}><Text>Plan Calander</Text></View>        
            
        
        </View>
      */
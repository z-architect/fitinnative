import React,{useState} from 'react';
import { View ,Text,StyleSheet,TouchableOpacity,Button } from 'react-native';

import SessionCard from './sessioncard';
const Session = ()=>{
    return (
        <>
        <View style={styles.container}>
            <View style={styles.image}>
                
            </View >
            <View style={styles.sessionContainer}>
                <SessionCard/>
                <SessionCard/>
                <SessionCard/>
                <SessionCard/>
                
               
                
            </View >
            <TouchableOpacity style={styles.addbutton}>
               <View>
                    <Text> Add Session</Text>
                    </View>
                
            </TouchableOpacity>
           
        </View >
        </>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        position:"relative",
        height:"100%",
       
         backgroundColor:"rgb(240,243,244)"

    },
    image:{
        width:"100%",
        height:"30%",
        backgroundColor:"yellow"
    },
    sessionContainer:{
        
       
        margin:20,
        

    },
  
    addbutton:{
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
      
        bottom:30,
        width:"50%",
        height:60,
        marginHorizontal:"25%",
        borderRadius:32,
        backgroundColor:"rgb(110,140,160)"
        

    },
    
})
export default Session;
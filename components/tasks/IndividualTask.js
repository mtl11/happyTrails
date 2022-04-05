import { StyleSheet, Button, View , Text, TouchableOpacity, FlatList, Modal, Alert} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IndividualTask = (props) => {
    const dispatch = useDispatch();
    const deleteTask = async () =>{
        // console.log(props.id);
        // console.log(props.userId);
        // console.log(props.info);{}
        props.localRemove(props.id);
        await dispatch(
            taskActions.deleteTask(
                props.id,
                props.userId
            )
        );
    }

    return (
        <View style = {styles.container}>
            <View style ={styles.indvTaskContainer}>
                <Text style = {styles.taskText}>
                   {props.info}
                </Text>
                {props.mode == "sun" ? 
                <View style={styles.modeContainer}>
                    <Fontisto name="day-sunny" size={20} color="white" />
                    <Text style={styles.smallText}> Morning</Text>
                 </View>
                :<View style={styles.modeContainer}> 
                <Fontisto name="night-clear" size={20} color="white" />
                <Text style={styles.smallText}> Night</Text>
                </View>
                }
            </View>
            <TouchableOpacity 
            onPress={()=>{Alert.alert(
                "Delete Routine",
                "This cannot be undone",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Delete", onPress: () => deleteTask(),style:"destructive" }
                ]
              );}}>
                <AntDesign name="minuscircle" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    indvTaskContainer:{
        padding:8,
        width: '80%',
        marginHorizontal: '3%',
        marginVertical: '3%',
        borderRadius:8,
    },
    modeContainer:{
        flexDirection: "row",
        alignItems: 'center',
        marginTop: "1.5%"
    },
    smallText:{
        color: "white"
    },
    taskText:{
        fontSize: 20,
        color: "white"
    },
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: '4%',
        marginTop:'3%',
        width:"100%",
        borderRadius:20,
        alignSelf: 'center',
        backgroundColor: "#FF7F50",
        // shadowColor: 'black',
        // shadowOpacity: .4,
        // shadowRadius: 1,  
        // shadowOffset:{width:3, height:3}
    }
});

export default IndividualTask;
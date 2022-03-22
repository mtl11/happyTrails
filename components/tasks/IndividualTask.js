import { StyleSheet, Button, View , Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';

const IndividualTask = (props) => {
    const dispatch = useDispatch();
    const deleteTask = async () =>{
        // console.log(props.id);
        // console.log(props.userId);
        // console.log(props.info);

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
            </View>
            <TouchableOpacity onPress={()=>{deleteTask()}}>
                <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    indvTaskContainer:{
        borderWidth: 1,
        padding:8,
        width: '80%',
        marginHorizontal: '5%',
        borderRadius:8,
    },
    taskText:{
        fontSize: 14
    },
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '4%',
        marginTop:'1%'
    }
});

export default IndividualTask;
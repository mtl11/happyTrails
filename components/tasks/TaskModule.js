import { StyleSheet, Text, Button, View ,Modal, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';
import { Fontisto } from '@expo/vector-icons';

const TaskModule = props =>{
    const userEmail = useSelector(state => state.auth.email);
    const userId= useSelector(state => state.auth.userId);
    const [task, setTask] = useState("");
    const [sunIcon, setSunIcon] = useState(false);
    const [moonIcon, setMoonIcon] = useState(false);
    const [inputError, setInputError] = useState(false);
    const dispatch = useDispatch();
    
    const addTask = async () =>{
        var mode = "";
        console.log(sunIcon);
        console.log(moonIcon);
        console.log(task);
        if (sunIcon == true){
            mode = "sun";
        }
        else if(moonIcon == true){
            mode = "moon";
        }else{
            mode = "both";
        }
        console.log(mode);
        
        await dispatch(
            taskActions.addTask(
                userId,
                userEmail,
                task,
                mode
            )
        );

        props.addLocal(userId,
            userEmail,
            task,
            mode);

        setTask("");
        setMoonIcon(false);
        setSunIcon(false);
    }
    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
    >
        <View style = {styles.modalView}>
            <View style = {styles.modalContainer}>
                <View style={styles.inputsContainer}>
                    <TextInput style={styles.input} onChangeText={text => [setTask(text), setInputError(false)]}/>
                    { inputError ? <Text style={styles.errorText}>Please enter a routine</Text>: <Text></Text>}
                </View>
                <View style={styles.iconContainer}>
                <TouchableOpacity style={[styles.icons,{backgroundColor: sunIcon ? "#FFDBFF": null}]} 
                    onPress={()=>{setSunIcon(!sunIcon)}}>
                    <Fontisto name="day-sunny" size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity style={[styles.icons,{backgroundColor: moonIcon ? "#FFDBFF": null}]} 
                    onPress={()=>{setMoonIcon(!moonIcon)}}>
                    <Fontisto name="night-clear" size={24} color="black" /></TouchableOpacity>
                </View>
                <Button 
                onPress ={()=>{task.length != 0 ? [addTask(), 
                    props.setVisible(!props.visible)]:setInputError(!inputError)}} 
                title={'Add Task'}/>
                <Button color="red" onPress ={()=>{props.setVisible(!props.visible)}}title={'Cancel'}/>
            </View>
        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    taskContainer:{
        height: "90%",
        alignContent:'center'
    },
    iconContainer:{
        justifyContent: "center",
        flexDirection: 'row',
        margin:10,
        paddingHorizontal:"20%",
        width:"100%"
    },
    errorText:{
        color: "red",
        alignSelf:"flex-start",
        paddingLeft:"10%",
        fontSize:12
    },
    icons:{
        marginHorizontal:"10%",
        padding: 8,
        borderRadius: 45
    },
    modalView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalContainer:{
        backgroundColor: "white",
        width:'80%',
        height: '25%',
        borderRadius: 10
    },
    input:{
        width: "80%",
        borderWidth: 1,
        padding:8
    },
    inputsContainer:{
        alignItems:'center',
        margin:"2%",
    }
})

export default TaskModule;

import { StyleSheet, Text, Button, View ,Modal, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';
import { Fontisto } from '@expo/vector-icons';
import fonts from '../../constants/fonts';
import color from '../../constants/color';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements/dist/input/Input';

const TaskModuleEdit = props => {
    const userEmail = useSelector(state => state.auth.email);
    const userId= useSelector(state => state.auth.userId);
    const [task, setTask] = useState(props.info);

    const [date, setDate] = useState(new Date(12,12,11,props.date.split(":")[0], props.date.split(":")[1].slice(0,2)));
    const [mode, setMode] = useState('time');
    const [duration, setTime] = useState(props.duration);

    const [icon, setIcon] = useState(props.icon);

    const [timeModal, setTimeModal] = useState(false);

    const [inputError, setInputError] = useState(false);
    const dispatch = useDispatch();
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

    const updateLocal = async () =>{
        var timeOfTask = date.toLocaleString().split(" ")[1].split(":");
        var amOrpm = date.toLocaleString().split(" ")[2];
        var time = timeOfTask[0] + ":" + timeOfTask[1]+amOrpm;
        var mode = "";
        if (amOrpm == "pm") {
            mode = "sun";
        }else{
            mode = "moon";
        }
        // await dispatch(
        //     taskActions.addTask(
        //         userId,
        //         userEmail,
        //         task,
        //         mode,
        //         duration,
        //         time,
        //         icon
        //     )
        // );
        //props.localRemove(props.id);
        props.updateLocal(props.id,
            task,
            mode,
            duration,
                time,
                icon);
    }
    
    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
    >
        <View style = {styles.modalView}>
            <View style = {styles.modalContainer}>
                <Text style={styles.bigText}>
                    Edit Routine:
                </Text>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputTextContainer}>
                        <TextInput 
                        style={styles.input} 
                        onChangeText={text => [setTask(text), setInputError(false)]} 
                        maxLength={20}
                        placeholder={"Title"}
                        returnKeyType="done"
                        value={task}
                        />
                        <Text style={styles.lengthFont}>
                        {task.length}/20
                        </Text>
                    </View>
                    { inputError ? <Text style={styles.errorText}>Please enter a routine</Text>: <Text></Text>}
                </View>
                <View flexDirection={"row"}  justifyContent={"space-evenly"}>
                    <TouchableOpacity 
                    style={[styles.modeContainer, icon == "Habit" ?  {backgroundColor: color.primary}: null ]}
                    onPress ={()=>{setIcon("Habit")}}
                    >
                    <FontAwesome5 name="clock" size={20} color="black" />
                        <Text style={styles.iconText}>
                            Habit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modeContainer, icon == "Task" ?  {backgroundColor: color.primary}: null ]}
                     onPress ={()=>{setIcon("Task")}}
                    >
                    <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black" />
                        <Text style={styles.iconText}>
                            Task
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modeContainer, icon == "Self" ?  {backgroundColor: color.primary}: null ]}
                     onPress ={()=>{setIcon("Self")}}
                    >
                    <MaterialIcons name="self-improvement" size={24} color="black" />
                        <Text style={styles.iconText}>
                            Self
                        </Text>
                    </TouchableOpacity>
                </View>
                <View  style={styles.timeContainer} >
                <Text style={styles.timeText}>
                Selected Time: 
                </Text>
                    <DateTimePicker
                        display={"clock"}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        style={[{height: "200%"},{width:"30%"}]}
                        /> 
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                    Selected Duration: 
                    </Text>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType={'number-pad'}
                        maxLength ={2}
                        placeholder={"00"}
                        returnKeyType="done"
                        value = {duration}
                        onChangeText={(text)=>{setTime(text);}}
                    />
                    <Text style={styles.timeText}>
                        mins
                    </Text>
                </View>
                <View style={styles.buttonOverview}>
                <TouchableOpacity 
                    style={[styles.buttonContainer,{backgroundColor: color.primary}]}
                    onPress ={()=>{task.length != 0 ? [updateLocal(), 
                    props.setVisible(!props.visible)]:setInputError(!inputError)}}
                >
                    <Text style={styles.buttonText}>
                        Update
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, {borderColor: color.primary}]}
                onPress ={()=>{props.setVisible(!props.visible)}}
                >
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                
                </View>
            </View>
            {/* <Modal 
            visible={timeModal}
            style ={styles.timeModal}
            transparent={true}
            >
                <View style={styles.timeView}>
                    <DateTimePicker
                    display={"clock"}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                            
                    /> 
                    <Button title='cancel' onPress={()=>{
                        console.log(timeModal)
                        setTimeModal(false)}}/>
                </View>
            </Modal>         */}
        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    timeModal:{
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
       // height:"70%"
    },
    timeInput:{
        backgroundColor: color.primaryGray,
        width: 35,
        padding: 5,
        fontFamily: fonts.main,
        borderRadius: 8,
        fontSize: 16
    },
    timeView:{
        //marginTop: "180%",
        marginTop: "160%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 45
    },
    timeText:{
        fontFamily: fonts.main,
        fontSize: 20,
        marginHorizontal:10,
    },
    timeContainer:{
       // borderWidth: 1.5,
        justifyContent: "center",
        flexDirection: "row",
       
        alignItems: "center",
       // padding: 5,
        marginHorizontal: "5%",
        borderRadius: 45
    },buttonText:{
        fontFamily: fonts.main
    },
    iconText:{
        fontFamily: fonts.main
    },
    modeContainer:{
        borderWidth: 1.5,
        borderRadius: 45,
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        justifyContent: "space-around",
        width: "25%"
    },
    buttonContainer:{
        borderRadius: 45,
        borderWidth:1.5,
        // marginHorizontal: "10%",
        width: "40%",
        alignItems: "center"
    },
    lengthFont:{
        fontFamily: fonts.main
    },
    buttonOverview:{
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    buttonText:{
        fontFamily: fonts.main,
        fontSize: 18,
        padding: 10
    },
    taskContainer:{
        height: "90%",
        alignContent:'center'
    },
    inputTextContainer:{
        width: "90%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: "10%"
    },
    iconContainer:{
        justifyContent: "center",
        flexDirection: 'row',
        //margin:10,
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
    bigText:{
        fontSize: 24,
        fontFamily: fonts.mainBold,
        margin: "1%",
        marginLeft: "3%"
    },
    modalContainer:{
        backgroundColor: "white",
        width:'90%',
        height: '60%',
        borderRadius: 10,
        justifyContent: "space-around",
        marginBottom:"30%"
    },
    input:{
        width: "80%",
        borderBottomWidth: 1.5,
        padding:3,
        fontFamily: fonts.main,
        fontSize: 20,
        //marginTop: "2%",
        borderBottomColor: color.primary,

    },
    inputsContainer:{
        alignItems:'center',
        margin:"2%",
    }
})

export default TaskModuleEdit;

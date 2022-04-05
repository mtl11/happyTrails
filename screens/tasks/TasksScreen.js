import { StyleSheet, Button, View , Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import { Fontisto } from '@expo/vector-icons';
import TaskModule from '../../components/tasks/TaskModule';
import {useSelector, useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';
import IndividualTask from '../../components/tasks/IndividualTask';
import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksScreen = props => {
    const [visible, setVisible] = useState(false);
    //const userId= useSelector(state => state.auth.userId);
    //const tasks = useSelector(state => state.tasks.tasks);
    const [loading, setLoading] = useState(true);
    const [allTasks, setAllTasks] = useState();
    const dispatch = useDispatch();
    const [sunIcon, setSunIcon] = useState(false);
    const [allIcon, setAllIcon] = useState(true);
    const [moonIcon, setMoonIcon] = useState(false);

    const getTasksFunc = async (value) => {
        //console.log(userId);
        await dispatch(taskActions.getTask(value));
        const myTasks = await AsyncStorage.getItem('myTasks');
        const data = JSON.parse(myTasks);
        var length = data.length;
        for (var i = 0; i< length;i++){
            data[i]["show"] = "Y";
        }
        console.log(data);
        setAllTasks(data);
    }
    const addLocal = (userId, userEmail, task, mode) => {
        const newTasks = allTasks.push({
            "email": userEmail,
             "id": 0,
            "mode": mode,
            "show": "Y",
             "task": task,
             "userid": userId
        });
        // setAllTasks(newTasks);
    }
    const localRemove = (id) => {
        const filteredData = allTasks.filter(item => item.id !== id);
        setAllTasks(filteredData);
    }

    const changeTasks = (mode) => {
        var length = allTasks.length;
        if (mode=="sun"){
            for (var i = 0; i< length;i++){
                console.log(allTasks[i]);
                if (allTasks[i].mode != "sun"){
                    allTasks[i]["show"] = "N";
                }
                else{
                    allTasks[i]["show"] = "Y";
                }
            }
        }
        if (mode=="all"){
            for (var i = 0; i< length;i++){
                console.log(allTasks[i]);
                allTasks[i]["show"] = "Y";
            }
        }
        if (mode=="moon"){
            for (var i = 0; i< length;i++){
                console.log(allTasks[i]);
                if (allTasks[i].mode != "moon"){
                    allTasks[i]["show"] = "N";
                }else{
                    allTasks[i]["show"] = "Y";
                }
            }
        }
    }

    useEffect(async ()=>{
        const value = await AsyncStorage.getItem('userId');
        console.log(value);
        getTasksFunc(value);
        setLoading(false);
        
    },[]);

    return (
        <View>
            <TaskModule
            addLocal = {addLocal}
            visible ={visible}
            setVisible = {setVisible}/>
            <View style = {styles.taskContainer}>
                <View style = {styles.iconContainer}>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: sunIcon ? "#A8FFFF": null,}]} 
                        onPress={()=>{setSunIcon(true),setAllIcon(false),setMoonIcon(false), changeTasks("sun")}}>
                            <Fontisto name="day-sunny" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: allIcon ? "#A8FFFF": null,}]} 
                        onPress={()=>{setSunIcon(false),setAllIcon(true),setMoonIcon(false), changeTasks("all")}}>
                            <Fontisto name="world-o" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: moonIcon ? "#A8FFFF": null,}]} 
                        onPress={()=>{setSunIcon(false),setAllIcon(false),setMoonIcon(true), changeTasks("moon")}}>
                            <Fontisto name="night-clear" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.taskList}>
                        {loading && <Text>Loading...</Text>}
                        {allTasks && (
                        <FlatList
                        contentContainerStyle={{ paddingBottom: 20 }}
                        data={allTasks}
                        renderItem={({item}) => ( item.show == "Y" ?
                        <IndividualTask 
                            info ={item.task} 
                            id = {item.id} 
                            userId = {item.userid} 
                            localRemove = {localRemove}
                            mode = {item.mode}/> 
                            : null)}
                        style = {styles.taskFlatList}
                        />)}
                        
                        <TouchableOpacity style={styles.addButton} onPress={()=>{setVisible(!visible)}}>
                            
                        <AntDesign name="pluscircleo" size={28} color="black" />
                            <Text style={styles.addText}>Add Routine</Text>
                        </TouchableOpacity>
                    <View>
                </View>
                </View>
            </View>
            <Navbar 
            props = {props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer:{
        height: "90%",
        alignContent:'center',
        backgroundColor: "#FFFFDB",
    },
    addText:{
        fontSize: 24
    },
    taskList:{
        height:"90%",
        backgroundColor: "#FFFFDB"
    },
    topIcons:{
        padding: 8,
        borderRadius: 45
    },
    iconContainer:{
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: '10%',
       
        marginBottom: '1.5%',
        marginHorizontal: '5%'
    },
    modalView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalContainer:{
        backgroundColor: "grey",
        width:'80%',
        height: '20%',
        borderRadius: 10
    },
    input:{
        width: "80%"
    },
    taskFlatList:{
        //borderWidth: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        //borderRadius: 10,
        // backgroundColor: "#ECECEC"
    }, addButton:{
        width:"60%",
        alignSelf: "center",
        justifyContent:"space-between",
        paddingHorizontal: "8%",
        flexDirection: "row",
        borderWidth: 1.5,
        alignItems: "center",
        padding:10,
        borderRadius: 45,
        marginHorizontal: 10,
        marginBottom: 10, 
        backgroundColor: "#FFDBFF",
        height: "8%"
    }
})

export default TasksScreen;
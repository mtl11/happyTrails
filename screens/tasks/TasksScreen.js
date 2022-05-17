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
import color from '../../constants/color';
import fonts from '../../constants/fonts';

const TasksScreen = props => {
    const [visible, setVisible] = useState(false);
   
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
        //const data = allTasks;
        var length = data.length;
        for (var i = 0; i< length;i++){
            data[i]["show"] = "Y";
            //data[i]["completed"] = "N";
        }
       // console.log(data);
        setAllTasks(data);
    }
    const addLocal = (userId, userEmail, task, mode, duration,time, icon) => {
        const newTasks = allTasks.push({
            "email": userEmail,
             "id": 0,
            "mode": mode,
            "show": "Y",
             "task": task,
             "userid": userId,
             "duration":duration,
                "time":time,
                "icon":icon
        });
        // setAllTasks(newTasks);
    }
    
    const localRemove = (id) => {
        const filteredData = allTasks.filter(item => item.id !== id);
        setAllTasks(filteredData);
    }

    const updateLocal = (id, task, mode, duration,time, icon)=>{
        const tasks = allTasks;
        for (const n in tasks){
            var item = tasks[n];
            if(item["id"]==id){
                console.log("hi");
                item["task"] = task;
            }
        }

        const newTasks = allTasks.push({
            // "email": userEmail,
             "id": 0,
            "mode": "Test",
            "show": "Y",
             "task": "Test",
             "userid": "Test",
             "duration":duration,
                "time":time,
                "icon":icon
        });
        // // console.log(allTasks);
        // setAllTasks(tasks);
        // console.log(allTasks);
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
               <TouchableOpacity style={styles.addButton1} onPress={()=>{setVisible(!visible)}}>
                        <AntDesign name="pluscircleo" size={30} color="white" />
                </TouchableOpacity>
           
                <View style = {styles.iconContainer}>
                    <TouchableOpacity 
                        style={styles.topIcons} 
                        onPress={()=>{setSunIcon(false),setAllIcon(true),setMoonIcon(false), changeTasks("all")}}>
                            {/* <Fontisto name="world-o" size={24} color="black" /> */}
                            <Text style={[styles.topText, {opacity: allIcon ? 1 : .3}]}>
                                All
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.topIcons} 
                        onPress={()=>{setSunIcon(true),setAllIcon(false),setMoonIcon(false), changeTasks("sun")}}>
                            {/* <Fontisto name="day-sunny" size={24}  color= {sunIcon ? "black": "red"}/> */}
                            <Text style={[styles.topText, {opacity: sunIcon ? 1 : .3}]}>
                                Morning
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.topIcons} 
                        onPress={()=>{setSunIcon(false),setAllIcon(false),setMoonIcon(true), changeTasks("moon")}}>
                            {/* <Fontisto name="night-clear" size={24} color="black" /> */}
                            <Text style={[styles.topText, {opacity: moonIcon ? 1 : .3}]}>
                            Night
                            </Text>
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
                            time = {item.time} 
                            icon = {item.icon} 
                            info ={item.task} 
                            duration ={item.duration}
                            id = {item.id} 
                            userId = {item.userid} 
                            updateLocal = {updateLocal}
                            localRemove = {localRemove}
                            mode = {item.mode}/> 
                            : null)}
                        style = {styles.taskFlatList}
                        />)}
                        {/* <TouchableOpacity style={styles.addButton} onPress={()=>{setVisible(!visible)}}>
                        <AntDesign name="pluscircleo" size={28} color="black" />
                            <Text style={styles.addText}>Add Routine</Text>
                        </TouchableOpacity> */}
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
        backgroundColor: color.primary
        //backgroundColor: "#23395d"
        // backgroundColor: "#FFFFDB",
        // backgroundColor: "#DCDCDC"
    },
    addText:{
        fontSize: 24
    },
    taskList:{
        height:"90%",
        // backgroundColor: "#FFFFDB"
        backgroundColor: color.primaryGray
    },
    topIcons:{
        paddingTop: 16,
        paddingHorizontal: 16,
        borderRadius: 45,
        
    },
    topText:{
        fontSize: 16,
        fontFamily: fonts.main
    },
    iconContainer:{
        justifyContent: "space-between",
        flexDirection: 'row',
        //marginTop: '20%',
       
        marginBottom: '1.5%',
        marginHorizontal: '5%',
        
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
    },
    addButton1:{
        alignSelf:"flex-end",
        marginTop: "12%",
        marginRight: "8%"
    }
})

export default TasksScreen;
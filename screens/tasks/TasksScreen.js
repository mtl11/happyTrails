import { StyleSheet, Button, View , Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import { Fontisto } from '@expo/vector-icons';
import TaskModule from '../../components/tasks/TaskModule';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as taskActions from '../../store/actions/task';
import IndividualTask from '../../components/tasks/IndividualTask';
import task from '../../store/reducers/task';

const TasksScreen = props => {
    const [visible, setVisible] = useState(false);
    const userId= useSelector(state => state.auth.userId);
    const tasks = useSelector(state => state.tasks.tasks);
    const [loading, setLoading] = useState(true);
    const [allTasks, setAllTasks] = useState();
    const dispatch = useDispatch();

    const [sunIcon, setSunIcon] = useState(false);
    const [allIcon, setAllIcon] = useState(false);
    const [moonIcon, setMoonIcon] = useState(false);

    const getTasksFunc = async () => {
        console.log(userId);
        await dispatch(taskActions.getTask(userId));
        console.log(tasks)
        setAllTasks(tasks);
    }
    
    useEffect(()=>{
        getTasksFunc();
        setLoading(false);
    },[]);

    return (
        <View>
            <TaskModule
            visible ={visible}
            setVisible = {setVisible}/>
            <View style = {styles.taskContainer}>
                <View style = {styles.iconContainer}>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: sunIcon ? "#FFDBFF": null,}]} 
                        onPress={()=>{setSunIcon(!sunIcon)}}>
                            <Fontisto name="day-sunny" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: allIcon ? "#FFDBFF": null,}]} 
                        onPress={()=>{setAllIcon(!allIcon)}}>
                            <Fontisto name="world-o" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topIcons,{backgroundColor: moonIcon ? "#FFDBFF": null,}]} 
                        onPress={()=>{setMoonIcon(!moonIcon)}}>
                            <Fontisto name="night-clear" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                        {loading && <Text>Loading...</Text>}
                        {tasks && (
                        <FlatList
                        contentContainerStyle={{ paddingBottom: 20 }}
                        data={allTasks}
                        renderItem={({item}) => 
                        <IndividualTask info ={item.task} id = {item.id} userId = {item.userid} deleteTask={deleteTask}/>}
                        style = {styles.taskFlatList}
                        />)}
                        <TouchableOpacity style={styles.addButton} onPress={()=>{setVisible(!visible)}}>
                            <Text>ADD</Text>
                        </TouchableOpacity>
                    <View>
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
        alignContent:'center'
    },
    topIcons:{
        padding: 8,
        borderRadius: 45
    },
    iconContainer:{
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: '10%',
        marginBottom: '5%',
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
        borderWidth: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10

    }, addButton:{
        width:"95%",
        alignSelf: "center",
        borderWidth: 1,
        alignItems: "center",
        padding:10,
        marginHorizontal: 10,
        marginBottom: 10, 
        backgroundColor: "#FFFFDB"
    }
})

export default TasksScreen;
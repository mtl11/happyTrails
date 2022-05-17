import { StyleSheet, Button, View , Text, TouchableOpacity, FlatList, Modal, Alert,Animated} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as taskActions from '../../store/actions/task';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import color from '../../constants/color';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import fonts from '../../constants/fonts';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskModuleEdit from './TaskModuleEdit';
const IndividualTask = (props) => {
    const dispatch = useDispatch();

    const [visibleEdit, setVisibleEdit] = useState(false);
    const [completed, setCompleted] = useState(false);
    const deleteTask = async () =>{
        props.localRemove(props.id);
        await dispatch(
            taskActions.deleteTask(
                props.id,
                props.userId
            )
        );
    }
    
    const renderLeftActions = () => {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'flex-end',}}>
                <TouchableOpacity onPress={()=>{Alert.alert(
                "Delete Routine",
                "This cannot be undone",
                [{  text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"},
                  { text: "Delete", onPress: () => deleteTask(), style:"destructive" }]
              );}} 
              style={{ justifyContent: 'center', alignItems: 'flex-end',}}>
                   <Text style={{ paddingHorizontal: "10%", paddingVertical: 20}}>
                    <AntDesign name="delete" size={24} color="black" />
                    </Text>
                </TouchableOpacity>
          </View>
        );
    }
    const renderRightActions = () => {
        return (
            
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
              <TouchableOpacity onPress={()=>{setVisibleEdit(true)}}>
            <Text
              style={{
                paddingHorizontal: "10%",
                paddingVertical: 20,
              }}
            >
                
                    <Feather name="edit-2" size={24} color="black" />
                
            </Text>
            </TouchableOpacity>
          </View>
         
        );
    }
    const chooseIcon = (icon) =>{
        if (icon == "Task"){
            return (
                <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black" />
            )
        }if (icon == "Habit"){
            return (
                <FontAwesome5 name="clock" size={20} color="black" />
            )
        }else{
            return(
                <MaterialIcons name="self-improvement" size={24} color="black" />
            )
        }
    }
    return (
        <Swipeable 
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        >
        <View style = {styles.container}>
        <TaskModuleEdit
            visible ={visibleEdit}
            setVisible = {setVisibleEdit}
            info ={props.info}
            icon = {props.icon}
            duration = {props.duration}
            date = {props.time}
            id = {props.id}
            updateLocal = {props.updateLocal}
            localRemove = {props.localRemove}
            />
            <View style={styles.rowContainer}>
                <Text style = {styles.taskText}>
                    {props.info}
                </Text>
                <View style={[{justifyContent:"space-between"},{flexDirection: "row"}]}>
                <View style={styles.infoContainer}>
                    <View style={styles.timeContainer}>
                        {props.mode == "sun" ? <Fontisto name="day-sunny" size={20} color="black" /> : <Fontisto name="night-clear" size={20} color="black" />}
                        <Text style={styles.timeText}>
                            {props.time}
                        </Text>
                        <Entypo name="dot-single" size={24} color="black" />
                        <Text style={styles.timeText}>
                            {props.duration}min
                        </Text>
                    </View>
                    <View style={[styles.timeContainer,{marginBottom: 5}]}>
                    {chooseIcon(props.icon)}
                        <Text style={styles.timeText}>
                            {props.icon}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{setCompleted(!completed);}}>
                     <View padding={8}>
                     <BouncyCheckbox
                        size={30}
                        fillColor={color.primary}
                        unfillColor="#FFFFFF"
                        iconStyle={[{ borderColor: "black" },{borderWidth: 1.5}]}
                        onPress={(isChecked) => {}}
                    />
                     </View>  
                 </TouchableOpacity>
                 </View>
            </View>
        </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    timeText:{
        opacity: .5,
        paddingHorizontal: 5,
        fontFamily: fonts.main
    },infoContainer:{
        marginHorizontal: 10
        //alignItems: 'center',
    },
    completeContainer:{
        borderBottomWidth: 1.5,
        flexDirection: "row",
        alignItems: 'center',
       
        // borderTopRightRadius: 8,
        // borderTopLeftRadius: 8
    },timeContainer:{
        flexDirection: "row",
        opacity:.5,
        marginTop: 5,
        alignItems: 'center'
    },
    completeText:{
        padding: 10,
        fontSize: 16
    },
    indvTaskContainer:{
        // padding:8,
        width: '80%',
        marginHorizontal: '3%',
        marginBottom: '3%',
        borderRadius:8,
    },
    rowContainer:{
        //justifyContent: 'center',
        //flexDirection: "row",
        //alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 5
    },
    modeContainer:{
        flexDirection: "row",
        alignItems: 'center',
        marginTop: "1.5%"
    },
    smallText:{
        color: "black"
    },
    taskText:{
        fontSize: 20,
        color: "black",
        //marginTop: 10,
        fontFamily: fonts.mainLightBold
    },
    container:{
        //flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
        // marginBottom: '4%',
        marginTop:'3%',
        width:"100%",
        borderRadius:10,
        alignSelf: 'center',
        backgroundColor: "white"
        //backgroundColor: "#FFFFDB"
        //backgroundColor: "#FF7F50",
        // shadowColor: 'black',
        // shadowOpacity: .4,
        // shadowRadius: 1,  
        // shadowOffset:{width:3, height:3}
    }
});

export default IndividualTask;
import * as React from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'; 
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const Navbar = props =>{
    const currentScreen = props.props.navigation.state.routeName.toString();
    return (
    <View style ={styles.taskBar}>
            <TouchableOpacity style = {styles.taskBarElements} 
                onPress={() => {props.props.navigation.navigate({routeName: "TasksScreen"})}}>
                {currentScreen== "TasksScreen" ? <Ionicons name="ios-list-circle" size={40} color="white" /> :
                 <Ionicons name="ios-list-circle-outline" size={40} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity style = {styles.taskBarElements}
            onPress={() => {props.props.navigation.navigate({routeName: "ProfileScreen"})}}>
                {currentScreen== "ProfileScreen" ? <FontAwesome5 name="user-alt" size={30} color="white" />:
                 <FontAwesome5 name="user" size={30} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity style = {styles.taskBarElements}
            onPress={() => {props.props.navigation.navigate({routeName: "JournalScreen"})}}>
                {currentScreen== "JournalScreen" ? <Ionicons name="ios-journal" size={30} color="white" /> :
                 <Ionicons name="ios-journal-outline" size={30} color="white" /> }
            </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    taskBar:{
        height:"10%",
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'black'
    },taskBarElements:{
        alignItems: 'center',
        paddingHorizontal:20,
        paddingVertical:5
    },
    taskContainer:{
        height: "90%"
    }
})
export default Navbar;


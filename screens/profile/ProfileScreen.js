import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Navbar from '../../components/navBar/navbar';

const ProfileScreen = props => {
    return (
        <View>
            <View style = {styles.taskContainer}>

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
});
export default ProfileScreen;
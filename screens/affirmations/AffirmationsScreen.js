import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const AffirmationsScreen = props => {
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
    },bigText:{
        fontSize: 30
    },
    profileContainer: {
        marginTop:"4%"
    }

});
export default AffirmationsScreen;
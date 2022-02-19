import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';

export default StyleSheet.create({
    button: {
        borderRadius: 10,
        borderWidth: 2,
        color: "black",
        borderColor: "black",
        padding: 8,
        fontSize:25,
        backgroundColor: "#20b2aa",
        shadowColor: '#171717',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: .5,
        shadowRadius: 3,
        overflow: 'hidden'
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    buttonContainer:{
        alignItems: 'center',
        marginTop:20
    },
    dialogBox:{
        borderRadius:10,
        paddingVertical:30,
        paddingHorizontal:15,
        shadowColor: '#171717',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#A8FFFF",
        width:'70%',
        height: '40%'
        
    },
    bigText:{
        fontSize:22,
    },
    userInput: {
        borderBottomWidth: 2,
        borderBottomColor:  'rgba(0, 0, 0, .5)',
        paddingTop: 12 
    }
})
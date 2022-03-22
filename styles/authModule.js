import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';

export default StyleSheet.create({
    button: {
        borderRadius: 10,
        borderWidth: 2,
        color: "black",
        borderColor: "black",
        padding: 8,
        fontSize:30,
        backgroundColor: "#ffa8a8",
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
        width:'90%',
        height: '80%',
        justifyContent:'space-between'
    },
    bigText:{
        fontSize:30,
    },
    userInput: {
        borderBottomWidth: 2,
        borderBottomColor:  'rgba(0, 0, 0, .5)',
        paddingTop: 12,
        fontSize: 20,
        marginBottom: 12
    },
    img:{
        height: 150,
        width: 150,
        alignSelf:'center'
    },
    smallText: {
        fontSize: 20
    }
})
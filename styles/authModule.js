import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';

export default StyleSheet.create({
    button: {
        fontSize: 20
    },
    cancelButton: {
        fontSize: 20,
        fontWeight: "bold"
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height:'35%',
        marginTop: '5%',
        justifyContent: "space-evenly",
        borderWidth:2,
        borderRadius: 10,
        backgroundColor: "#FFDBFF"
    },
    dialogBox:{
        borderRadius:10,
        paddingVertical:30,
        paddingHorizontal:15,
        // shadowColor: '#171717',
        // shadowOffset: {width: -4, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        backgroundColor: "#A8FFFF",
        width:'93%',
        height: '85%',
        justifyContent:'space-between'
    },
    bigText:{
        fontSize:30,
    },
    userInput: {
        //borderWidth: 1.5,
        //borderColor: 'rgba(0, 0, 0, .5)',
        // borderBottomColor:  'rgba(0, 0, 0, .5)',
        shadowColor: '#171717',
        shadowOffset: {width: -3, height: 3},
        shadowOpacity: 0.2,
        backgroundColor:"#FFFFDB",
        padding: 8,
        fontSize: 16,
        marginBottom: 12,
        marginTop: 12
    },
    img:{
        height: 150,
        width: 150,
        alignSelf:'center'
    },
    smallText: {
        fontSize: 20,
        marginTop:"10%"
    },
    buttonContainerCancel:{
        alignItems: 'center',
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height:'35%',
        marginTop: '5%',
        justifyContent: "space-evenly"
    }
})
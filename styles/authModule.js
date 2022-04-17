import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';
import fonts from '../constants/fonts';
import color from '../constants/color';

export default StyleSheet.create({
    button: {
        fontSize: 20,
        fontFamily: fonts.main
    },
    cancelButton: {
        fontSize: 20,
        fontFamily: fonts.mainBold
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
        borderRadius: 45,
        backgroundColor: color.primary
    },
    dialogBox:{
        borderRadius:10,
        paddingVertical:30,
        paddingHorizontal:15,
        shadowColor: '#171717',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "white",
        width:'97%',
        height: '90%',
        justifyContent:'space-between'
    },
    bigText:{
        fontSize:30,
        fontFamily: fonts.mainBold
    },
    userInput: {
        borderWidth: 1.5,
        borderColor: color.primary,
        // borderBottomColor:  'rgba(0, 0, 0, .5)',
        // shadowColor: '#171717',
        // shadowOffset: {width: -3, height: 3},
        // shadowOpacity: 0.2,
        //backgroundColor:"#FFFFDB",
        padding: 10,
        paddingHorizontal: 16,
        fontSize: 20,
        marginBottom: 12,
        marginTop: 12,
        borderRadius: 45,
        fontFamily: fonts.main
    },
    img:{
        height: 150,
        width: 150,
        alignSelf:'center'
    },
    smallText: {
        fontSize: 20,
        marginTop:"10%",
        fontFamily: fonts.main
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
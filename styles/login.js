import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';

export default StyleSheet.create({
    authContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'60%',
        height:'10%',
        marginVertical: '10%',
        justifyContent: "space-evenly",
        borderWidth:2,
        borderRadius: 10,
        backgroundColor: "#FFDBFF"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFDB',
      alignContent:"center"
    },
    titleText:{
        fontSize: 30
    },
    img:{
        height: 150,
        width: 150
    },
    titleImg:{
        justifyContent:'center',
        alignContent:"center",
        textAlign: 'center',
        borderWidth:1
    }
  });
import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity, TextInput, Button, Modal, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import color from '../../constants/color';
import fonts from '../../constants/fonts';

import * as journalActions from '../../store/actions/journalPage'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEntry = props => {
    const [date, setDate] = useState();
    const [mood, currentMood] = useState();
    const [page, setPage] = useState();
    const [dow, setDOW] = useState();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dispatch = useDispatch();

    const data = [
        {
            id: 1,
            mood: "😀"
        },
        {
            id: 2,
            mood: "🙂"
        },
        {
            id: 3,
            mood: "😕"
        },
        {
            id: 4,
            mood: "☹️"
        },
        {
            id: 5,
            mood: "😢"
        },
    ];

    const addJournalPage = async () => {
        console.log(props.data);
        const addedVal = {
            "date": date,
            "dow": dow,
            "journalentry": page,
            "mood": mood
        }
        const newData = props.data.push(addedVal);

        // const value = await AsyncStorage.getItem('userId');
        // await dispatch(
        //     journalActions.addPage(
        //         value,
        //         mood,
        //         date,
        //         dow,
        //         page
        //     )
        // );
       
    }

    const Item = ({ title }) => (
        mood == title ? 
        <TouchableOpacity style={styles.itemPressed} onPress = {()=>{currentMood(title);}}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity> :
         <TouchableOpacity style={styles.item} onPress = {()=>{currentMood(title);}}>
         <Text style={styles.title}>{title}</Text>
       </TouchableOpacity> 
    );

    const renderItem = ({ item }) => (
        <Item title={item.mood} />
    );
    const getDate = () => {
        var today = new Date();
        setDOW(weekday[today.getDay()]);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy; 
        setDate(today);
        
    }

    useEffect(()=>{
        getDate()
    },[])

    return (
        // <View>
            <Modal
                animationType="slide"
                visible={props.isVisible}
            >
            <SafeAreaView style = {styles.taskContainer}>
                <View style={styles.pageContainer}>
                    {/* <View> */}
                        <Text style={styles.dateText}>
                            Today's Date: {date}
                        </Text>
                        <Text style={styles.bigText}>
                            How are you feeling today ?
                        </Text>
                        <View style={styles.moodContainer}>
                            <FlatList
                            horizontal={true}
                            data ={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style ={styles.moodList}
                            />
                        </View>
                        <Text style={styles.bigText}>
                            What did you do today ?
                        </Text>
                        {/* <View style={styles.inputView}> */}
                            <TextInput
                                multiline 
                                style ={styles.jounralInput}
                                onChangeText={newText => setPage(newText)}
                            />
                        {/* </View> */}
                        
                        {/* <TouchableOpacity style={styles.addButton} onPress={()=>{addJournalPage(),props.setModule(false)}}>
                            <Text style={styles.dateText}>Done</Text>
                        </TouchableOpacity>
                       <Button title={"Cancel"} onPress={()=>{props.setModule(false)}}/> */}
                        <View style={styles.buttonOverview}>
                            <TouchableOpacity 
                                style={[styles.buttonContainer,{backgroundColor: color.primary}]}
                                onPress ={()=>{addJournalPage(),props.setModule(false)}}
                            >
                                <Text style={styles.buttonText}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonContainer, {borderColor: color.primary}, {backgroundColor: "white"}]}
                            onPress ={()=>{props.setModule(false), currentMood()}}
                            >
                                <Text style={styles.buttonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    {/* </View> */}
                </View>
            </SafeAreaView>
            </Modal>
        // </View>
    )
}

const styles = StyleSheet.create({
    taskContainer:{
        // height: "90%",
        // alignContent:'center',
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1,
        backgroundColor: color.primaryGray
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    inputView:{
        borderWidth:1,
        width: "100%"
    },
    pageContainer:{
        // borderWidth: 1,
        // height: "90%",
        // marginHorizontal: "5%",
        // marginVertical:"12%",
        // flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },moodContainer:{
        borderWidth: 1,
        borderRadius: 10,
        // paddingHorizontal: "7%",
        height: "15%",
        marginHorizontal: "5%",
        marginVertical:"4%",
        backgroundColor: color.secondary,
        
    },moodList:{

    },
    title: {
        fontSize: 32
    },
    bigText:{
        fontSize: 22,
        fontFamily: fonts.main
    },
    dateText: {
        fontSize: 17,
        fontFamily: fonts.main,
        textAlign: 'center'
    },
    jounralInput:{
        // borderWidth: 1,
        height: "60%",
        width: "94%",
        borderRadius: 5,
        padding:10,
        fontSize: 18,
        backgroundColor: color.secondary,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity:.05,
        shadowRadius: .1,
        marginBottom: "5%",
        marginTop: "2%"
        
    },
    itemPressed :{
        backgroundColor: color.primary,
        padding: 25,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 45,
        borderWidth: 3
    },
    item: {
        backgroundColor: color.secondary,
        borderColor:color.primary,
        padding: 25,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 45,
        borderWidth: 3,
        // height: "80%",
        // width: "30%"
      },
    // addButton:{
    //     borderWidth: 1,
    //     padding: 8,
    //     marginTop: 18,
    //     marginBottom: 9,
    //     width: "40%",
    //     alignSelf: "center",
    // },
    buttonContainer:{
        borderRadius: 45,
        borderWidth:1.5,
        // marginHorizontal: "10%",
        width: "40%",
        alignItems: "center"
    },
    buttonOverview:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        // borderWidth: 1,
        width: "100%"
    },
    buttonText:{
        fontFamily: fonts.main,
        fontSize: 18,
        padding: 10
    }
});
export default AddEntry;
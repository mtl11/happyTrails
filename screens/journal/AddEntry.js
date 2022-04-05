import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity, TextInput, Button, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

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
        <View>
            <Modal
                animationType="slide"
                visible={props.isVisible}
            >
            <View style = {styles.taskContainer}>
                <View style={styles.pageContainer}>
                    <View>
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
                        <TextInput
                            multiline 
                            style ={styles.jounralInput}
                            onChangeText={newText => setPage(newText)}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={()=>{addJournalPage(),props.setModule(false)}}>
                            <Text style={styles.dateText}>Done</Text>
                        </TouchableOpacity>
                       <Button title={"Cancel"} onPress={()=>{props.setModule(false)}}/>
                    </View>
                </View>
            </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer:{
        height: "90%",
        alignContent:'center'
    },pageContainer:{
        // borderWidth: 1,
        height: "90%",
        marginHorizontal: "5%",
        marginVertical:"12%"
    },moodContainer:{
        borderWidth: 1,
        // height: "12%",
        margin: "5%",
        backgroundColor: '#f9c21f',
    },moodList:{

    },item: {
        backgroundColor: '#f9c2ff',
        borderColor:'#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 3
      },
    title: {
        fontSize: 32,
    },
    bigText:{
          fontSize: 24
    },
    dateText: {
        fontSize: 18,
        textAlign: 'center'
    },
    jounralInput:{
        borderWidth: 1,
        height: "65%",
        borderRadius: 5,
        padding:10,
        fontSize: 18,
    },
    itemPressed :{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 3
    },addButton:{
        borderWidth: 1,
        padding: 8,
        marginTop: 18,
        marginBottom: 9,
        width: "40%",
        alignSelf: "center",
    }
});
export default AddEntry;
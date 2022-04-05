import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity, TextInput, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import { AntDesign } from '@expo/vector-icons';
import AddEntry from './AddEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalScreen = props =>{
    const [data,setData] = useState(
        [{

        }]); 
    
    
    
    const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(0);
    const [mood, setMood] = useState(data[currentEntry].mood);
    const [date, setDate] = useState(data[currentEntry].date);
    const [dow, setDow] = useState(data[currentEntry].dow);
    const [journalText, setJournalText] = useState(data[currentEntry].journalentry);

    const changeEntry  = (value) => {
        // console.log(data);
        // console.log(data[currentEntry + value]);
        setDate(data[currentEntry+ value].date);
        setMood(data[currentEntry+ value].mood);
        setDow(data[currentEntry+ value].dow);
        setJournalText(data[currentEntry+ value].journalentry);
    }

    useEffect(async () => {
        const myPages = await AsyncStorage.getItem('myPages');
        const data = JSON.parse(myPages)
        //console.log(data);
        setData(data);
    },[]);

    useEffect(()=>{
        changeEntry(0);
    });
    return(
        <View>
            <AddEntry
            isVisible ={modalVisibleLogin}
            setModule ={setModalVisibleLogin}
            data = {data}
            />
            <View style={styles.taskContainer}>
            <TouchableOpacity style={styles.addView} onPress={()=>{setModalVisibleLogin(true)}}>
            <AntDesign name="pluscircleo" size={30} color="black" />
            </TouchableOpacity>
                <View style ={styles.topView}>
                    
                    <Text style={styles.smallText}>{date}</Text>
                    <View style={styles.moodAndDay}>
                        <View style={styles.moodView}>
                            <Text style={{fontSize:30}}>{mood}</Text>
                        </View>
                        <View style={styles.dayView}>
                            <Text style={styles.dayText}>{dow}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.journalInfo}>
                    <Text style={styles.journalText}>
                        {journalText}
                    </Text>
                </View>
                <View style={styles.pageNumberView}>
                    <TouchableOpacity  onPress={()=>{
                        if (currentEntry !=0) {
                            setCurrentEntry(currentEntry-1); 
                            changeEntry(-1);
                        }}}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.smallText}>
                         {currentEntry+1} / {data.length}
                    </Text>
                    <TouchableOpacity  onPress={()=>{
                        if ((currentEntry+1) < data.length){
                            setCurrentEntry(currentEntry+1); 
                            changeEntry(1);
                        }}}> 
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
            </View>
            <Navbar props = {props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer:{
        height: "90%",
        alignContent:'center'
    },moodAndDay:{
        flexDirection: 'row',
        alignItems:'center',
         marginVertical: 5
    },dayView:{
        width:"80%", 
        borderWidth:1,
        alignItems: "center"
    },pageNumberView:{
        // borderWidth: 1,
        height: "5%",
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    topView:{
        // borderWidth: 1,
        height: "15%",
        //marginTop: "15%",
        // width:"100%", 
        marginHorizontal: 10 
    },
    moodView:{
        borderWidth:3,
        padding: "5%",
        width:"20%", 
        backgroundColor: '#f9c2ff',
        borderRadius: 10
    },
    smallText:{
        fontSize: 18
    },
    dayText: {
        fontSize: 50
    },
    journalInfo:{
        borderWidth:1,
        marginHorizontal: 10,
        height: "60%",
        borderRadius: 5,
        padding:10,
    },
    journalText:{
        fontSize: 18
    },
    addView:{
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight: "5%"
    }
});
export default JournalScreen;
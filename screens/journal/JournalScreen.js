import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import { AntDesign } from '@expo/vector-icons';
import AddEntry from './AddEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../constants/color';
import fonts from '../../constants/fonts';
import { Feather } from '@expo/vector-icons';
//import { createDrawerNavigator} from 'react-navigation-drawer';

const JournalScreen = props =>{
    // const Drawer = createDrawerNavigator();

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
    const deleteEntry = () => {

        const filteredData = data.splice(currentEntry,currentEntry+1);
        changeEntry(0);
        // console.log(filteredData);
        // console.log(currentEntry);
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
            <View style ={styles.topContainer}>
            <View style= {styles.iconContainer}>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Delete Journal Entry",
                        "This cannot be undone",
                        [{  text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"},
                          { text: "Delete", onPress: () => deleteEntry(), style:"destructive" }]
                      );}}>
                    <AntDesign name="delete" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={()=>{setModalVisibleLogin(true)}}>
                    <AntDesign name="pluscircleo" size={30} color="white" />
                </TouchableOpacity>
            </View>
                <View style ={styles.topView}>
                    <View style={styles.moodAndDay}>
                        <View style={styles.moodView}>
                            <Text style={{fontSize:40, padding: '5%'}}>{mood}</Text>
                        </View>
                        <View style={styles.dayView}>
                            <Text style={styles.dayText}>{dow}</Text>
                            <Text style={styles.smallText}>{date}</Text>
                        </View>
                    </View>
                </View>

            </View>
                <View style = {styles.bottomView}>
                <View style={styles.journalInfo}>
                    <Text style={styles.journalText}>
                        {journalText}
                    </Text>
                </View>
                <View style={styles.pageNumberView}>
                        {currentEntry == 0  ? <AntDesign name="arrowleft" size={24} color="grey"/> : <TouchableOpacity  onPress={()=>{
                        if (currentEntry !=0) {
                            setCurrentEntry(currentEntry-1); 
                            changeEntry(-1);
                        }}}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>}
                    <Text style={styles.smallText}>
                         {currentEntry+1} / {data.length}
                    </Text>
                    {currentEntry+1 == data.length ? <AntDesign name="arrowright" size={24} color="grey"/> :<TouchableOpacity  onPress={()=>{
                        if ((currentEntry+1) < data.length){
                            setCurrentEntry(currentEntry+1); 
                            changeEntry(1);
                        }}}> 
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>}
                </View>
                </View>
            </View>
            <Navbar props = {props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    taskContainer:{
        height: "90%",
        alignContent:'center',
        backgroundColor: color.primaryGray
    },
    addButton:{
        alignSelf:"flex-end",
        // marginTop: "12%",
        // marginRight: "8%"
    },moodAndDay:{
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: '3%',
       
    },dayView:{
        width:"75%", 
        // borderWidth:1,
        alignItems: "center"
    },pageNumberView:{
        // borderWidth: 1,
        height: "5%",
        marginTop: "8%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    iconContainer:{
        flexDirection:'row',
        marginTop: "12%",
        justifyContent: 'space-between',
        marginHorizontal: "8%"
    },
    topView:{
        // borderWidth: 1,
        //height: "15%",
        //marginTop: "15%",
        // width:"100%", 
        marginHorizontal: "2%"
    },
    topContainer:{
        backgroundColor: color.primary
    },
    moodView:{
        borderWidth:1.5, 
        backgroundColor: color.secondary,
        borderRadius: 45,
        alignContent: 'center'
    },
    smallText:{
        fontSize: 18,
        fontFamily: fonts.main,
        opacity: .5
    },
    dayText: {
        fontSize: 40,
        fontFamily: fonts.mainBold
    },
    journalInfo:{
        marginHorizontal: "3%",
        height: "75%",
        marginTop: "3%",
        borderRadius: 5,
        padding:10,
        backgroundColor: "white",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity:.05,
        shadowRadius: .1
    },
    bottomView:{
        //marginTop: '5%',
        backgroundColor: color.primaryGray
    },
    journalText:{
        fontSize: 18,
        fontFamily: fonts.main
    },
    addView:{
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight: "5%"
    },
    
});
export default JournalScreen;
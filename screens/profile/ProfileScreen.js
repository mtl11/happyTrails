import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import fonts from '../../constants/fonts';
import color from '../../constants/color';

const ProfileScreen = props => {
    const [data, setData] = useState(data);
    const [firstName, setFirstName] = useState();
    const [userName, setUserName] = useState();
    
    const getData = async () => {
        const info = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(info);
        console.log(userData);
        setData(userData);
        setFirstName(userData.firstName);
        setUserName(userData.username);
    }
    useEffect(()=>{getData()},[])
    
    return (
        <View>
            <View style = {styles.taskContainer}>
                    <View style={styles.topContainer}>
                        <Text style = {styles.bigText}>
                                Welcome, {firstName}
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image 
                            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                            style={styles.profileImg}
                            />
                        </View>
                        {/* <Text style = {styles.profileText}>
                                {userName}
                        </Text> */}
                        <View style={styles.statsRow}>
                            <View style={styles.statsCol}>
                                <Text style={styles.statsTitleText}>
                                    Routines
                                </Text>
                                <Text>
                                    0
                                </Text>
                            </View>
                            <View style={[styles.statsCol, {borderLeftWidth:1},{borderRightWidth:1},{paddingHorizontal:"8.5%"}]}>
                                <Text style={[styles.statsTitleText]}>
                                    Exercises
                                </Text>
                                <Text>
                                    0
                                </Text>
                            </View>
                            <View style={styles.statsCol}>
                                <Text style={styles.statsTitleText}>
                                    Journal
                                </Text>
                                <Text>
                                    0
                                </Text>
                            </View>
                        </View>
                    </View>
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
        fontSize: 30,
        fontFamily: fonts.mainLightBold,
        //color: "white",
        marginLeft: "3%"
    },
    profileContainer: {
        marginTop:"4%"
    },profileImg:{
        width: 120,
        height: 120,
        borderWidth:2,
        borderColor: "white",
        marginVertical:"1%",
        borderRadius: 100
    },
    topContainer:{
        paddingTop:"10%",
        backgroundColor: color.primary
    },
    imageContainer:{
        alignItems: "center"
        // borderWidth:4
    },
    profileText:{
        // alignSelf:"center",
        fontFamily: fonts.main,
        fontSize: 20,
    },
    //statsRow
    statsRow:{
        flexDirection: "row",
        justifyContent:"space-around",
        marginVertical: "3%"
    },
    statsTitleText: {
        fontSize: 16,
        fontFamily: fonts.main

    },
    statsCol:{
        flexDirection: "column",
        alignItems: "center"
    }
});
export default ProfileScreen;
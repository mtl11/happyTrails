import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
//import LoginModule from '../../components/login/LoginModule';
import SignUpModule from '../../components/login/SignUpModule';
import { AntDesign } from '@expo/vector-icons';
import * as authActions from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { signUp } from '../../store/actions/auth';
import {useSelector, useDispatch} from 'react-redux';
//import styles from '../../styles/login';

const LoginScreen = props => {
    const [modalVisibleSignUp, setModalVisibleSignUp] = useState(false);
    const dispatch = useDispatch();
   // const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const tryLogin = async () =>{
        try{
            await dispatch(
                authActions.login(
                    email,
                    password
                )
            );
            const userData = await AsyncStorage.getItem('userData');
            setEmail("");
            setPassword("");
            if (userData != null){
                call();
            }
        }catch(err){
            console.log(err);
        }
    }
    const call = () => {
        props.navigation.navigate({routeName: 'OtherNav'})
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
            {/* <LoginModule 
            isVisible ={modalVisibleLogin}
            setModule ={setModalVisibleLogin}
            call = {call}
            /> */}
            <SignUpModule
            isSignVisible ={modalVisibleSignUp}
            setSignModule ={setModalVisibleSignUp}
            />
                <Text style ={{fontSize: 40,padding:5}} >
                   EDEN
                </Text>
                <Image 
                style = {styles.img}
                source={{   
                    uri: 'https://upload.wikimedia.org/wikipedia/en/1/19/LearntoFlySurfacesEltonJohn.png',
                }}/>
                <Text style = {{padding: 3}}>
                    your garden awaits...
                </Text>
                <View style={styles.dialogBox}>
                    <Text style = {styles.smallText}>
                            Enter Information:
                    </Text>
                        <View  style = {styles.userInput}>
                        <AntDesign name="user" size={24} color="gray" />
                        <TextInput
                            placeholder = {'Email'}
                            style = {{fontSize:20,width:"90%"}}
                            onChangeText={text => setEmail(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                            keyboardType = {'email-address'}
                        />
                        </View>
                        <View  style = {styles.userInput}>
                        <AntDesign name="lock" size={24} color="gray" />
                        <TextInput
                            placeholder = {'Password'}
                            style = {{fontSize:20, width:"90%"}}
                            onChangeText={text => setPassword(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                            secureTextEntry={true}
                        />
                        </View>
                </View>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style = {styles.authContainer}
                onPress={()=>{
                    tryLogin()
                //setModalVisibleLogin(!modalVisibleLogin)
            }}>
                    <View style = {styles.gamePlayButtons}>
                        <Text style={styles.titleText}>
                            Login 
                        </Text>
                    </View>
            </TouchableOpacity>
        <View style = {styles.authContainer2}>
            <Text>Don't have an account ? </Text>
            <TouchableOpacity onPress={()=>{setModalVisibleSignUp(!modalVisibleSignUp)}}> 
                <View>
                    <Text style = {styles.signUpText}>
                        Sign Up
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    authContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        height:'25%',
        marginTop: '5%',
        justifyContent: "space-evenly",
        borderWidth:2,
        borderRadius: 10,
        backgroundColor: "#FFDBFF"
    },
    authContainer2:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'80%',
        height:'25%',
        justifyContent: "center",
    },
    infoContainer:{
        height:"80%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonContainer:{
        height:"25%"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      alignContent:"center"
    },
    titleText:{
        fontSize: 20,
        padding:2
    },
    img:{
        height: 150,
        width: 150,
    },
    titleImg:{
        justifyContent:'center',
        alignContent:"center",
        textAlign: 'center',
        borderWidth:1
    },
    signUpText:{
        fontWeight: "bold"
    },
    userInput: {
        flexDirection: 'row',
        padding: 8,
        fontSize: 20,
        marginBottom: 12,
        marginTop: 12,
        backgroundColor: "#FFFFDB",
        shadowColor: '#171717',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: 0.2
    },
    smallText: {
        fontSize: 20
    },
    dialogBox:{
        width:'90%',
        paddingTop: "20%"
    }
});

export default LoginScreen;

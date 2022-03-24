import { StyleSheet, Text, View , TextInput, SafeAreaView, Image, TouchableOpacity, Modal, Alert} from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/authModule.js';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginModule = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
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
                props.call();
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={props.isVisible}
                >
            <View style={styles.modalView}>
                <View style={styles.dialogBox}>
                    <Text style ={styles.bigText}>
                        Login to EDEN
                    </Text>
                        <Image 
                    style = {styles.img}
                    source={{
                        uri: 'https://direct.rhapsody.com/imageserver/images/alb.325466613/500x500.jpg',
                    }}/>
                    <View>
                        <Text style = {styles.smallText}>
                            Enter Info:
                        </Text>
                        <TextInput
                            placeholder = {'Email'}
                            style = {styles.userInput}
                            onChangeText={text => setEmail(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                            keyboardType = {'email-address'}
                        />
                        <TextInput
                            placeholder = {'Password'}
                            style = {styles.userInput}
                            onChangeText={text => setPassword(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                    <TouchableOpacity style = {styles.buttonContainer}
                    onPress={()=>{props.setModule(!props.isVisible), tryLogin()}}>
                        <Text style = {styles.button}
                        >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                    onPress={()=>{props.setModule(!props.isVisible)}}>
                        <Text style = {styles.button}
                        >Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default LoginModule;
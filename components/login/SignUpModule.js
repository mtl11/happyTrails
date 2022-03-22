import { StyleSheet, Text, View , TextInput, SafeAreaView, Button, TouchableOpacity, Modal} from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/authModule.js';
import * as authActions from '../../store/actions/auth';
import {useSelector, useDispatch} from 'react-redux';

const SignUpModule = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const dispatch = useDispatch();

    const trySignUp = async () =>{
        await dispatch(
            authActions.signUp(
                username,
                firstName,
                email,
                password,
                age
            )
        );
        setFirstName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setAge(0);
    }

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={props.isSignVisible}
            >
            <View style={styles.modalView}>
                <View style={styles.dialogBox}>
                    <Text style ={styles.bigText}>
                        Sign Up for EDEN
                    </Text>
                    <View>
                        <Text style = {styles.smallText}>
                            Enter Info:
                        </Text>
                        <TextInput
                            placeholder = {'Username'}
                            style = {styles.userInput}
                            onChangeText={text => setUsername(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                        />
                        <TextInput
                            placeholder = {'Firstname'}
                            style = {styles.userInput}
                            onChangeText={text => setFirstName(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                        />
                        <TextInput
                            placeholder = {'Age'}
                            style = {styles.userInput}
                            onChangeText={text => setAge(text)}
                            autoCapitalize = {'none'}
                            autoCorrect = {false}
                            keyboardType = {'number-pad'}
                        />
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
                        <TouchableOpacity 
                            style = {styles.buttonContainer} 
                            onPress={() => {props.setSignModule(!props.isSignVisible), trySignUp()}}>
                            <Text style = {[styles.button,{backgroundColor:"#a8ffa8"}]}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer}
                        onPress={()=>{props.setSignModule(!props.isSignVisible)}}>
                            <Text style = {styles.button}
                            >Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default SignUpModule;
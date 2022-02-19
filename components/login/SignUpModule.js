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
                    <TextInput
                        placeholder = {'Username'}
                        style = {styles.userInput}
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        placeholder = {'Firstname'}
                        style = {styles.userInput}
                        onChangeText={text => setFirstName(text)}
                    />
                    <TextInput
                        placeholder = {'Age'}
                        style = {styles.userInput}
                        onChangeText={text => setAge(text)}
                    />
                    <TextInput
                        placeholder = {'Email'}
                        style = {styles.userInput}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        placeholder = {'Password'}
                        style = {styles.userInput}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity 
                        style = {styles.buttonContainer} 
                        onPress={() => {props.setSignModule(!props.isSignVisible), trySignUp()}}>
                        <Text style = {styles.button}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
export default SignUpModule;
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
                    <View style ={{height: "75%"}}>
                    <Text style ={styles.bigText}>
                        Sign Up for EDEN
                    </Text>
                    <View>
                        <Text style = {styles.smallText}>
                            Enter Information:
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
                    </View>
                    <View style ={{height: "25%"}}>
                        <View style = {styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress={() => {props.setSignModule(!props.isSignVisible), trySignUp()}}>
                                <View>
                                    <Text style = {styles.button}>
                                        Sign Up
                                    </Text>
                                </View>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style = {styles.buttonContainerCancel}
                        onPress={()=>{props.setSignModule(!props.isSignVisible)}}>
                           <View><Text style = {styles.cancelButton}
                            >Cancel</Text></View> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default SignUpModule;
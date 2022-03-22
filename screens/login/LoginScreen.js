import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import LoginModule from '../../components/login/LoginModule';
import SignUpModule from '../../components/login/SignUpModule';
import styles from '../../styles/login';

const LoginScreen = props => {
    const [modalVisibleSignUp, setModalVisibleSignUp] = useState(false);
    const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
    const call = () => {
        props.navigation.navigate({routeName: 'OtherNav'})
    }
    
    return(
        <View style={styles.container}>
            <LoginModule 
            isVisible ={modalVisibleLogin}
            setModule ={setModalVisibleLogin}
            call = {call}
            />
            <SignUpModule
            isSignVisible ={modalVisibleSignUp}
            setSignModule ={setModalVisibleSignUp}
            />
                <Text style ={{fontSize: 30,padding:5}} >
                    Welcome to EDEN
                </Text>
                <Text style = {{padding: 3}}>
                    your garden awaits...
                </Text>
                <Image 
                style = {styles.img}
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/en/1/19/LearntoFlySurfacesEltonJohn.png',
                }}/>
        <View style = {styles.authContainer}>
            <TouchableOpacity 
                onPress={()=>{
                    setModalVisibleLogin(!modalVisibleLogin)}}>
                    <View style = {styles.gamePlayButtons}>
                        <Text style={styles.titleText}>
                            Login 
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setModalVisibleSignUp(!modalVisibleSignUp)}}>
                    <View style = {styles.gamePlayButtons}>
                        <Text style={styles.titleText}>
                            Sign Up 
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen;

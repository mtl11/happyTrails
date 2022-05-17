import * as React from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'; 
import { FontAwesome, Ionicons ,Fontisto, MaterialCommunityIcons} from '@expo/vector-icons';
import color from '../../constants/color';

const Navbar = props =>{
    const currentScreen = props.props.navigation.state.routeName.toString();

    return (
    <View style ={styles.taskBar}>
            <TouchableOpacity style = {styles.taskBarElements} 
                onPress={() => {props.props.navigation.navigate({routeName: "TasksScreen"})}}>
                {currentScreen== "TasksScreen" ? 
               <View style = {[styles.iconIndv,{marginTop: 5}]}>
                   <FontAwesome name="list" size={30} color="black" />
                   <Text style={styles.textBar}>Routine</Text>
                </View>
                :
                <View style = {[styles.iconIndvNoClick,{marginTop: 5}]}>
                    <FontAwesome name="list" size={30} color="black"/> 
                    <Text style={styles.textBar}>Routine</Text>
                </View>}
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.taskBarElements,{marginTop: 2}]}
            onPress={() => {props.props.navigation.navigate({routeName: "AffirmationsScreen"})}}>
                {currentScreen== "AffirmationsScreen" ? 
                <View style = {[styles.iconIndv,{marginTop: 2}]}>
                     <MaterialCommunityIcons name="brain" size={32} color="black" />
                    <Text style={styles.textBar}>Exercises</Text>
                </View> 
                :
                <View style = {[styles.iconIndvNoClick,{marginTop: 2}]}>
                    <MaterialCommunityIcons name="brain" size={32} color="black" />
                    <Text style={styles.textBar}>Exercises</Text>
                </View>  }
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.taskBarElements,{marginTop: 2}]}
            onPress={() => {props.props.navigation.navigate({routeName: "JournalScreen"})}}>
                {currentScreen== "JournalScreen" ? 
                <View style = {styles.iconIndv}>
                    <Ionicons name="ios-journal" size={32} color="black"/>
                    <Text style={styles.textBar}>Journal</Text>
                </View> 
                :
                <View style = {[styles.iconIndvNoClick,{marginTop: 0}]}>
                    <Ionicons name="ios-journal" size={32} color="black" />
                    <Text style={styles.textBar}>Journal</Text>
                </View>  }
            </TouchableOpacity>
            <TouchableOpacity style = {styles.taskBarElements}
            onPress={() => {props.props.navigation.navigate({routeName: "ProfileScreen"})}}>
                {currentScreen== "ProfileScreen" ? 
                <View style = {[styles.iconIndv,{marginTop: 4}]}>
                    <FontAwesome name="user-circle-o" size={32} color="black" />
                    <Text style={[styles.textBar,{color:color.primary}]}>Profile</Text>
                </View>
                :
                <View style = {[styles.iconIndvNoClick,{marginTop: 4}]}>
                    <FontAwesome name="user-circle-o" size={32} color="black"/>
                    <Text style={styles.textBar}>Profile</Text>
                </View>}
            </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    taskBar:{
        height:"11%",
        //borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: 'white',
        //borderWidth:1
    },taskBarElements:{
        alignItems: 'center',
        alignContent: "center",
       // justifyContent:'center',
        //paddingHorizontal:25,
        //paddingVertical:5,
        textAlign: "center",
        //borderWidth:1,
    },
    iconIndvNoClick:{
        alignItems: 'center',
        opacity: .3,
        padding: 2
    },
    textBar:{
        textAlign: "center",
        fontSize: 14,
    },
    iconIndv:{
        alignItems: 'center',
        padding: 2
       
    }
    // taskContainer:{
    //     height: "90%"
    // }
})
export default Navbar;


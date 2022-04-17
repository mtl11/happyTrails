import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/login/LoginScreen';
import authReducer from './store/reducers/auth';
import taskReducer from './store/reducers/task';
import ScreenNavigation from './Navigation/ScreenNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
enableScreens();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular' : require("./assets/fonts/Poppins-Regular.ttf"),
    'Poppins-Bold' : require("./assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Light' : require("./assets/fonts/Poppins-Light.ttf"),
  });
  //let fontsLoaded = true;
  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <Provider store={store}>
       <ScreenNavigation/>
    </Provider>
  );
}

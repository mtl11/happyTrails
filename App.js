import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/login/LoginScreen';
import authReducer from './store/reducers/auth';
import ScreenNavigation from './Navigation/ScreenNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { enableScreens } from 'react-native-screens';

const store = createStore(authReducer,applyMiddleware(ReduxThunk));
enableScreens();
export default function App() {
  return (
    <Provider store={store}>
       <ScreenNavigation/>
    </Provider>
  );
}

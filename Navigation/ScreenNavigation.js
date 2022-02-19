import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/login/LoginScreen.js';
import TasksScreen from '../screens/tasks/TasksScreen.js'

const OtherNav = createStackNavigator({
    TasksScreen: TasksScreen
});

const MainNav = createSwitchNavigator({
    LoginScreen: LoginScreen,
    OtherNav: OtherNav
})


export default createAppContainer(MainNav);
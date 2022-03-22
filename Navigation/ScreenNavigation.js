import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/login/LoginScreen.js';
import TasksScreen from '../screens/tasks/TasksScreen.js'
import JournalScreen from '../screens/journal/JournalScreen.js';
import ProfileScreen from '../screens/profile/ProfileScreen.js';

const OtherNav = createSwitchNavigator({
    TasksScreen: TasksScreen,
    JournalScreen: JournalScreen,
    ProfileScreen: ProfileScreen
});

const MainNav = createSwitchNavigator({
    LoginScreen: LoginScreen,
    OtherNav: OtherNav
})

export default createAppContainer(MainNav);
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
import * as journalActions from './journalPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const authenticate = (userId, username, firstName, age, email, password, loggedIn) => {
  return { type: AUTHENTICATE, userId: userId, username: username, firstName: firstName, 
    age:age, email:email, password:password, loggedIn:loggedIn };
};

export const login = (email, password) =>{
    return async dispatch => {
        const response = await fetch('http://localhost:3000/users')
                .then((response) => response.json())
                .then((json) => {
                    for (const item in json){
                        const userInfo = json[item];
                        console.log(userInfo);
                        if(email == userInfo.email && password == userInfo.password){
                            dispatch(authenticate(userInfo.id,userInfo.username, 
                                userInfo.firstName, userInfo.age, userInfo.email, userInfo.password, true));
                                AsyncStorage.setItem("userId", userInfo.id.toString());
                            saveDataToStorage(userInfo.username, userInfo.firstname, userInfo.age, userInfo.email,userInfo.password);
                            dispatch(journalActions.getPages(userInfo.id.toString()));
                            return;
                        }
                    }
                    console.log("No User Found");
                    dispatch({type: LOGOUT});
                    AsyncStorage.removeItem('userData');
            })
    }
}

export const signUp = (username, firstName, email, password, age) => {
    return async dispatch => {
        fetch('http://localhost:3000/users',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {"username": username, 
                "firstName": firstName,
                "age": age,
                "email":email,
                "password":password})
        })
        
    }
}

const saveDataToStorage = (username, firstName, age, email,password)=>{
    console.log("name: "+firstName);
    AsyncStorage.setItem('userData', JSON.stringify({
      username:username,
      firstName:firstName,
      age:age,
      email:email,
      password:password
    }))
};


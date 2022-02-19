export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const authenticate = (userId, email, loggedIn) => {
  return { type: AUTHENTICATE, userId: userId, email:email, loggedIn:loggedIn };
};

export const login = (email, password) =>{
    return async dispatch => {
        const response = await fetch('http://localhost:3000/users')
                .then((response) => response.json())
                .then((json) => {
                    for (const item in json){
                        const userInfo = json[item];
                        if(email == userInfo.email && password == userInfo.password){
                            dispatch(authenticate(userInfo.id, userInfo.email, true));
                            saveDataToStorage(userInfo.username, userInfo.firstName, userInfo.age, userInfo.email,userInfo.password);
                            return true;
                        }
                    }
                    console.log("No User Found");
                    dispatch({type: LOGOUT});
                    AsyncStorage.removeItem('userData');
                    return false;
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
    AsyncStorage.setItem('userData', JSON.stringify({
      username:username,
      firstName:firstName,
      age:age,
      email:email,
      password:password
    }))
};


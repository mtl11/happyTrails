import {AUTHENTICATE,LOGOUT} from "../actions/auth";
const initialState = {
    userId:null,
    email:null,
    firstName:null,
    age: null,
    password: null,
    username: null,
    loggedIn:false
};

export default (state = initialState, action)=>{
    switch(action.type){
        case AUTHENTICATE:
      return {
        userId: action.userId,
        username:action.username,
        firstName: action.firstName,
        age: action.age,
        email: action.email,
        password: action.password,
        loggedIn: action.loggedIn
      };
      case LOGOUT:
        return initialState;
      default:
         return state;
    }
}

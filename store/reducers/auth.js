import {AUTHENTICATE,LOGOUT} from "../actions/auth";
const initialState = {
    userId:null,
    email:null,
    loggedIn:false
};

export default (state = initialState, action)=>{
    switch(action.type){
        case AUTHENTICATE:
      return {
        userId: action.userId,
        email: action.email,
        loggedIn: action.loggedIn
      };
      case LOGOUT:
        return initialState;
      default:
         return state;
    }
}

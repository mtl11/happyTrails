import {TASKS} from "../actions/task";
const initialState = {
    tasks: null
}

export default (state = initialState, action)=>{
    switch(action.type){
        case TASKS:
            return {tasks: action.tasks};
        default:
            return state;
    }
}
export const TASKS = 'TASKS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userTasks = (myTasks) => {
    //console.log(myTasks)
    return { type: TASKS, tasks: myTasks};
};

export const addTask = (userId, userEmail, task, mode, duration, time, icon) =>{
    return async dispatch =>{
        // console.log(task);
        // console.log(userEmail);
        // console.log(userId);
        // console.log(mode);
        fetch('http://localhost:3000/tasks',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {"userId": userId, 
                "userEmail": userEmail,
                "task": task,
                "mode":mode,
                "duration":duration,
                "time": time,
                "icon" :icon})
            })
    }
}

export const getTask = (userId) =>{
    return async dispatch => {
        const myTasks = [];
        const response = await fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((json) => {
           
            for (const item in json) {
                const userInfo = json[item];
                //console.log(userInfo.userid +" : "+userId);
                if (userInfo.userid == userId){
                    myTasks.push(userInfo)
                }
            }
        })
        //console.log(myTasks);
        dispatch(userTasks(myTasks));
        AsyncStorage.setItem("myTasks", JSON.stringify(myTasks));
    }
}

export const deleteTask = (taskId, userId) => {
    return async dispatch =>{
        console.log("task.js");
        fetch('http://localhost:3000/tasks/:taskid',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {"userId": userId, 
                "taskId": taskId})
        })
    }
}
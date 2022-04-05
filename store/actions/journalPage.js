import AsyncStorage from '@react-native-async-storage/async-storage';

export const addPage = (userId, mood, date, dow, journalEntry) =>{
    return async dispatch => {
        fetch('http://localhost:3000/journalPage',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {"userId": userId, 
                "mood": mood,
                "date": date,
                "dow":dow,
                "journalEntry":journalEntry})
        })
    }
}

export const getPages = (userId) =>{
    //console.log(userId);
    return async dispatch =>{
        console.log("User ID: "+userId);
        const myPages = [];
        const response = await fetch('http://localhost:3000/journalPage')
        .then((response) => response.json())
        .then((json) => {
            //console.log(json);
            for (const item in json) {
                const userInfo = json[item];
                //console.log(userInfo.userid +" : "+userId);
                if (userInfo.userid == userId){
                    myPages.push(userInfo);
                }
            }
        });
        console.log(myPages);
        AsyncStorage.setItem("myPages", JSON.stringify(myPages));
    }
}
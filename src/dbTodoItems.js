//DEBUG
import { formatDateToISO, generateRandomFutureDate } from "./dateDisplay.js";
import projectDB from "./dbProjects";
//DEBUG END

import itemTodo from "./itemTodo";
import { storageAvailable } from "./localStorage";

const todoDB = [];
const debugProjectIds = [];
for (let index = 0; index < projectDB.length; index++) {
    const id = projectDB[index].id;
    debugProjectIds.push(id);
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Load DB from localStorage if it exists
if(storageAvailable("localStorage")){
    if("todoDB" in localStorage){
        const localDB = JSON.parse(localStorage.getItem("todoDB"));
        todoDB.length = 0;
        for (let index = 0; index < localDB.length; index++) {
            const todoItem = JSON.parse(localDB[index]);
            todoDB.push(new itemTodo(todoItem.projectId, todoItem.title, todoItem.description, todoItem.dueDate, todoItem.completed, todoItem.id));
        };
    } else{
        //create todo DB with random items for testing purposes
        for (let i = 0; i < 10; i++) {
            todoDB.push(new itemTodo(debugProjectIds[randomIntFromInterval(0, debugProjectIds.length-1)],"Todo No."+i,"To do item No."+i, formatDateToISO(generateRandomFutureDate()), false));
        };

        //store projects to localStorage if available
        const arrayForLocalStorage = [];
        for (let index = 0; index < todoDB.length; index++) {
            const element = JSON.stringify(todoDB[index]);
            arrayForLocalStorage.push(element);
        }
        localStorage.setItem("todoDB", JSON.stringify(arrayForLocalStorage));
    };
};

export default todoDB;

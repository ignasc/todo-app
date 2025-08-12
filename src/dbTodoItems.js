//DEBUG
import { formatDateToISO, generateCustomDateFromNow } from "./dateDisplay.js";
import projectDB from "./dbProjects";
//DEBUG END

import itemTodo from "./itemTodo";
import { storageAvailable } from "./localStorage";

const todoDB = [];
//if DB was not stored in localStorage, it will be made with one default item.
const projectIds = [];
for (let index = 0; index < projectDB.length; index++) {
    const id = projectDB[index].id;
    projectIds.push(id);
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
        todoDB.push(new itemTodo(projectIds[0],"Sample Todo Item No.1","This is a sample todo no.1 item for demonstration purposes with DUE date.", formatDateToISO(generateCustomDateFromNow(1, randomIntFromInterval(1,999))), false));
        todoDB.push(new itemTodo(projectIds[0],"Sample Todo Item No.2","This is a sample todo no.2 item for demonstration purposes with DUE TODAY date.", formatDateToISO(new Date()), false));
        todoDB.push(new itemTodo(projectIds[0],"Sample Todo Item No.3","This is a sample todo no.3 item for demonstration purposes with OVERDUE date.", formatDateToISO(generateCustomDateFromNow(-1, randomIntFromInterval(1,999))), false));

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

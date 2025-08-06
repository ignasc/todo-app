//DEBUG
import { formatDateToISO, generateRandomFutureDate } from "./dateDisplay.js";
import projectDB from "./dbProjects";
//DEBUG END

import itemTodo from "./itemTodo";
import { localStorageAllTodos, localStorageGetItem, localStorageSetItem } from "./localStorage";

const todoDB = [];
const debugProjectIds = [];
for (let index = 0; index < projectDB.length; index++) {
    const id = projectDB[index].id;
    debugProjectIds.push(id);
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const allTodoKeys = localStorageAllTodos();
if(allTodoKeys.length > 0){
    //create todo DB from local storage
    for (let index = 0; index < allTodoKeys.length; index++) {
        const id = allTodoKeys[index];
        const projectItem = localStorageGetItem(id);
        todoDB.push(new itemTodo(projectItem.projectId, projectItem.title, projectItem.description, projectItem.dueDate, projectItem.completed, projectItem.id));

    };
} else{
    //create todo DB with random items for testing purposes
    for (let i = 0; i < 10; i++) {
        todoDB.push(new itemTodo(debugProjectIds[randomIntFromInterval(0, debugProjectIds.length-1)],"Todo No."+i,"To do item No."+i, formatDateToISO(generateRandomFutureDate()), false));
    };

    // add todo items to localStorage
    for (let index = 0; index < todoDB.length; index++) {
        const element = todoDB[index];
        localStorageSetItem(element);
    };
};

export default todoDB;

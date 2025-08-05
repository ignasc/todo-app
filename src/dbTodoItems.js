//DEBUG
import projectDB from "./dbProjects";
//DEBUG END

import itemTodo from "./itemTodo";
import { getAllTodos, storeTodo } from "./localStorage";

const todoDB = [];
const debugProjectIds = [projectDB[0].id, projectDB[1].id, projectDB[2].id] // debug
function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const allTodos = getAllTodos();

//console.log(allTodos);

if(allTodos.length > 0){
    //localStorage has todos stored, restore them

    for (let index = 0; index < allTodos.length; index++) {
        const element = JSON.parse(allTodos[index]);
        //console.log(element)
        todoDB.push(new itemTodo(element.projectId,element.title, element.description, element.dueDate, element.completed, element.id));
    }
} else{
    //generate new todoDB and store it away.
    // Add temporary items for development purposes.
    for (let i = 0; i < 10; i++) {
        const newTodoItem = new itemTodo(debugProjectIds[randomIntFromInterval(0, debugProjectIds.length-1)],"Todo No."+i,"To do item No."+i,new Date(), false);
        todoDB.push(newTodoItem);
        storeTodo(newTodoItem);
    }
};

export default todoDB;

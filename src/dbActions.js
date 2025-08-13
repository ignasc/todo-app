import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects"
import projectList from "./itemProject";
import itemTodo from "./itemTodo";
import { localStorageSaveProjects, localStorageSaveTodos } from "./localStorage";

//main CRUD operations for todo item db
function todoCreateNew(projectId, title, description, dueDate, priority, completed){
    if(projectRetrieve("getAll").length == 0){return};//prevent creation of todo item if no project list available.

    const allTodosForProject = todoRetrieve(projectId, true);
    const lastPriorityNumber = allTodosForProject.length == 0 ? 0 : allTodosForProject[allTodosForProject.length-1].priority;

    const newTodoItem = new itemTodo(projectId,title, description, dueDate, lastPriorityNumber + 1, completed = false);
    todoDB.push(newTodoItem);
    localStorageSaveTodos(todoDB);
};

function todoRetrieve(id, getAll = false){
    //if getAll is true, id is treated as projects id, not todo items id.
    if(getAll){
        const allTodosForProject = todoDB.filter((element)=>{return element.projectId == id;});
        return allTodosForProject;
    };
    const filteredItem = todoDB.filter((element)=>{return element.id == id});
    return filteredItem[0];
};

function todoUpdate(id, updateObject = {}){
    for (let index = 0; index < todoDB.length; index++) {
        const element = todoDB[index];

        if(element.id == id){

            if(element.priority != updateObject.priority){
                updateTodoPriority(element.projectId, element.priority, updateObject.priority);
            };

            todoDB[index].updateObject(updateObject);
            sortTodoDBByPriority();
            localStorageSaveTodos(todoDB);

            break;
        };
    };
};

function todoDelete(id){
    for (let index = 0; index < todoDB.length; index++) {
        const elementId = todoDB[index].id;

        if(elementId == id){
            todoDB.splice(index, 1);
            localStorageSaveTodos(todoDB);
            break;
        };
    };
};

//CRUD operations for projects db
function projectCreateNew(title, description){
    const newProjectItem = new projectList(title, description);
    projectDB.push(newProjectItem);
    localStorageSaveProjects(projectDB);
};

function projectRetrieve(id){
    if(id == "getAll"){
        /*self note: this is reference to original array, spread operator does not work either as keypair values inside array elements are still references to original array values*/
        return projectDB;
    };
    const filteredItem = projectDB.filter((element)=>{return element.id == id});
    return filteredItem[0];
};

function projectUpdate(id, updateObject = {}){
    for (let index = 0; index < projectDB.length; index++) {
        const element = projectDB[index];

        if(element.id == id){

            element.updateObject(updateObject);

            break;
        };
    };
    localStorageSaveProjects(projectDB);
};

function projectDelete(id){
    const allTodosForProject = todoRetrieve(id, true);

    for (let index = 0; index < allTodosForProject.length; index++) {
        const elementId = allTodosForProject[index].id;
        todoDelete(elementId);
    }

    for (let index = 0; index < projectDB.length; index++) {
        const elementId = projectDB[index].id;

        if(elementId == id){
            projectDB.splice(index, 1);
            localStorageSaveProjects(projectDB);
            break;
        };
    };
};

// Custom functions for CRUD operations

function updateTodoPriority(projectId, currentPriority, newPriority){
    /*Finds item that already has newPriority value and assigns it currentPriority, which belonds to another item, whos priority is being updated to newPriority*/

    const allTodosForProject = todoRetrieve(projectId, true);

    for (let index = 0; index < allTodosForProject.length; index++) {
        const element = allTodosForProject[index];
        if(element.priority == newPriority){
            element.setPriority(currentPriority);
            break;
        };
    }
};

function sortTodoDBByPriority(){
    todoDB.sort((elementA, elementB)=>{
        const eleACompare = elementA.projectId + elementA.priority;
        const eleBCompare = elementB.projectId + elementB.priority;
        return eleACompare.localeCompare(eleBCompare);
    });
};

export {
    todoCreateNew, todoRetrieve, todoUpdate, todoDelete,

    projectCreateNew, projectRetrieve, projectUpdate, projectDelete, }

import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects"
import projectList from "./itemProject";
import itemTodo from "./itemTodo";
import { deleteTodo, storeProject, storeTodo } from "./localStorage";

//main CRUD operations for todo item db
function todoCreateNew(projectId, title, description, dueDate, priority, completed){
    const newTodoItem = new itemTodo(projectId,title, description, dueDate, priority = 0, completed = false);
    todoDB.push(newTodoItem);
    storeTodo(newTodoItem);
};

function todoRetrieve(id, getAll = false){
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

            todoDB[index].updateTodoObject(updateObject);
            storeTodo(element);

            break;
        };
    };
};

function todoDelete(id){
    for (let index = 0; index < todoDB.length; index++) {
        const elementId = todoDB[index].id;

        if(elementId == id){
            todoDB.splice(index, 1);
            deleteTodo(id);

            break;
        };
    };
};

//CRUD operations for projects db
function projectCreateNew(title, description){
    const newProjectObject = new projectList(title, description);
    projectDB.push(newProjectObject);
    storeProject(newProjectObject);
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

            projectDB[index].updateProjectObject(updateObject);
            storeProject(projectDB[index]);

            break;
        };
    };
};

function projectDelete(id){
    for (let index = 0; index < projectDB.length; index++) {
        const elementId = projectDB[index].id;

        if(elementId == id){
            projectDB.splice(index, 1);
            break;
        };
    };
};

export {
    todoCreateNew, todoRetrieve, todoUpdate, todoDelete,

    projectCreateNew, projectRetrieve, projectUpdate, projectDelete, }

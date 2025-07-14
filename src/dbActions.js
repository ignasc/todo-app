import todoDB from "./dbTodoItems";
import itemTodo from "./itemTodo";

//CRUD operations for todo item db
function todoCreateNew(newItem){
    todoDB.push(newItem);
};
function todoRetrieve(id){
    const filteredItem = todoDB.filter((element)=>{return element.id == id});
    return filteredItem[0];
};
function todoUpdate(){};
function todoDelete(){};

//CRUD operations for projects db
function projectCreateNew(){};
function projectRetrieve(){};
function projectUpdate(){};
function projectDelete(){};

export {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, projectCreateNew, projectRetrieve, projectUpdate, projectDelete}

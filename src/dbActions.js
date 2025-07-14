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
function todoUpdate(id, updateKey = "N/A", updateValue = "N/A"){
    for (let index = 0; index < todoDB.length; index++) {
        const elementId = todoDB[index].id;

        if(elementId == id){
            switch (updateKey) {
                case "projectid":
                    todoDB[index].setProjectId(updateValue);
                    break;
                case "title":
                    todoDB[index].setTitle(updateValue);
                    break;
                case "description":
                    todoDB[index].setDescription(updateValue);
                    break;
                case "dueDate":
                    todoDB[index].setDueDate(updateValue);
                    break;
                case "priority":
                    todoDB[index].setPriority(updateValue);
                    break;
                case "completed":
                    todoDB[index].setCompleted();
                    break;
                default:
                    console.log("Invalid key to update: " + updateKey)
                    break;
            };
            break;
        };
    };
};
function todoDelete(id){
    for (let index = 0; index < todoDB.length; index++) {
        const elementId = todoDB[index].id;

        if(elementId == id){
            todoDB.splice(index, 1);
            break;
        };
    };
};

//CRUD operations for projects db
function projectCreateNew(){};
function projectRetrieve(){};
function projectUpdate(){};
function projectDelete(){};

export {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, projectCreateNew, projectRetrieve, projectUpdate, projectDelete}

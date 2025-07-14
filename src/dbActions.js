import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects"
import projectList from "./itemProject";
import itemTodo from "./itemTodo";

//main CRUD operations for todo item db
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

//custom CRUD operations for todo item db.
function todoGetAllForProject(projectId){
    const allTodosForProject = todoDB.filter((element)=>{return element.projectId == projectId;});
    return allTodosForProject;
};

//CRUD operations for projects db
function projectCreateNew(title, description){
    projectDB.push(new projectList(title, description));
};
function projectRetrieve(id){
    const filteredItem = projectDB.filter((element)=>{return element.id == id});
    return filteredItem[0];
};
function projectUpdate(id, updateKey = "N/A", updateValue = "N/A"){
    for (let index = 0; index < projectDB.length; index++) {
        const elementId = projectDB[index].id;

        if(elementId == id){
            switch (updateKey) {
                case "title":
                    projectDB[index].setTitle(updateValue);
                    break;
                case "description":
                    projectDB[index].setDescription(updateValue);
                    break;
                default:
                    console.log("Invalid key to update: " + updateKey)
                    break;
            };
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
    todoCreateNew, todoRetrieve, todoUpdate, todoDelete, todoGetAllForProject,

    projectCreateNew, projectRetrieve, projectUpdate, projectDelete
}

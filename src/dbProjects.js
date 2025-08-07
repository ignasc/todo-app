import projectList from "./itemProject";
import { localStorageGetAllProjects, localStorageGetItem, localStorageSetItem, storageAvailable } from "./localStorage";

const projectDB_OLD = [];
const projectDB = [];

//Load DB from localStorage if it exists
if(storageAvailable("localStorage")){
    if("projectDB" in localStorage){
        //console.log("DB already available, loading...")
        const localDB = JSON.parse(localStorage.getItem("projectDB"));
        //console.log(localDB)
        projectDB.length = 0;
        for (let index = 0; index < localDB.length; index++) {
            const projectItem = JSON.parse(localDB[index]);
            projectDB.push(new projectList(projectItem.title,projectItem.description, projectItem.id));
        };
        //console.log("DB loaded:")
        //console.log(projectDB[projectDB.length-1])
    } else{
        //create project DB with random items for testing purposes
        // Add few items to db for testing purposes
        projectDB.push(new projectList("Default List","Default list for all todo's"));
        projectDB.push(new projectList("Custom List 01","List of todos for project 01"));
        projectDB.push(new projectList("Custom List 02","List of todos for project 02"));

        //store projects to localStorage if available
        //console.log("Storing new db:")
        //console.log(newProjectDB)
        const arrayForLocalStorage = [];
        for (let index = 0; index < projectDB.length; index++) {
            const element = JSON.stringify(projectDB[index]);
            //console.log(element)
            arrayForLocalStorage.push(element);
        }
        localStorage.setItem("projectDB", JSON.stringify(arrayForLocalStorage));
    };
};


/*const allProjectKeys = localStorageGetAllProjects();
if(allProjectKeys.length > 0){
    //create project DB from local storage
    for (let index = 0; index < allProjectKeys.length; index++) {
        const id = allProjectKeys[index];
        const projectItem = localStorageGetItem(id);
        projectDB_OLD.push(new projectList(projectItem.title,projectItem.description, projectItem.id));
    };
} else{
    //create project DB with random items for testing purposes
    // Add few items to db for testing purposes
    projectDB_OLD.push(new projectList("Default List","Default list for all todo's"));
    projectDB_OLD.push(new projectList("Custom List 01","List of todos for project 01"));
    projectDB_OLD.push(new projectList("Custom List 02","List of todos for project 02"));

    //store projects to localStorage
    for (let index = 0; index < projectDB_OLD.length; index++) {
        const element = projectDB_OLD[index];
        localStorageSetItem(element);
    }
};*/

//Show details of the first project in the list by default
//projectDB_OLD[0].toggleDetails();
projectDB[0].toggleDetails();


export default projectDB;

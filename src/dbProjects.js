import projectList from "./itemProject";
import { localStorageAllProjects, localStorageGetItem, localStorageSetItem } from "./localStorage";

const projectDB = [];
const allProjectKeys = localStorageAllProjects();
if(allProjectKeys.length > 0){
    //create project DB from local storage
    for (let index = 0; index < allProjectKeys.length; index++) {
        const id = allProjectKeys[index];
        const projectItem = localStorageGetItem(id);
        projectDB.push(new projectList(projectItem.title,projectItem.description, projectItem.id));
    }
} else{
    //create project DB with random items for testing purposes
    // Add few items to db for testing purposes
    projectDB.push(new projectList("Default List","Default list for all todo's"));
    projectDB.push(new projectList("Custom List 01","List of todos for project 01"));
    projectDB.push(new projectList("Custom List 02","List of todos for project 02"));

    //store projects to localStorage
    for (let index = 0; index < projectDB.length; index++) {
        const element = projectDB[index];
        localStorageSetItem(element);
    }
};

//Show details of the first project in the list by default
projectDB[0].toggleDetails();


export default projectDB;

import projectList from "./itemProject";
import { localStorageSetItem } from "./localStorage";

const projectDB = [];

// Add few items to db for testing purposes
projectDB.push(new projectList("Default List","Default list for all todo's"));
projectDB.push(new projectList("Custom List 01","List of todos for project 01"));
projectDB.push(new projectList("Custom List 02","List of todos for project 02"));

//Show details of the first project in the list by default
projectDB[0].toggleDetails();

//store projects to localStorage
for (let index = 0; index < projectDB.length; index++) {
    const element = projectDB[index];
    localStorageSetItem(element);
}

export default projectDB;

import projectList from "./itemProject";
import { getAllProjects, getProject, storeProject } from "./localStorage";

const projectDB = [];
const allProjects = getAllProjects();

if(allProjects.length > 0){
    //localStorage has projects stored, restore them
    console.log("Local storage has " + allProjects.length + " projects");

    for (let index = 0; index < allProjects.length; index++) {
        const element = JSON.parse(allProjects[index]);
        console.log(element)
        projectDB.push(new projectList(element.title, element.description, element.id))
    }
} else{
    //generate new projectDB and store it away.
    // Add few items to db for testing purposes
    projectDB.push(new projectList("Default List","Default list for all todo's"));
    projectDB.push(new projectList("Custom List 01","List of todos for project 01"));
    projectDB.push(new projectList("Custom List 02","List of todos for project 02"));
};


//localStorage.clear();//empty local storage

for (let index = 0; index < projectDB.length; index++) {
    const element = projectDB[index];
    storeProject(element);
}

//Show details of the first project in the list by default
projectDB[0].toggleDetails();

export default projectDB;

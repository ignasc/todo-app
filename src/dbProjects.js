import projectList from "./itemProject";
import { storageAvailable } from "./localStorage";

const projectDB = [];

//Load DB from localStorage if it exists
if (storageAvailable("localStorage")) {
    if ("projectDB" in localStorage) {
        const localDB = JSON.parse(localStorage.getItem("projectDB"));
        projectDB.length = 0;
        for (let index = 0; index < localDB.length; index++) {
            const projectItem = JSON.parse(localDB[index]);
            projectDB.push(
                new projectList(
                    projectItem.title,
                    projectItem.description,
                    projectItem.id
                )
            );
        }
    } else {
        //create project DB with a default project list
        projectDB.push(
            new projectList("Default List", "Default list for all todo's")
        );

        //store projects to localStorage if available
        const arrayForLocalStorage = [];
        for (let index = 0; index < projectDB.length; index++) {
            const element = JSON.stringify(projectDB[index]);
            arrayForLocalStorage.push(element);
        }
        localStorage.setItem("projectDB", JSON.stringify(arrayForLocalStorage));
    }
}

//Show details of the first project in the list by default
if (projectDB.length > 0) {
    projectDB[0].toggleDetails();
}

export default projectDB;

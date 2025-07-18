import { projectGetAll, todoGetAllForProject } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function showProjectDetails(id = projectGetAll()[0].id){
    /*Generate a list of all available todos for a project*/
    divMain.textContent = "";

    const todoList = document.createElement("ul");
    const todoItem = document.createElement("li")
    const items = todoGetAllForProject(id);

    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const newItem = todoItem.cloneNode();
        newItem.textContent = element.title;

        todoList.appendChild(newItem);
    };

    divMain.appendChild(todoList);
};

function showAllProjects(){
    /*Generate a list of all available projects*/
    divSidebar.textContent = "";

    const projectList = document.createElement("ul");
    const projectItem = document.createElement("li")
    const projects = projectGetAll();

    for (let i = 0; i < projects.length; i++) {
        const element = projects[i];
        const newItem = projectItem.cloneNode();
        newItem.textContent = element.title;
        newItem.setAttribute("id", element.id)

        projectList.appendChild(newItem);
    };

    divSidebar.appendChild(projectList);

};

function getProjectDetails(id){
    
};

export {showAllProjects, showProjectDetails, getProjectDetails};

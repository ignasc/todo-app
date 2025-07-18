import { projectGetAll, todoGetAllForProject } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function showMainContent(){
    divMain.textContent = "";

    const todoList = document.createElement("ul");
    const todoItem = document.createElement("li")
    const items = todoGetAllForProject(projectGetAll()[0].id);

    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const newItem = todoItem.cloneNode();
        newItem.textContent = element.title;

        todoList.appendChild(newItem);
    };

    divMain.appendChild(todoList);

    //const topTitle = document.createElement("h1");
    //topTitle.textContent = "Webpack template loaded";

    //divMain.appendChild(topTitle);
};

function showProjectList(){
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

export {showProjectList, showMainContent};

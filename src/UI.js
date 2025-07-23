import { projectGetAll } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function toggleProjectDetails(projectId = "N/A", status = false){
    const allProjectArray = projectGetAll();

    for (let index = 0; index < allProjectArray.length; index++) {
        const element = allProjectArray[index];
        if(projectId == element.id){
            element.toggleDetails();
            break;
        };
    }

    showProjectsMainContent();
};

function showProjectsMainContent(){
    /*Generate a list of all available projects for the main content element*/
    divMain.textContent = "";

    const projectList = document.createElement("ul");

    const allProjectsArray = projectGetAll();

    for (let index = 0; index < allProjectsArray.length; index++) {
        const element = allProjectsArray[index];
        projectList.appendChild(element.getHtmlElement());
    };

    divMain.appendChild(projectList);
};

function showProjectsSideBar(){
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

function updateUI(){
    toggleProjectDetails();
    showProjectsSideBar();
    showProjectsMainContent();
};

export {showProjectsSideBar, showProjectsMainContent, toggleProjectDetails, updateUI};

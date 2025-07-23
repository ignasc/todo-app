import { projectGetAll, projectRetrieve } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function toggleProjectDetails(projectId = "N/A"){
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
    const btnProject = document.createElement("button");
    const projects = projectGetAll();

    for (let i = 0; i < projects.length; i++) {
        const element = projects[i];
        const newItem = projectItem.cloneNode();
        const newButton = btnProject.cloneNode();
        newButton.addEventListener("click", (e)=>{
            projectRetrieve(e.target.id).toggleDetails();
            updateUI();
        });
        newButton.textContent = element.title;
        newButton.setAttribute("id", element.id)
        newItem.setAttribute("data-id", element.id)

        newItem.appendChild(newButton);
        projectList.appendChild(newItem);
    };

    divSidebar.appendChild(projectList);

};

function updateUI(){
    toggleProjectDetails();
    showProjectsSideBar();
    showProjectsMainContent();
};

export {updateUI};

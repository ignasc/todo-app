import { projectGetAll } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function toggleProjectDetails(projectId = "N/A", status = false){
    console.log("Expand project to be implemented")
    const allProjectArray = projectGetAll();

    for (let index = 0; index < allProjectArray.length; index++) {
        const element = allProjectArray[index];
        if(projectId == element.id){
            if(status == false){
                element.setCollapsed();
            } else {
                element.setExpanded();
            };
            continue;
        };
    }

    showProjectsMainContent();
};

function showProjectsMainContent(id = projectGetAll()[0].id){
    /*Generate a list of all available projects for the main content element*/
    divMain.textContent = "";

    const projectList = document.createElement("ul");

    const allProjectsArray = projectGetAll();

    //add the rest as collapsed projects to the list
    for (let index = 0; index < allProjectsArray.length; index++) {
        const element = allProjectsArray[index];
        if(element.cardExpanded){
        projectList.appendChild(element.getHtmlExpanded());
        } else{
            projectList.appendChild(element.getHtmlCollapsed());
        };
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

export {showProjectsSideBar, showProjectsMainContent, toggleProjectDetails};

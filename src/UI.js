import { projectGetAll, projectRetrieve } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

const btnGeneric = document.createElement("button");
const divGeneric = document.createElement("div");

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

/*Below code is in the process of refactoring the above code. The purpose is to remove all UI related functions from classes and move them to separate UI module (here)*/

function showNavBar(){
    const divNavbar = document.querySelector("#main-navbar");
    divNavbar.textContent = "";

    const btn_NewProject = btnGeneric.cloneNode();
    btn_NewProject.textContent = "Create new todo list";

    const btn_NewTodo = btnGeneric.cloneNode();
    btn_NewTodo.textContent = "Create new todo item";

    divNavbar.appendChild(btn_NewProject);
    divNavbar.appendChild(btn_NewTodo);
};

function showSideBar(){
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
function showMainContent(){
    const mainContentDiv = document.querySelector("#content-main");
    /*Structure:
    project card
        heading
            button + title
            nav buttons
            description
        body
            ul todo
                li todo
                li todo
    */
    divMain.textContent = "";
    const projectList = document.createElement("ul");
    const listItem = document.createElement("li");

    const projectArray = projectRetrieve("getAll");
    for (let index = 0; index < projectArray.length; index++) {
        const element = projectArray[index];
        const newLiItem = listItem.cloneNode();
        newLiItem.setAttribute("class", "project-card");

        //HEADING
        const projectCardHeader = document.createElement("div");
        projectCardHeader.setAttribute("class", "project-card-heading");

        const btnExpand = btnGeneric.cloneNode();
        btnExpand.textContent = "Expand";

        const projectTitle = document.createElement("h1");
        projectTitle.textContent = element.title;

        const projectDescription = document.createElement("p");
        projectDescription.setAttribute("class", "project-description-p");
        projectDescription.textContent = element.description;


        projectCardHeader.appendChild(btnExpand);
        projectCardHeader.appendChild(projectTitle);
        projectCardHeader.appendChild(projectDescription);

        newLiItem.appendChild(projectCardHeader);

        //BODY

        const todoList = document.createElement("ul");
        todoList.setAttribute("class", "todo-list-card");

        newLiItem.appendChild(todoList);

        //Append full list to main content element
        projectList.appendChild(newLiItem);
    };

    mainContentDiv.appendChild(projectList);
};

function updateUI(){
    toggleProjectDetails();
    showProjectsSideBar();
    showProjectsMainContent();

    showNavBar();
    showSideBar();
    showMainContent();
};
export {updateUI};

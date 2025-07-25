import { projectGetAll, projectRetrieve, todoDelete, todoGetAllForProject, todoRetrieve } from "./dbActions";

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
    divMain.textContent = "";

    const fullListOfProjects = returnProjectsListHtml();

    mainContentDiv.appendChild(fullListOfProjects);
};

function returnProjectsListHtml(){
    const projectList = document.createElement("ul");

    const projectArray = projectRetrieve("getAll");
    for (let index = 0; index < projectArray.length; index++) {
        const element = projectArray[index];
        const newLiItem = returnProjectItemHtml(element);

        projectList.appendChild(newLiItem);
    };

    return projectList;
};

function returnProjectItemHtml(object){
    const newLiItem = document.createElement("li");
    newLiItem.setAttribute("class", "project-card");

    const projectCardHeader = document.createElement("div");
    projectCardHeader.setAttribute("class", "project-card-heading");

    const btnExpand = btnGeneric.cloneNode();
    btnExpand.textContent = "Expand";

    const projectTitle = document.createElement("h1");
    projectTitle.setAttribute("class", "project-title");
    projectTitle.textContent = object.title;

    const projectDescription = document.createElement("p");
    projectDescription.setAttribute("class", "project-description-p");
    projectDescription.textContent = object.description;

    const projectNav = document.createElement("div");
    projectNav.setAttribute("class", "project-nav");
    const btnEdit = btnGeneric.cloneNode();
    btnEdit.textContent = "Edit";
    const btnRemove = btnGeneric.cloneNode();
    btnRemove.textContent = "Remove";

    projectNav.appendChild(btnEdit);
    projectNav.appendChild(btnRemove);

    projectCardHeader.appendChild(btnExpand);
    projectCardHeader.appendChild(projectTitle);
    projectCardHeader.appendChild(projectDescription);
    projectCardHeader.appendChild(projectNav);

    newLiItem.appendChild(projectCardHeader);
    newLiItem.appendChild(returnTodoList(object.id));

    return newLiItem;
};

function returnTodoList(projectId){
    const allTodoItems = todoGetAllForProject(projectId);
    const todoList = document.createElement("ul");
    todoList.setAttribute("class", "todo-list-card");

    for (let index = 0; index < allTodoItems.length; index++) {
        const element = allTodoItems[index];
        todoList.appendChild(returnTodoItem(element));
    }

    return todoList;
};

function returnTodoItem(object){
    const todoItem = document.createElement("li");
    todoItem.setAttribute("class", "todo-card");

    const todoTitle = document.createElement("p");
    todoTitle.setAttribute("class", "todo-title");
    todoTitle.textContent = object.title;

    const todoDescription = document.createElement("p");
    todoDescription.setAttribute("class", "todo-description");
    todoDescription.textContent = object.description;

    const todoNav = document.createElement("div");
    todoNav.setAttribute("class", "todo-nav");

    const btnTodoComplete = btnGeneric.cloneNode();
    if(object.completed){
        btnTodoComplete.textContent = "Mark Incomplete";
    }else{
        btnTodoComplete.textContent = "Mark Completed";
    };
    btnTodoComplete.setAttribute("data-id", object.id);
    btnTodoComplete.addEventListener("click", (e)=>{
        object.setCompleted();
        updateUI();
    });

    const btnTodoEdit = btnGeneric.cloneNode();
    btnTodoEdit.textContent = "Edit";

    const btnTodoRemove = btnGeneric.cloneNode();
    btnTodoRemove.textContent = "Remove";
    btnTodoRemove.addEventListener("click", ()=>{
        todoDelete(object.id);
        updateUI();
    });

    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoDescription);

    todoNav.appendChild(btnTodoComplete);
    todoNav.appendChild(btnTodoEdit);
    todoNav.appendChild(btnTodoRemove);

    todoItem.appendChild(todoNav);

    return todoItem;
};

function updateUI(){
    showNavBar();
    showSideBar();
    showMainContent();
};
export {updateUI};

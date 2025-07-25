import { projectDelete, projectGetAll, projectRetrieve, projectUpdate, todoDelete, todoGetAllForProject, todoRetrieve, todoUpdate } from "./dbActions";

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
    /*Generate a list of projects for sidebar*/
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
    /*Generate a list of projects/todo items for main page content*/
    const mainContentDiv = document.querySelector("#content-main");
    divMain.textContent = "";

    const fullListOfProjects = returnProjectsListHtml();

    mainContentDiv.appendChild(fullListOfProjects);
};

function returnProjectsListHtml(){
    /*Generate a project list as "ul" element*/
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
    /*Generate project item as "li" element*/
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
    if(object.editActive){
        btnEdit.textContent = "Cancel Edit";
    }else{
        btnEdit.textContent = "Edit";
    };
    btnEdit.addEventListener("click", ()=>{
        object.setEditMode();
        updateUI();
    });

    const btnRemove = btnGeneric.cloneNode();
    btnRemove.textContent = "Remove";
    btnRemove.addEventListener("click", ()=>{
        projectDelete(object.id);
        updateUI();
    });

    projectNav.appendChild(btnEdit);
    projectNav.appendChild(btnRemove);

    projectCardHeader.appendChild(btnExpand);
    projectCardHeader.appendChild(projectTitle);
    projectCardHeader.appendChild(projectDescription);
    projectCardHeader.appendChild(projectNav);

    newLiItem.appendChild(projectCardHeader);

    if(object.editActive){
        newLiItem.appendChild(returnProjectEditFormHtml(object));
    };

    newLiItem.appendChild(returnTodoList(object.id));

    return newLiItem;
};

function returnTodoList(projectId){
    /*Generate todo item list as "ul" element*/
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
    /*Generate a todo item as "li" element*/
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
    if(object.editActive){
        btnTodoEdit.textContent = "Cancel Edit";
    }else{
        btnTodoEdit.textContent = "Edit";
    };
    btnTodoEdit.addEventListener("click", ()=>{
        object.setEditMode();
        updateUI();
    });

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

    if(object.editActive){
        todoItem.appendChild(returnTodoEditFormHtml(object));
    };

    return todoItem;
};

function returnProjectEditFormHtml(object){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "project-form");
        formCard.setAttribute("id", object.id);

        const genericInput = document.createElement("input");
        genericInput.setAttribute("type", "text");
        const genericLabel = document.createElement("label");

        //title, description, date inputs
        const inputTitle = genericInput.cloneNode()
        inputTitle.setAttribute("id", "pname");
        inputTitle.setAttribute("name", "title");
        const labelTitle = genericLabel.cloneNode();
        labelTitle.setAttribute("for", "pname");
        labelTitle.textContent = "Project Name";

        const inputDescription = genericInput.cloneNode();
        inputDescription.setAttribute("id", "pdescription");
        inputDescription.setAttribute("name", "description");
        const labelDescription = genericLabel.cloneNode();
        labelDescription.setAttribute("for", "pdescription");
        labelDescription.textContent = "Description";

        const btn_submit = genericInput.cloneNode();
        btn_submit.setAttribute("type", "submit");
        btn_submit.setAttribute("value", "Save");
        btn_submit.setAttribute("id", "form-project-submit-btn");

        btn_submit.addEventListener("click", (e)=>{
            e.preventDefault()
            const newFormData = new FormData(formCard);
            const newProjectItem = {};
            for(const [key, value] of newFormData){
                newProjectItem[key] = value;
            };
            projectUpdate(object.id, newProjectItem);
            object.setEditMode();
            updateUI();
        });

        //add all elements to form
        formCard.appendChild(labelTitle);
        formCard.appendChild(inputTitle);
        formCard.appendChild(labelDescription);
        formCard.appendChild(inputDescription);
        formCard.appendChild(btn_submit);

        return formCard;
};

function returnTodoEditFormHtml(object){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "todo-form");
        formCard.setAttribute("id", object.id);

        const genericInput = document.createElement("input");
        genericInput.setAttribute("type", "text");
        const genericLabel = document.createElement("label");

        //title, description, date inputs
        const inputTitle = genericInput.cloneNode()
        inputTitle.setAttribute("id", "iname");
        inputTitle.setAttribute("name", "title");
        const labelTitle = genericLabel.cloneNode();
        labelTitle.setAttribute("for", "iname");
        labelTitle.textContent = "Task Name";

        const inputDescription = genericInput.cloneNode();
        inputDescription.setAttribute("id", "idescription");
        inputDescription.setAttribute("name", "description");
        const labelDescription = genericLabel.cloneNode();
        labelDescription.setAttribute("for", "idescription");
        labelDescription.textContent = "Description";

        const inputDueDate = genericInput.cloneNode();
        inputDueDate.setAttribute("id", "iduedate");
        inputDueDate.setAttribute("name", "dueDate");
        inputDueDate.setAttribute("type", "date")
        const labelDueDate = genericLabel.cloneNode();
        labelDueDate.setAttribute("for", "idescription");
        labelDueDate.textContent = "Due Date";

        const btn_submit = genericInput.cloneNode();
        btn_submit.setAttribute("type", "submit");
        btn_submit.setAttribute("value", "Save");
        btn_submit.setAttribute("id", "form-todo-submit-btn");

        btn_submit.addEventListener("click", (e)=>{
            e.preventDefault()
            const newFormData = new FormData(formCard);
            const newTodoItem = {};
            for(const [key, value] of newFormData){
                newTodoItem[key] = value;
            };
            todoUpdate(object.id, newTodoItem);
            object.setEditMode();
            updateUI();
        });

        //add all elements to form
        formCard.appendChild(labelTitle);
        formCard.appendChild(inputTitle);
        formCard.appendChild(labelDescription);
        formCard.appendChild(inputDescription);
        formCard.appendChild(labelDueDate);
        formCard.appendChild(inputDueDate);
        formCard.appendChild(btn_submit);

        return formCard;
};

function updateUI(){
    showNavBar();
    showSideBar();
    showMainContent();
};
export {updateUI};

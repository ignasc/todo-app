import { projectDelete, projectRetrieve, projectUpdate, todoRetrieve, todoDelete, todoUpdate, projectCreateNew, todoCreateNew } from "./dbActions";

import imgCheckmarkComplete from "./img/checkbox-marked-outline.svg";
import imgCheckmarkIncomplete from "./img/checkbox-blank-outline.svg";
import imgEdit from "./img/pencil-outline.svg";
import imgDelete from "./img/delete-outline.svg";
import { localStorageSetItem } from "./localStorage";

import { getDate } from "./dateDisplay.js";

const btnGeneric = document.createElement("button");

function showNavBar(){
    /*Generate a list of projects for sidebar*/
    const divNavbar = document.querySelector("#main-navbar");
    divNavbar.textContent = "";

    const navbarButtons = document.createElement("div");
    navbarButtons.setAttribute("id", "navbar-buttons");

    const navbarForms = document.createElement("div");
    navbarForms.setAttribute("id", "new-forms");

    const btn_NewProject = document.createElement("button");
    btn_NewProject.textContent = "Create new todo list";
    btn_NewProject.addEventListener("click", ()=>{
        document.querySelector("#form-new-project").style.display = "flex";
    });

    const btn_NewTodo = document.createElement("button");
    btn_NewTodo.textContent = "Create new todo item";
    btn_NewTodo.addEventListener("click", ()=>{
        document.querySelector("#form-new-todo").style.display = "flex";
    });

    navbarButtons.appendChild(btn_NewProject);
    navbarButtons.appendChild(btn_NewTodo);
    divNavbar.appendChild(navbarButtons);
    navbarForms.appendChild(returnNewProjectForm());
    navbarForms.appendChild(returnNewTodoForm());
    divNavbar.appendChild(navbarForms);
};

function showSideBar(){
    /*Generate a list of all available projects*/
    const divSidebar = document.querySelector("#content-sidebar");
    divSidebar.textContent = "";

    const projectList = document.createElement("ul");
    const projectItem = document.createElement("li")
    const btnProject = document.createElement("button");
    const projects = projectRetrieve("getAll");

    for (let i = 0; i < projects.length; i++) {
        const element = projects[i];
        const newItem = projectItem.cloneNode();
        const newButton = btnProject.cloneNode();
        newButton.addEventListener("click", (e)=>{
            e.preventDefault();
            projectRetrieve(e.target.getAttribute("data-id")).toggleDetails();
            const todoList = document.querySelector("#todo-list-" + element.id);
            switch (todoList.style.display) {
                case "none":
                    todoList.style.display = "flex";
                    document.querySelector("#btn-exp-" + element.id).textContent = "Collapse";
                    element.toggleDetails(true);
                    break;
                default:
                    todoList.style.display = "none";
                    document.querySelector("#btn-exp-" + element.id).textContent = "Expand";
                    element.toggleDetails(false);
                    break;
            }
        });
        newButton.textContent = element.title;
        newButton.setAttribute("data-id", element.id)

        newItem.appendChild(newButton);
        projectList.appendChild(newItem);
    };

    divSidebar.appendChild(projectList);
};
function showMainContent(){
    /*Generate a list of projects/todo items for main page content*/
    const mainContentDiv = document.querySelector("#content-main");
    const divMain = document.querySelector("#content-main");
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
    newLiItem.setAttribute("id", object.id);

    const projectCardHeader = document.createElement("div");
    projectCardHeader.setAttribute("class", "project-card-heading");

    const btnExpand = document.createElement("button");
    btnExpand.setAttribute("id","btn-exp-" + object.id)
    if(object.cardExpanded){
        btnExpand.textContent = "Collapse";
    }else{
        btnExpand.textContent = "Expand";
    };
    btnExpand.addEventListener("click", (e)=>{
        e.preventDefault();
        const todoList = document.querySelector("#todo-list-" + object.id);
        switch (todoList.style.display) {
            case "none":
                e.target.textContent = "Collapse";
                todoList.style.display = "flex";
                object.toggleDetails(true);
                break;
            default:
                e.target.textContent = "Expand";
                todoList.style.display = "none";
                object.toggleDetails(false);
                break;
        }
    });

    const projectTitle = document.createElement("h1");
    projectTitle.setAttribute("class", "project-title");
    projectTitle.textContent = object.title;

    const projectDescription = document.createElement("p");
    projectDescription.setAttribute("class", "project-description-p");
    projectDescription.textContent = object.description;

    const projectNav = document.createElement("div");
    projectNav.setAttribute("class", "project-nav");

    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btn-edit-" + object.id)
    if(object.editActive){
        btnEdit.textContent = "Cancel Edit";
    }else{
        btnEdit.textContent = "Edit";
    };
    btnEdit.addEventListener("click", (e)=>{
        e.preventDefault();
        const editForm = document.querySelector("#edit-" + object.id);
        switch (editForm.style.display) {
            case "none":
                e.target.textContent = "Cancel Edit";
                editForm.style.display = "flex";
                break;
            default:
                e.target.textContent = "Edit";
                editForm.style.display = "none";
                break;
        }
    });

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.addEventListener("click", (e)=>{
        e.preventDefault();
        projectDelete(object.id);
        showSideBar();
        newLiItem.remove();
    });

    projectNav.appendChild(btnEdit);
    projectNav.appendChild(btnRemove);

    projectCardHeader.appendChild(btnExpand);
    projectCardHeader.appendChild(projectTitle);
    projectCardHeader.appendChild(projectDescription);
    projectCardHeader.appendChild(projectNav);

    newLiItem.appendChild(projectCardHeader);
    newLiItem.appendChild(returnProjectEditFormHtml(object));
    newLiItem.appendChild(returnTodoList(object.id));

    return newLiItem;
};

function returnTodoList(projectId){
    /*Generate todo item list as "ul" element*/
    const allTodoItems = todoRetrieve(projectId, true);
    const todoList = document.createElement("ul");
    todoList.setAttribute("class", "todo-list-card");
    todoList.setAttribute("id", "todo-list-" + projectId);
    if(projectRetrieve(projectId).cardExpanded){
        todoList.style.display = "flex";
    }else{
        todoList.style.display = "none";
    };

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

    const todoDueDate = document.createElement("p");
    //todoDueDate.textContent = object.dueDate;
    todoDueDate.textContent = getDate();

    const iconCompleted = new Image();
    iconCompleted.src = imgCheckmarkComplete;
    const iconIncomplete = new Image();
    iconIncomplete.src = imgCheckmarkIncomplete;
    const iconEdit = new Image();
    iconEdit.src = imgEdit;
    const iconDelete = new Image();
    iconDelete.src = imgDelete;

    const todoDescription = document.createElement("p");
    todoDescription.setAttribute("class", "todo-description");
    todoDescription.textContent = object.description;

    const btnTodoComplete = document.createElement("button");

    if(object.completed){
        btnTodoComplete.textContent = "";
        btnTodoComplete.appendChild(iconCompleted);
        iconCompleted.setAttribute("class", "btn-completed");
    }else{
        btnTodoComplete.textContent = "";
        btnTodoComplete.appendChild(iconIncomplete);
        iconIncomplete.setAttribute("class", "btn-incomplete");
    };
    btnTodoComplete.setAttribute("data-id", object.id);
    btnTodoComplete.addEventListener("click", (e)=>{
        e.preventDefault();
        object.setCompleted();
        if(object.completed){
            btnTodoComplete.textContent = "";
            btnTodoComplete.appendChild(iconCompleted);
            iconCompleted.setAttribute("class", "btn-completed");
        }else{
            btnTodoComplete.textContent = "";
            btnTodoComplete.appendChild(iconIncomplete);
            iconIncomplete.setAttribute("class", "btn-incomplete");
        };
        localStorageSetItem(object);
    });

    const btnTodoEdit = document.createElement("button");
    btnTodoEdit.appendChild(iconEdit);
    if(object.editActive){
        //btnTodoEdit.textContent = "Cancel Edit";
        iconEdit.setAttribute("class", "btn-edit-active");
    }else{
        //btnTodoEdit.textContent = "Edit";
        //btnTodoEdit.appendChild(iconEdit);
        iconEdit.setAttribute("class", "btn-edit-inactive");
    };
    btnTodoEdit.addEventListener("click", (e)=>{
        e.preventDefault();
        const todoEditForm = document.querySelector("#edit-" + object.id);
        object.setEditMode();
        switch (todoEditForm.style.display) {
            case "none":
                todoEditForm.style.display = "flex";
                //e.target.textContent = "Cancel Edit";
                //btnTodoEdit.appendChild(iconEdit);
                iconEdit.setAttribute("class", "btn-edit-active");
                object.setEditMode(true);
                break;
            default:
                todoEditForm.style.display = "none";
                //e.target.textContent = "Edit";
                //btnTodoEdit.appendChild(iconEdit);
                iconEdit.setAttribute("class", "btn-edit-inactive");
                object.setEditMode(false);
                break;
        }
    });

    const btnTodoRemove = document.createElement("button");
    //btnTodoRemove.textContent = "Remove";
    btnTodoRemove.appendChild(iconDelete);
    iconDelete.setAttribute("class", "btn-remove");
    btnTodoRemove.addEventListener("click", (e)=>{
        e.preventDefault();
        todoDelete(object.id);
        todoItem.remove();
    });

    const todoHeader = document.createElement("div");
    todoHeader.setAttribute("id","todo-card-header");
    todoHeader.appendChild(todoTitle);
    todoHeader.appendChild(todoDueDate);
    todoHeader.appendChild(todoDescription);

    const todoNav = document.createElement("div");
    todoNav.setAttribute("class", "todo-nav");
    todoNav.appendChild(btnTodoComplete);
    todoNav.appendChild(btnTodoEdit);
    todoNav.appendChild(btnTodoRemove);

    todoItem.appendChild(todoHeader);
    todoItem.appendChild(todoNav);
    todoItem.appendChild(returnTodoEditFormHtml(object));

    return todoItem;
};

function returnProjectEditFormHtml(object){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "project-form");
        formCard.setAttribute("id", "edit-" + object.id);
        formCard.style.display = "none";

        const genericInput = document.createElement("input");
        genericInput.setAttribute("type", "text");
        const genericLabel = document.createElement("label");
        const divWrapper = document.createElement("div");

        //title, description
        const inputTitle = genericInput.cloneNode()
        inputTitle.setAttribute("id", "pname");
        inputTitle.setAttribute("name", "title");
        inputTitle.setAttribute("value", object.title);
        const labelTitle = genericLabel.cloneNode();
        labelTitle.setAttribute("for", "pname");
        labelTitle.textContent = "Project Name";

        const inputDescription = genericInput.cloneNode();
        inputDescription.setAttribute("id", "pdescription");
        inputDescription.setAttribute("name", "description");
        inputDescription.setAttribute("value", object.description);
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
            document.querySelector("#edit-" + object.id).style.display = "none";
            //document.querySelector("#btn-edit-" + object.id).textContent = "Edit";
            updateUI();
        });

        //add all elements to form
        const formDivTitle = divWrapper.cloneNode();
        formDivTitle.setAttribute("id", "form-div-project-title");
        formDivTitle.appendChild(labelTitle);
        formDivTitle.appendChild(inputTitle);
        formCard.appendChild(formDivTitle);

        const formDivDesc = divWrapper.cloneNode();
        formDivDesc.setAttribute("id", "form-div-project-description");
        formDivDesc.appendChild(labelDescription);
        formDivDesc.appendChild(inputDescription);
        formCard.appendChild(formDivDesc);

        formCard.appendChild(btn_submit);

        return formCard;
};

function returnTodoEditFormHtml(object){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "todo-form");
        formCard.setAttribute("id", "edit-" + object.id);
        formCard.style.display = "none";

        const genericInput = document.createElement("input");
        genericInput.setAttribute("type", "text");
        const genericLabel = document.createElement("label");
        const divWrapper = document.createElement("div");

        //title, description, date inputs
        const inputTitle = genericInput.cloneNode()
        inputTitle.setAttribute("id", "iname");
        inputTitle.setAttribute("name", "title");
        inputTitle.setAttribute("value", object.title);
        const labelTitle = genericLabel.cloneNode();
        labelTitle.setAttribute("for", "iname");
        labelTitle.textContent = "Task Name";

        const inputDescription = genericInput.cloneNode();
        inputDescription.setAttribute("id", "idescription");
        inputDescription.setAttribute("name", "description");
        inputDescription.setAttribute("value", object.description);
        const labelDescription = genericLabel.cloneNode();
        labelDescription.setAttribute("for", "idescription");
        labelDescription.textContent = "Description";

        const inputDueDate = genericInput.cloneNode();
        inputDueDate.setAttribute("id", "iduedate");
        inputDueDate.setAttribute("name", "dueDate");
        inputDueDate.setAttribute("type", "date");
        const labelDueDate = genericLabel.cloneNode();
        labelDueDate.setAttribute("for", "idescription");
        labelDueDate.textContent = "Due Date";

        const inputAssignToProject = document.createElement("select");
        inputAssignToProject.setAttribute("name", "projectId");
        inputAssignToProject.setAttribute("id", "project-id-list");
        const labelAssignToProject = genericLabel.cloneNode();
        labelAssignToProject.setAttribute("for", "project-id-list");
        labelAssignToProject.textContent = "Select project:"
        const allProjects = projectRetrieve("getAll");
        for (let index = 0; index < allProjects.length; index++) {
            const element = allProjects[index];
            const newListOption = document.createElement("option");
            newListOption.setAttribute("value", element.id);
            newListOption.textContent = element.title;
            if(object.projectId == element.id){
                newListOption.defaultSelected = true;
            };
            inputAssignToProject.appendChild(newListOption);
        }

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
            updateUI();
        });

        //add all elements to form
        const formDivTitle = divWrapper.cloneNode();
        formDivTitle.setAttribute("id", "form-div-todo-title");
        formDivTitle.appendChild(labelTitle);
        formDivTitle.appendChild(inputTitle);
        formCard.appendChild(formDivTitle);

        const formDivDesc = divWrapper.cloneNode();
        formDivDesc.setAttribute("id", "form-div-todo-description");
        formDivDesc.appendChild(labelDescription);
        formDivDesc.appendChild(inputDescription);
        formCard.appendChild(formDivDesc);

        const formDivDueDate = divWrapper.cloneNode();
        formDivDueDate.setAttribute("id", "form-div-todo-duedate");
        formDivDueDate.appendChild(labelDueDate);
        formDivDueDate.appendChild(inputDueDate);
        formCard.appendChild(formDivDueDate);

        const formDivAssignProject = divWrapper.cloneNode();
        formDivAssignProject.setAttribute("id", "form-div-todo-assignproject");
        formDivAssignProject.appendChild(labelAssignToProject);
        formDivAssignProject.appendChild(inputAssignToProject);
        formCard.appendChild(formDivAssignProject);

        formCard.appendChild(btn_submit);

        return formCard;
};

function returnNewProjectForm(){
    const newProjectFormId = "form-new-project";
    const formCard = document.createElement("form")
    formCard.setAttribute("class", "project-form");
    formCard.setAttribute("id", newProjectFormId);
    formCard.style.display = "none";

    const genericInput = document.createElement("input");
    genericInput.setAttribute("type", "text");
    const genericLabel = document.createElement("label");
    const divWrapper = document.createElement("div");

    //title, description
    const inputTitle = genericInput.cloneNode()
    inputTitle.setAttribute("id", "pname");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("value", "New Todo List");
    const labelTitle = genericLabel.cloneNode();
    labelTitle.setAttribute("for", "pname");
    labelTitle.textContent = "Project Name";

    const inputDescription = genericInput.cloneNode();
    inputDescription.setAttribute("id", "pdescription");
    inputDescription.setAttribute("name", "description");
    inputDescription.setAttribute("value", "New Todo List Description");
    const labelDescription = genericLabel.cloneNode();
    labelDescription.setAttribute("for", "pdescription");
    labelDescription.textContent = "Description";

    const btn_submit = genericInput.cloneNode();
    btn_submit.setAttribute("type", "submit");
    btn_submit.setAttribute("value", "Save");
    btn_submit.setAttribute("id", "form-new-project-submit-btn");

    btn_submit.addEventListener("click", (e)=>{
        e.preventDefault()
        const newFormData = new FormData(formCard);
        const newProjectItem = {};
        for(const [key, value] of newFormData){
            newProjectItem[key] = value;
        };
        projectCreateNew(newProjectItem.title, newProjectItem.description);
        updateUI();
    });

    const btn_cancel = document.createElement("button");
    btn_cancel.textContent = "Cancel";
    btn_cancel.addEventListener("click", (e)=>{
        e.preventDefault();
        document.querySelector("#" + newProjectFormId).style.display = "none";
    });

    //add all elements to form
    const formDivTitle = divWrapper.cloneNode();
    formDivTitle.setAttribute("id", "form-new-project-title");
    formDivTitle.appendChild(labelTitle);
    formDivTitle.appendChild(inputTitle);
    const formDivDesc = divWrapper.cloneNode();
    formDivDesc.setAttribute("id", "form-new-project-desc");
    formDivDesc.appendChild(labelDescription);
    formDivDesc.appendChild(inputDescription);
    const formDivBtn = divWrapper.cloneNode();
    formDivBtn.setAttribute("id", "form-new-project-btn");
    formDivBtn.appendChild(btn_submit);
    formDivBtn.appendChild(btn_cancel);
    formCard.appendChild(formDivTitle);
    formCard.appendChild(formDivDesc);
    formCard.appendChild(formDivBtn);

    return formCard;
};
function returnNewTodoForm(){
    const newTodoFormId = "form-new-todo";
    const formCard = document.createElement("form")
    formCard.setAttribute("class", "todo-form");
    formCard.setAttribute("id", newTodoFormId);
    formCard.style.display = "none";

    const genericInput = document.createElement("input");
    genericInput.setAttribute("type", "text");
    const genericLabel = document.createElement("label");
    const divWrapper = document.createElement("div");

    //title, description, date inputs
    const inputTitle = genericInput.cloneNode()
    inputTitle.setAttribute("id", "iname");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("value", "New Todo");
    const labelTitle = genericLabel.cloneNode();
    labelTitle.setAttribute("for", "iname");
    labelTitle.textContent = "Task Name";

    const inputDescription = genericInput.cloneNode();
    inputDescription.setAttribute("id", "idescription");
    inputDescription.setAttribute("name", "description");
    inputDescription.setAttribute("value", "New Todo Description");
    const labelDescription = genericLabel.cloneNode();
    labelDescription.setAttribute("for", "idescription");
    labelDescription.textContent = "Description";

    const inputDueDate = genericInput.cloneNode();
    inputDueDate.setAttribute("id", "iduedate");
    inputDueDate.setAttribute("name", "dueDate");
    inputDueDate.setAttribute("type", "date");
    const labelDueDate = genericLabel.cloneNode();
    labelDueDate.setAttribute("for", "idescription");
    labelDueDate.textContent = "Due Date";

    const inputAssignToProject = document.createElement("select");
    inputAssignToProject.setAttribute("name", "projectId");
    inputAssignToProject.setAttribute("id", "project-id-list");
    const labelAssignToProject = genericLabel.cloneNode();
    labelAssignToProject.setAttribute("for", "project-id-list");
    labelAssignToProject.textContent = "Select project:"
    const allProjects = projectRetrieve("getAll");
    for (let index = 0; index < allProjects.length; index++) {
        const element = allProjects[index];
        const newListOption = document.createElement("option");
        newListOption.setAttribute("value", element.id);
        newListOption.textContent = element.title;
        if(index == 0){
            newListOption.defaultSelected = true;
        };
        inputAssignToProject.appendChild(newListOption);
    }

    const btn_submit = genericInput.cloneNode();
    btn_submit.setAttribute("type", "submit");
    btn_submit.setAttribute("value", "Save");
    btn_submit.setAttribute("id", "form-new-todo-submit-btn");

    btn_submit.addEventListener("click", (e)=>{
        e.preventDefault()
        const newFormData = new FormData(formCard);
        const newTodoItem = {};
        for(const [key, value] of newFormData){
            newTodoItem[key] = value;
        };
        todoCreateNew(newTodoItem.projectId, newTodoItem.title, newTodoItem.description, newTodoItem.dueDate, newTodoItem.priority = 0, newTodoItem.completed = false);
        updateUI();
    });

    const btn_cancel = document.createElement("button");
    btn_cancel.textContent = "Cancel";
    btn_cancel.addEventListener("click", (e)=>{
        e.preventDefault();
        document.querySelector("#" + newTodoFormId).style.display = "none";
    });

    //add all elements to form
    const formDivTitle = divWrapper.cloneNode();
    formDivTitle.setAttribute("id", "form-new-todo-title");
    formDivTitle.appendChild(labelTitle);
    formDivTitle.appendChild(inputTitle);
    const formDivDesc = divWrapper.cloneNode();
    formDivDesc.setAttribute("id", "form-new-todo-desc");
    formDivDesc.appendChild(labelDescription);
    formDivDesc.appendChild(inputDescription);
    const formDivDueDate = divWrapper.cloneNode();
    formDivDueDate.setAttribute("id", "form-new-todo-duedate");
    formDivDueDate.appendChild(labelDueDate);
    formDivDueDate.appendChild(inputDueDate);
    const formDivProjectSelect = divWrapper.cloneNode();
    formDivProjectSelect.setAttribute("id", "form-new-todo-projectselect");
    formDivProjectSelect.appendChild(labelAssignToProject);
    formDivProjectSelect.appendChild(inputAssignToProject);
    const formDivBtn = divWrapper.cloneNode();
    formDivBtn.setAttribute("id", "form-new-todo-btn");
    formDivBtn.appendChild(btn_submit);
    formDivBtn.appendChild(btn_cancel);
    formCard.appendChild(formDivTitle);
    formCard.appendChild(formDivDesc);
    formCard.appendChild(formDivDueDate);
    formCard.appendChild(formDivProjectSelect);
    formCard.appendChild(formDivBtn);

    return formCard;
};

function updateUI(){
    showNavBar();
    showSideBar();
    showMainContent();
};
export {updateUI};

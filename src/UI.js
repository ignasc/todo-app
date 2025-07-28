import { projectDelete, projectRetrieve, projectUpdate, todoRetrieve, todoDelete, todoUpdate, projectCreateNew, todoCreateNew } from "./dbActions";

const btnGeneric = document.createElement("button");

function showNavBar(){
    /*Generate a list of projects for sidebar*/
    const divNavbar = document.querySelector("#main-navbar");
    divNavbar.textContent = "";

    const btn_NewProject = document.createElement("button");
    btn_NewProject.textContent = "Create new todo list";
    btn_NewProject.addEventListener("click", ()=>{
        document.querySelector("#form-new-project").style.display = "block";
    });

    const btn_NewTodo = document.createElement("button");
    btn_NewTodo.textContent = "Create new todo item";
    btn_NewTodo.addEventListener("click", ()=>{
        document.querySelector("#form-new-todo").style.display = "block";
    });

    divNavbar.appendChild(btn_NewProject);
    divNavbar.appendChild(btn_NewTodo);
    divNavbar.appendChild(returnNewProjectForm());
    divNavbar.appendChild(returnNewTodoForm());
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

    const projectCardHeader = document.createElement("div");
    projectCardHeader.setAttribute("class", "project-card-heading");

    const btnExpand = document.createElement("button");
    if(object.cardExpanded){
        btnExpand.textContent = "Collapse";
    }else{
        btnExpand.textContent = "Expand";
    };
    btnExpand.addEventListener("click", (e)=>{
        e.preventDefault();
        object.toggleDetails();
        updateUI();
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
    if(object.editActive){
        btnEdit.textContent = "Cancel Edit";
    }else{
        btnEdit.textContent = "Edit";
    };
    btnEdit.addEventListener("click", (e)=>{
        e.preventDefault();
        object.setEditMode();
        updateUI();
    });

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.addEventListener("click", (e)=>{
        e.preventDefault();
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

    if(object.cardExpanded){
        newLiItem.appendChild(returnTodoList(object.id));
    };

    return newLiItem;
};

function returnTodoList(projectId){
    /*Generate todo item list as "ul" element*/
    const allTodoItems = todoRetrieve(projectId, true);
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

    const btnTodoComplete = document.createElement("button");
    if(object.completed){
        btnTodoComplete.textContent = "Mark Incomplete";
    }else{
        btnTodoComplete.textContent = "Mark Completed";
    };
    btnTodoComplete.setAttribute("data-id", object.id);
    btnTodoComplete.addEventListener("click", (e)=>{
        e.preventDefault();
        object.setCompleted();
        updateUI();
    });

    const btnTodoEdit = document.createElement("button");
    if(object.editActive){
        btnTodoEdit.textContent = "Cancel Edit";
    }else{
        btnTodoEdit.textContent = "Edit";
    };
    btnTodoEdit.addEventListener("click", (e)=>{
        e.preventDefault();
        object.setEditMode();
        updateUI();
    });

    const btnTodoRemove = document.createElement("button");
    btnTodoRemove.textContent = "Remove";
    btnTodoRemove.addEventListener("click", (e)=>{
        e.preventDefault();
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
        formCard.appendChild(labelAssignToProject);
        formCard.appendChild(inputAssignToProject);
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
    formCard.appendChild(labelTitle);
    formCard.appendChild(inputTitle);
    formCard.appendChild(labelDescription);
    formCard.appendChild(inputDescription);
    formCard.appendChild(btn_submit);
    formCard.appendChild(btn_cancel);

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
    formCard.appendChild(labelTitle);
    formCard.appendChild(inputTitle);
    formCard.appendChild(labelDescription);
    formCard.appendChild(inputDescription);
    formCard.appendChild(labelDueDate);
    formCard.appendChild(inputDueDate);
    formCard.appendChild(labelAssignToProject);
    formCard.appendChild(inputAssignToProject);
    formCard.appendChild(btn_submit);
    formCard.appendChild(btn_cancel);

    return formCard;
};

function updateUI(){
    showNavBar();
    showSideBar();
    showMainContent();
};
export {updateUI};

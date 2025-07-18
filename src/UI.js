import { projectGetAll, projectRetrieve, todoGetAllForProject } from "./dbActions";

const divSidebar = document.querySelector("#content-sidebar");
const divMain = document.querySelector("#content-main");

function showProjectDetails(id = projectGetAll()[0].id){
    /*Generate a list of all available todos for a project*/
    divMain.textContent = "";

    const todoList = document.createElement("ul");
    const todoItem = document.createElement("li")
    const items = todoGetAllForProject(id);
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const newItem = todoItem.cloneNode();
        newItem.textContent = element.title;

        todoList.appendChild(newItem);
    };

    /*DEBUG AREA*/
    /*a test template to add at that shows project todos expanded with all details*/
    const testProjectCard = document.createElement("li");
    const projectTitle = document.createElement("p");
    const projectDescription = document.createElement("p");
    const todoListTest = document.createElement("ul");
    const todoItemTest = document.createElement("li");

    testProjectCard.setAttribute("class", "project-card");
    projectTitle.setAttribute("class", "project-title-p");
    projectDescription.setAttribute("class", "project-description-p");


    projectTitle.textContent = projectRetrieve(id).title;
    projectDescription.textContent = projectRetrieve(id).description;
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const newItem = todoItemTest.cloneNode();
        const todoTitle = document.createElement("p");
        const todoDescription = document.createElement("p");

        todoTitle.textContent = element.title;
        todoDescription.textContent = element.description;

        newItem.appendChild(todoTitle);
        newItem.appendChild(todoDescription);

        todoListTest.appendChild(newItem);
    };

    testProjectCard.appendChild(projectTitle);
    testProjectCard.appendChild(projectDescription);
    testProjectCard.appendChild(todoListTest);
    todoList.appendChild(testProjectCard);

    /*DEBUG AREA END*/

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

export {showAllProjects, showProjectDetails};

import { todoGetAllForProject, projectDelete } from "./dbActions";
import { updateUI } from "./UI";

class projectList{
    constructor(title, description){
        this.id = "P" + crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.cardExpanded = false;
    }

    toggleDetails(){
        this.cardExpanded = !this.cardExpanded;
    }
    setTitle(title){
        this.title = title;
    }
    setDescription(desc){
        this.description = desc;
    }
    getHtmlElement(){
        const btnGeneric = document.createElement("button");

        const projectCard = document.createElement("li");
        projectCard.setAttribute("class", "project-card");

        const projectHeading = document.createElement("div");
        projectHeading.setAttribute("class", "project-card-heading");

        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.setAttribute("class", "project-card-title");

        const projectTitleName = document.createElement("h1");
        projectTitleName.textContent = this.title;

        const projectNav = document.createElement("div");
        projectNav.setAttribute("class", "project-nav");

        const btnExpand = btnGeneric.cloneNode();
        if(this.cardExpanded){
            btnExpand.textContent = "Collapse";
        }else{
            btnExpand.textContent = "Expand";
        };
        btnExpand.addEventListener("click", ()=>{
            this.toggleDetails();
            updateUI();
        });

        const btnComplete = btnGeneric.cloneNode();
        btnComplete.textContent = "Mark Completed";
        const btnEdit = btnGeneric.cloneNode();
        btnEdit.textContent = "Edit";
        const btnRemove = btnGeneric.cloneNode();
        btnRemove.textContent = "Remove";
        btnRemove.addEventListener("click", ()=>{
            projectDelete(this.id);
            updateUI();
        });

        //assemble the html element
        projectTitleDiv.appendChild(btnExpand);
        projectTitleDiv.appendChild(projectTitleName);

        projectHeading.appendChild(projectTitleDiv);

        projectNav.appendChild(btnComplete);
        projectNav.appendChild(btnEdit);
        projectNav.appendChild(btnRemove);

        projectHeading.appendChild(projectNav);

        projectCard.appendChild(projectHeading);

        if(this.cardExpanded){
            projectCard.appendChild(this.getHtmlExpanded());
        };

        return projectCard;
    }
    getHtmlExpanded(){
        const projectCardDetails = document.createElement("div");
        projectCardDetails.setAttribute("class", "project-details");

        const projectDescription = document.createElement("p");
        projectDescription.setAttribute("class", "project-description-p");
        projectDescription.textContent = this.description;

        const todoList = document.createElement("ul");
        todoList.setAttribute("class", "todo-list-card");

        const todoItemArray = todoGetAllForProject(this.id);

        for (let index = 0; index < todoItemArray.length; index++) {
            const element = todoItemArray[index];
            todoList.appendChild(element.getItemCardHtml())
        }

        projectCardDetails.appendChild(projectDescription);
        projectCardDetails.appendChild(todoList);

        return projectCardDetails;
    }
};

export default projectList;

import { todoGetAllForProject } from "./dbActions";
import { toggleProjectDetails } from "./UI";

class projectList{
    constructor(title, description){
        this.id = "P" + crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.cardExpanded = false;
    }

    setExpanded(){
        //debug: temporary function to force flag switch while testing
        this.cardExpanded = true;
    }
    setCollapsed(){
        //debug: temporary function to force flag switch while testing
        this.cardExpanded = false;
    }
    setTitle(title){
        this.title = title;
    }
    setDescription(desc){
        this.description = desc;
    }
    getHtmlCollapsed(){
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
        btnExpand.textContent = "Expand";
        btnExpand.addEventListener("click", (e)=>{
            toggleProjectDetails(this.id, true);
        });

        const btnComplete = btnGeneric.cloneNode();
        btnComplete.textContent = "Mark Completed";
        const btnEdit = btnGeneric.cloneNode();
        btnEdit.textContent = "Edit";
        const btnRemove = btnGeneric.cloneNode();
        btnRemove.textContent = "Remove";

        //assemble the html element
        projectTitleDiv.appendChild(btnExpand);
        projectTitleDiv.appendChild(projectTitleName);

        projectHeading.appendChild(projectTitleDiv);

        projectNav.appendChild(btnComplete);
        projectNav.appendChild(btnEdit);
        projectNav.appendChild(btnRemove);

        projectHeading.appendChild(projectNav);

        projectCard.appendChild(projectHeading);

        return projectCard;
    }
    getHtmlExpanded(){
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
        btnExpand.textContent = "Collapse";
        btnExpand.addEventListener("click", (e)=>{
            toggleProjectDetails(this.id, false);
        });

        const btnComplete = btnGeneric.cloneNode();
        btnComplete.textContent = "Mark Completed";
        const btnEdit = btnGeneric.cloneNode();
        btnEdit.textContent = "Edit";
        const btnRemove = btnGeneric.cloneNode();
        btnRemove.textContent = "Remove";

        //assemble the html element
        projectTitleDiv.appendChild(btnExpand);
        projectTitleDiv.appendChild(projectTitleName);

        projectHeading.appendChild(projectTitleDiv);

        projectNav.appendChild(btnComplete);
        projectNav.appendChild(btnEdit);
        projectNav.appendChild(btnRemove);

        projectHeading.appendChild(projectNav);

        //Above is for collapsed html element

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

        projectCard.appendChild(projectHeading);
        projectCard.appendChild(projectDescription);
        projectCard.appendChild(todoList);

        return projectCard;
    }
};

export default projectList;

import { todoGetAllForProject } from "./dbActions";

class projectList{
    constructor(title, description){
        this.id = "P" + crypto.randomUUID();
        this.title = title;
        this.description = description;
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

    }
};

export default projectList;

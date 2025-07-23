import { todoGetAllForProject, projectUpdate, projectDelete } from "./dbActions";
import { updateUI } from "./UI";

class projectList{
    constructor(title, description){
        this.id = "P" + crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.completed = false;
        this.cardExpanded = false;
        this.editActive = false;
    }

    getProjectObject(){
        return {
            "id":this.id,
            "title":this.title,
            "description":this.description,
            "completed":this.completed,
            "cardExpanded":this.cardExpanded,
            "editActive":this.editActive,
        };
    }

    updateProjectObject(newDataObject){
        if(newDataObject.title != ""){
            this.setTitle(newDataObject.title);
        };
        if(newDataObject.description != ""){
            this.setDescription(newDataObject.description);
        };
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
    setCompleted(){
        this.completed = !this.completed;
    }
    setEditMode(){
        this.editActive = !this.editActive;
    }

    addFormForEditing(){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "project-form");
        formCard.setAttribute("id", this.id);

        const genericInput = document.createElement("input");
        genericInput.setAttribute("type", "text");
        const genericLabel = document.createElement("label");

        //title, description, date inputs
        const inputTitle = genericInput.cloneNode()
        inputTitle.setAttribute("id", "pname");
        inputTitle.setAttribute("name", "title");
        const labelTitle = genericLabel.cloneNode();
        labelTitle.setAttribute("for", "pname");
        labelTitle.textContent = "Task Name";

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
            projectUpdate(this.id, newProjectItem);
            this.setEditMode();
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
        btnComplete.addEventListener("click", ()=>{
            this.setCompleted();
            updateUI();
        });
        if(this.completed){
            btnComplete.textContent = "Mark Incomplete";
        }else{
            btnComplete.textContent = "Mark Completed";
        };

        const btnEdit = btnGeneric.cloneNode();
        btnEdit.textContent = "Edit";
        if(this.editActive){
            btnEdit.textContent = "Cancel Edit";
        }else{
            btnEdit.textContent = "Edit";
        };
        btnEdit.addEventListener("click", ()=>{
            this.setEditMode();
            updateUI();
        });

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

        if(this.editActive){
            projectCard.appendChild(this.addFormForEditing());
        };

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

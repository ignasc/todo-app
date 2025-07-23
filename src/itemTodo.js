import { todoDelete, todoUpdate } from "./dbActions";
import { showProjectsMainContent } from "./UI";

class itemTodo{
    constructor(projectId, title, description, dueDate, priority, completed){
        this.id = "I" + crypto.randomUUID();
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.editActive = false;
    }

    getTodoObject(){
        return {
            "id":this.id,
            "projectId":this.projectId,
            "title":this.title,
            "description":this.description,
            "dueDate":this.dueDate,
            "priority":this.priority,
            "completed":this.completed,
            "editActive":this.editActive,
        };
    }

    updateTodoObject(newDataObject){
        if(newDataObject.title != ""){
            this.setTitle(newDataObject.title);
        };
        if(newDataObject.description != ""){
            this.setDescription(newDataObject.description);
        };
        if(newDataObject.dueDate != ""){
            this.setDueDate(newDataObject.dueDate);
        };
    }

    setProjectId(projectId){
        this.projectId = projectId;
    }
    setTitle(title){
        this.title = title;
    }
    setDescription(desc){
        this.description = desc;
    }
    setDueDate(dueDate){
        this.dueDate = dueDate;
    }
    setPriority(prio){
        this.priority = prio;
    }
    setCompleted(){
        this.completed = !this.completed;
    }
    setEditMode(){
        this.editActive = !this.editActive;
    }

    addFormForEditing(){
        const formCard = document.createElement("form")
        formCard.setAttribute("class", "todo-form");
        formCard.setAttribute("id", this.id);

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
            todoUpdate(this.id, newTodoItem);
            showProjectsMainContent();
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

    getItemCardHtml(){
        const cardItem = document.createElement("li");
        cardItem.setAttribute("class", "todo-item-card");

        const cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "todo-heading");

        const cardTitle = document.createElement("p");
        cardTitle.setAttribute("class", "todo-title");

        const cardDesc = document.createElement("p");
        cardDesc.setAttribute("class", "todo-description");

        const cardNav = document.createElement("div")
        cardNav.setAttribute("class", "todo-nav");

        const btn_complete = document.createElement("button");
        if(this.completed){
            btn_complete.textContent = "Mark Incomplete";
        }else{
            btn_complete.textContent = "Mark Completed";
        };
        btn_complete.addEventListener("click", ()=>{
            this.setCompleted();
            showProjectsMainContent();
        });

        const btn_edit = document.createElement("button");
        btn_edit.textContent = "Edit";

        const btn_remove = document.createElement("button");
        btn_remove.textContent = "Remove";
        btn_remove.addEventListener("click", ()=>{
            todoDelete(this.id);
            showProjectsMainContent();
        });

        //assemble the item element

        cardNav.appendChild(btn_complete);
        cardNav.appendChild(btn_edit);
        cardNav.appendChild(btn_remove);

        cardDesc.textContent = this.description;
        cardTitle.textContent = this.title;

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardDesc);

        cardItem.appendChild(cardHeader);
        cardItem.appendChild(cardNav);

        cardItem.appendChild(this.addFormForEditing());

        return cardItem;
    }
};

export default itemTodo;

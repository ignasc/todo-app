import { todoDelete } from "./dbActions";
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

        return cardItem;
    }
};

export default itemTodo;

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
        if(newDataObject.projectId != ""){
            this.setProjectId(newDataObject.projectId);
        };
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
};

export default itemTodo;

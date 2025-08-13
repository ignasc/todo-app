class itemTodo{
    constructor(projectId, title, description, dueDate, priority, completed, id = "I" + crypto.randomUUID()){
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.editActive = false;
    }

    getObject(){
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

    updateObject(newDataObject){
        if(newDataObject.projectId != ""){
            this.setProjectId(newDataObject.projectId);
        };

        this.setTitle(newDataObject.title);

        this.setDescription(newDataObject.description);

        if(newDataObject.dueDate != ""){
            this.setDueDate(newDataObject.dueDate);
        };

        this.setPriority(newDataObject.priority);
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
    setPriority(priority){
        this.priority = priority;
    }
    setCompleted(){
        this.completed = !this.completed;
    }
    setEditMode(){
        this.editActive = !this.editActive;
    }
};

export default itemTodo;

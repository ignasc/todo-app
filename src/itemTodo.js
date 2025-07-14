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
};

export default itemTodo;

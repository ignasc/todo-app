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

    setCompleted(){
        this.completed = !this.completed;
    }
};

export default itemTodo;

class projectList{
    constructor(title, description){
        this.id = "P" + crypto.randomUUID();
        this.title = title;
        this.description = description;
    }
};

export default projectList;

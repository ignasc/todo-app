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
};

export default projectList;

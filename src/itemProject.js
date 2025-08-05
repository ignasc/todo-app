class projectList{
    constructor(title, description, id = "P" + crypto.randomUUID()){
        this.id = id;
        this.title = title;
        this.description = description;
        this.cardExpanded = false;
        this.editActive = false;
    }

    getProjectObject(){
        return {
            "id":this.id,
            "title":this.title,
            "description":this.description,
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

    toggleDetails(flag = false){
        this.cardExpanded = !this.cardExpanded;
    }
    setTitle(title){
        this.title = title;
    }
    setDescription(desc){
        this.description = desc;
    }
    setCompleted(flag = false){
        this.completed = !this.completed;
    }
    setEditMode(flag = false){
        this.editActive = !this.editActive;
    }
};

export default projectList;

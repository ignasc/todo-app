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

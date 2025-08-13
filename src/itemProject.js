class projectList {
    constructor(title, description, id = "P" + crypto.randomUUID()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cardExpanded = false;
        this.editActive = false;
    }

    getObject() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            cardExpanded: this.cardExpanded,
            editActive: this.editActive,
        };
    }

    updateObject(newDataObject) {
        if (newDataObject.title != "") {
            this.setTitle(newDataObject.title);
        }
        if (newDataObject.description != "") {
            this.setDescription(newDataObject.description);
        }
    }

    toggleDetails(flag = false) {
        this.cardExpanded = !this.cardExpanded;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(desc) {
        this.description = desc;
    }
    setEditMode(flag = false) {
        this.editActive = !this.editActive;
    }
}

export default projectList;

import projectList from "./itemProject";

const listDB = [];

class projectDB{

    constructor(){
        this.db = [];

        this.db.push(new projectList("Default List","Default list for all todo's"));
    }

    get getFullDB(){
        return this.db;
    }

};

// Add default item list
listDB.push(new projectList("Default List","Default list for all todo's"));

export const defaultListId = listDB[0].id;
export const newProjectDB = new projectDB();
export default listDB;

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

// Add few items to db for testing purposes
listDB.push(new projectList("Default List","Default list for all todo's"));
listDB.push(new projectList("customID_01","Project 01"));
listDB.push(new projectList("customID_02","Project 02"));

export const defaultListId = listDB[0].id;
export const newProjectDB = new projectDB();
export default listDB;

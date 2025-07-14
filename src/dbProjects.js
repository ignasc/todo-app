import projectList from "./itemProject";

const projectDB = [];

// Add few items to db for testing purposes
projectDB.push(new projectList("Default List","Default list for all todo's"));
projectDB.push(new projectList("customID_01","Project 01"));
projectDB.push(new projectList("customID_02","Project 02"));

export const defaultListId = projectDB[0].id;
export default projectDB;

import projectList from "./itemProject";

const projectDB = [];

// Add few items to db for testing purposes
projectDB.push(new projectList("Default List","Default list for all todo's"));
projectDB.push(new projectList("Custom List 01","List of todos for project 01"));
projectDB.push(new projectList("Custom List 02","List of todos for project 02"));

projectDB[0].setExpanded();

export default projectDB;

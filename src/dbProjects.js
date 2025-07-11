import projectList from "./itemProject";

const listDB = [];

// Add default item list
listDB.push(new projectList("Default List","Default list for all todo's"));

export const defaultListId = listDB[0].id;
export default listDB;

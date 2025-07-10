import todoList from "./todoList";

const listDB = [];

// Add default item list
listDB.push(new todoList("Default List","Default list for all todo's"));

export const defaultListId = listDB[0].id;
export default listDB;

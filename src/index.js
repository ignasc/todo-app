import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import {newProjectDB as projectDB} from "./dbProjects"
import itemTodo from "./itemTodo";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, projectCreateNew, projectRetrieve, projectUpdate, projectDelete} from "./dbActions";


/*-------- DEBUG AREA --------*/
const testId = todoDB[1].id;

console.log("Item before changes:")
console.log(todoRetrieve(testId))

todoUpdate(testId)

let debugCheckResult = todoDB[1];

console.log("Item after update:")
console.log(debugCheckResult)

showTestMessage();

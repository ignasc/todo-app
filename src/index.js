import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import {newProjectDB as projectDB} from "./dbProjects"
import itemTodo from "./itemTodo";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, projectCreateNew, projectRetrieve, projectUpdate, projectDelete} from "./dbActions";


/*-------- DEBUG AREA --------*/
todoCreateNew(new itemTodo("defaultListId","Todo No.99","To do item No.99",new Date(), 6, false))

console.log("Returned item:")
console.log(todoRetrieve(todoDB[1].id))

let debugCheckResult = todoDB[todoDB.length-1];

console.log("Sample todo:")
console.log(debugCheckResult)

showTestMessage();

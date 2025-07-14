import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import {newProjectDB as projectDB} from "./dbProjects"
import itemTodo from "./itemTodo";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, todoGetAllForProject, projectCreateNew, projectRetrieve, projectUpdate, projectDelete} from "./dbActions";


/*-------- DEBUG AREA --------*/
const testId = todoDB[1].id;

console.log(todoGetAllForProject("Default List"))

showTestMessage();

import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, todoGetAllForProject, projectCreateNew, projectRetrieve, projectUpdate, projectDelete} from "./dbActions";


/*-------- DEBUG AREA --------*/
const testId = projectDB[1].id;

projectDelete(testId)
console.log("Project deleted: " + testId)
console.log(projectDB)

showTestMessage();

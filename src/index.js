import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, todoGetAllForProject, projectCreateNew, projectRetrieve, projectUpdate, projectDelete} from "./dbActions";


/*-------- DEBUG AREA --------*/
const testId = todoDB[1].id;

projectCreateNew("New Project", "New project description")
console.log(projectDB)

showTestMessage();

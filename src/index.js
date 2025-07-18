import "./resetcss.css";
import "./styles.css";

import {showAllProjects, showProjectDetails} from "./UI";
import todoDB from "./dbTodoItems";
import projectDB from "./dbProjects";

//DB actions
import {todoCreateNew, todoRetrieve, todoUpdate, todoDelete, todoGetAllForProject, projectCreateNew, projectRetrieve, projectUpdate, projectDelete, projectGetAll} from "./dbActions";


/*-------- DEBUG AREA --------*/

showAllProjects();
showProjectDetails();

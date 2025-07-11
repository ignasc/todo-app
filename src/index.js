import "./resetcss.css";
import "./styles.css";

import showTestMessage from "./testModule";
import todoDB from "./dbTodoItems";
import {newProjectDB as projectDB} from "./dbProjects"

console.log("Sample todo:")
console.log(todoDB[0])

console.log("project database:")
console.log(projectDB.getFullDB)

showTestMessage();

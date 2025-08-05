//DEBUG
import projectDB from "./dbProjects";
//DEBUG END

import itemTodo from "./itemTodo";

const todoDB = [];
const debugProjectIds = [];
for (let index = 0; index < projectDB.length; index++) {
    const id = projectDB[index].id;
    debugProjectIds.push(id);
}
function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Add temporary items for development purposes.
for (let i = 0; i < 10; i++) {
    todoDB.push(new itemTodo(debugProjectIds[randomIntFromInterval(0, debugProjectIds.length-1)],"Todo No."+i,"To do item No."+i,new Date(), 6, false));
}

export default todoDB;

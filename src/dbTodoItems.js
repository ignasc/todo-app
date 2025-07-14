import itemTodo from "./itemTodo";

const todoDB = [];
const debugProjectIds = ["Default List", "customID_01", "customID_02"] // debug
function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Add temporary items for development purposes.
for (let i = 0; i < 10; i++) {
    todoDB.push(new itemTodo(debugProjectIds[randomIntFromInterval(0, debugProjectIds.length-1)],"Todo No."+i,"To do item No.1"+i,new Date(), 6, false));
}

export default todoDB;

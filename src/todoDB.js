import todoItem from "./todoItem";

const todoDB = [];

// Add temporary items for development purposes.
todoDB.push(new todoItem("projectId","Todo No.1","To do item No.1",new Date(), 6, false));
todoDB.push(new todoItem("projectId","Todo No.2","To do item No.2",new Date(), 6, false));
todoDB.push(new todoItem("projectId","Todo No.3","To do item No.3",new Date(), 6, false));

export default todoDB;

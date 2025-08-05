function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeProject(object){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const projectToStore = JSON.stringify(object.getProjectObject());

    localStorage.setItem(object.id, projectToStore)
};

function getProject(id){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const project = localStorage.getItem(id);

    if(project){
        return JSON.parse(project);
    } else {
        return -1;
    };
};

function getAllProjects(){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const localStorageKeys = Object.keys(localStorage);
    const allProjectArray = [];

    for (let index = 0; index < localStorageKeys.length; index++) {
        const elementId = localStorageKeys[index];
        
        if(elementId[0] == "P"){
            allProjectArray.push(localStorage.getItem(elementId));
        };
    }

    return allProjectArray;
};

function storeTodo(object){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const todoToStore = JSON.stringify(object.getTodoObject());

    localStorage.setItem(object.id, todoToStore)
};

function getTodo(id){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const todo = localStorage.getItem(id);

    if(todo){
        return JSON.parse(todo);
    } else {
        return -1;
    };
};

function deleteTodo(id){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    };

    localStorage.removeItem(id);
}

function getAllTodos(){
    if (!storageAvailable("localStorage")) {
    console.log("Storage NOT available");
    return;
    }

    const localStorageKeys = Object.keys(localStorage);
    const allTodosArray = [];

    for (let index = 0; index < localStorageKeys.length; index++) {
        const elementId = localStorageKeys[index];
        
        if(elementId[0] == "I"){
            allTodosArray.push(localStorage.getItem(elementId));
        };
    }

    return allTodosArray;
};

function updateLocalStorate(){
    const allProjects = getAllProjects();
    const allTodos = getAllTodos();

    for (let index = 0; index < allProjects.length; index++) {
        const element = allProjects[index];
        localStorage.setItem(element.id, JSON.stringify(element.getProjectObject()));
    }

    for (let index = 0; index < allTodos.length; index++) {
        const element = allTodos[index];
        localStorage.setItem(element.id, JSON.stringify(element.getProjectObject()));
    }
};

export {storageAvailable, storeProject, getProject, getAllProjects, storeTodo, getTodo, deleteTodo, getAllTodos, updateLocalStorate};

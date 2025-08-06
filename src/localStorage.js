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
  };
};

function localStorageGetItem(id){
    const newObject = JSON.parse(localStorage.getItem(id));
    return newObject;
};

function localStorageSetItem(object){
    const objectString = JSON.stringify(object.getObject());
    localStorage.setItem(object.id, objectString);
};
function localStorageRemoveItem(id){
    localStorage.removeItem(id);
};

function localStorageAllProjects(){
    const localStorageKeys = Object.keys(localStorage);
    const allProjectKeys = [];
    for (let index = 0; index < localStorageKeys.length; index++) {
        const id = localStorageKeys[index];
        if(id[0] == "P"){
            allProjectKeys.push(id);
        };
    }
    return allProjectKeys;
};

function localStorageAllTodos(){
    const localStorageKeys = Object.keys(localStorage);
    const allTodoKeys = [];
    for (let index = 0; index < localStorageKeys.length; index++) {
        const id = localStorageKeys[index];
        if(id[0] == "I"){
            allTodoKeys.push(id);
        };
    }
    return allTodoKeys;
};

export {storageAvailable, localStorageGetItem, localStorageSetItem, localStorageRemoveItem, localStorageAllProjects, localStorageAllTodos};

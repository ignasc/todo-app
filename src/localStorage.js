function localStorageGetItem(id){
    return localStorage.getItem(id);
};

function localStorageSetItem(object){
    const objectString = JSON.stringify(object.getObject());
    localStorage.setItem(object.id, objectString);
};
function localStorageRemoveItem(id){
    localStorage.removeItem(id);
};

function localStorageUpdateAll(){
    const allKeys = Object.keys(localStorage);
    return allKeys;
};

export {localStorageGetItem, localStorageSetItem, localStorageRemoveItem, localStorageUpdateAll};

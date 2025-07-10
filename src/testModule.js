const divContent = document.querySelector("#content");
const topTitle = document.createElement("h1");

topTitle.textContent = "Webpack template loaded";

function showTestMessage(){
    divContent.textContent = "";
    divContent.appendChild(topTitle);
};

export default showTestMessage;

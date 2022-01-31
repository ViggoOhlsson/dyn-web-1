window.onload = () => {
    checkIfEmpty();
}

function checkIfEmpty() {
    let grid = document.getElementById("task-grid");
    if (grid.innerText == "") {
        let container = document.createElement("div");
        container.className = "empty-container";
        
        let text = document.createElement("span");
        text.innerText = "It appears your list is empty...";
        container.appendChild(text);
        
        let button = document.createElement("a");

        let icon = document.createElement("i");
        icon.className = "fa fa-plus";

        button.appendChild(icon);
        button.innerHTML += " ADD";
        button.href = "/add";

        container.appendChild(button);
        grid.appendChild(container);
    }
}
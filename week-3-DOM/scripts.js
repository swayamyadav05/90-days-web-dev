let currentIndex = 3;
function addTodo() {
    // Get the input elemet to read the value
    const inputEl = document.getElementById("inp");
    // Trim the uneccessary space (if any)
    const todoText = inputEl.value.trim();

    // If no input, alert the user
    if (todoText === "") {
        alert("Please enter a todo item");
        return;
    }

    // Get the parent element
    const parentEl = document.getElementById("todos");

    // Create a new todo div element
    const newTodo = document.createElement("div");
    newTodo.setAttribute("id", "todo-" + currentIndex);

    // Create a new heading element
    const newHeading = document.createElement("h4");
    newHeading.textContent = currentIndex + ". " + todoText;

    // Create a new button element
    const newButton = document.createElement("button");
    newButton.textContent = "Delete";
    newButton.setAttribute("onclick", "deleteTodo(" + currentIndex + ")");

    // Append new elements to new todo div
    newTodo.appendChild(newHeading);
    newTodo.appendChild(newButton);

    // Append new todo div to parent element
    parentEl.appendChild(newTodo);

    // Increament the index for next item
    currentIndex += 1;

    // Clear the input field
    inputEl.value = "";
}

function deleteTodo(index) {
    const element = document.getElementById("todo-" + index);
    element.parentElement.removeChild(element);
}

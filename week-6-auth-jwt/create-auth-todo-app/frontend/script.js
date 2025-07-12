const API_URL = "http://localhost:3000";

const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const addBtn = document.getElementById("add");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const taskInput = document.getElementById("task");
const authDiv = document.getElementById("auth");
const todoDiv = document.getElementById("todo");

let token = localStorage.getItem("token"); // Check for saved token

// Show appropriate view on page load
if (token) {
    showTodo();
} else {
    showAuth();
}

// Login handler
loginBtn.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        token = response.data.token;
        localStorage.setItem("token", token); // Save token
        showTodo();
    } catch (error) {
        alert("Login failed");
    }
});

// Register handler
registerBtn.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        await axios.post(`${API_URL}/register`, {
            username,
            password,
        });
        alert("User registered");
    } catch (error) {
        alert("Registration failed");
    }
});

// Add to-do handler
addBtn.addEventListener("click", async () => {
    const task = taskInput.value;
    try {
        const response = await axios.post(
            `${API_URL}/todos`,
            {
                task,
            },
            {
                headers: { Authorization: token },
            }
        );
    } catch (error) {
        alert("Failed to add todo");
    }
});

// Toggle views
function showAuth() {
    authDiv.style.display = "block";
    todoDiv.style.display = "none";
}

function showTodo() {
    authDiv.style.display = "none";
    todoDiv.style.display = "block";
    loadTodos();
}

// Load user's to-dos
async function loadTodos() {
    try {
        const response = await axios.get(`${API_URL}/todos`, {
            headers: { Authorization: token },
        });
        todoList.innerHTML = ""; // Clear current list
        response.data.forEach(addTodoToList);
    } catch (error) {
        alert("Failed to load todos");
    }
}

// Add a to-do to the DOM
function addTodoToList(todo) {
    const li = document.createElement("li");
    li.textContent = todo.task;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
        try {
            await axios.delete(`${API_URL}/todos/${todo.id}`, {
                headers: {
                    Authorization: token,
                },
            });
            li.remove(); // Remove from DOM
        } catch (error) {
            alert("Failed to delete todo");
        }
    });
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

const API_URL = "http://localhost:3000";
let token = localStorage.getItem("token");
let username = null;
let todos = [];
let currentFilter = "all";

// DOM elements
const authSection = document.getElementById("auth-section");
const todoSection = document.getElementById("todo-section");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authUsername = document.getElementById("auth-username");
const authPassword = document.getElementById("auth-password");
const userGreeting = document.getElementById("user-greeting");
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todosContainer = document.getElementById("todos-container");
const emptyState = document.getElementById("empty-state");
const todoCount = document.getElementById("todo-count");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

function showMessage(message, type = "info") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.opacity = "1";
        messageDiv.style.transform = "translateX(0)";
    }, 10);
    setTimeout(() => {
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (messageDiv.parentNode)
                messageDiv.parentNode.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function setAuthUI(loggedIn) {
    if (loggedIn) {
        authSection.style.display = "none";
        todoSection.style.display = "block";
        userGreeting.textContent = `Hello, ${username}!`;
    } else {
        authSection.style.display = "block";
        todoSection.style.display = "none";
        authUsername.value = "";
        authPassword.value = "";
        username = null;
        todos = [];
    }
}

async function loginOrRegister(isLogin) {
    const user = authUsername.value.trim();
    const pass = authPassword.value;
    if (!user || !pass) {
        showMessage("Username and password required", "error");
        return;
    }
    try {
        const res = await fetch(
            `${API_URL}/${isLogin ? "login" : "register"}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass }),
            }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Auth failed");
        if (isLogin) {
            token = data.token;
            localStorage.setItem("token", token);
            username = user;
            setAuthUI(true);
            await fetchTodos();
            showMessage("Login successful!", "success");
        } else {
            showMessage("Registration successful! Please login.", "success");
        }
    } catch (err) {
        showMessage(err.message, "error");
    }
}

loginBtn.addEventListener("click", () => loginOrRegister(true));
registerBtn.addEventListener("click", () => loginOrRegister(false));
logoutBtn.addEventListener("click", () => {
    token = null;
    localStorage.removeItem("token");
    setAuthUI(false);
});

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});
addTodoBtn.addEventListener("click", addTodo);

async function addTodo() {
    const task = todoInput.value.trim();
    if (!task) {
        showMessage("Please enter a todo item", "error");
        return;
    }
    try {
        const res = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ task }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add todo");
        todoInput.value = "";
        await fetchTodos();
        showMessage("Todo added!", "success");
    } catch (err) {
        showMessage(err.message, "error");
    }
}

async function fetchTodos(filter) {
    const useFilter = filter || currentFilter;
    try {
        const res = await fetch(`${API_URL}/todos?filter=${useFilter}`, {
            headers: { Authorization: token },
        });
        if (res.status === 401 || res.status === 403) {
            setAuthUI(false);
            showMessage("Session expired. Please login again.", "error");
            return;
        }
        todos = await res.json();
        renderTodos();
    } catch (err) {
        showMessage("Failed to load todos", "error");
    }
}

function renderTodos() {
    todosContainer.innerHTML = "";
    if (todos.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
        todos.forEach((todo) => {
            const todoDiv = document.createElement("div");
            todoDiv.className = `todo-item${
                todo.completed ? " completed" : ""
            }`;
            todoDiv.dataset.todoId = todo.id;
            // Format timestamp
            const createdDate = new Date(todo.createdAt).toLocaleDateString();
            const updatedDate = new Date(todo.updatedAt).toLocaleDateString();
            const timeDisplay =
                createdDate === updatedDate
                    ? `Created: ${createdDate}`
                    : `Updated: ${updatedDate}`;
            todoDiv.innerHTML = `
                <div class="todo-content">
                    <div class="todo-checkbox${
                        todo.completed ? " checked" : ""
                    }" tabindex="0" aria-label="Toggle todo completion"></div>
                    <span class="todo-text${
                        todo.completed ? " completed" : ""
                    }">${escapeHtml(todo.task)}</span>
                    <input type="text" class="todo-edit-input" value="${escapeHtml(
                        todo.task
                    )}">
                </div>
                <div class="todo-actions">
                    <button class="btn btn-edit" title="Edit todo">Edit</button>
                    <button class="btn btn-danger" title="Delete todo">Delete</button>
                    <button class="btn btn-primary btn-save" title="Save changes" style="display: none;">Save</button>
                    <button class="btn btn-secondary btn-cancel" title="Cancel editing" style="display: none;">Cancel</button>
                </div>
                <div class="todo-meta">
                    <span class="todo-timestamp">${timeDisplay}</span>
                </div>
            `;
            todosContainer.appendChild(todoDiv);
        });
    }
    renderStats();
}

function renderStats() {
    const total = todos.length;
    const active = todos.filter((t) => !t.completed).length;
    const completed = total - active;
    let statsText = "";
    switch (currentFilter) {
        case "active":
            statsText = `${active} active item${active !== 1 ? "s" : ""}`;
            break;
        case "completed":
            statsText = `${completed} completed item${
                completed !== 1 ? "s" : ""
            }`;
            break;
        default:
            statsText = `${total} total item${total !== 1 ? "s" : ""}`;
    }
    todoCount.textContent = statsText;
}

// Event delegation for todo actions
// Edit, Save, Cancel, Delete, Toggle

todosContainer.addEventListener("click", async (e) => {
    const todoDiv = e.target.closest(".todo-item");
    if (!todoDiv) return;
    const id = todoDiv.dataset.todoId;
    if (e.target.classList.contains("todo-checkbox")) {
        await toggleTodo(id);
    } else if (e.target.classList.contains("btn-edit")) {
        startEditTodo(todoDiv);
    } else if (e.target.classList.contains("btn-danger")) {
        await deleteTodo(id);
    } else if (e.target.classList.contains("btn-save")) {
        await saveEditTodo(todoDiv, id);
    } else if (e.target.classList.contains("btn-cancel")) {
        cancelEditTodo(todoDiv);
    }
});

todosContainer.addEventListener("keydown", async (e) => {
    if (e.target.classList.contains("todo-edit-input") && e.key === "Enter") {
        const todoDiv = e.target.closest(".todo-item");
        const id = todoDiv.dataset.todoId;
        await saveEditTodo(todoDiv, id);
    }
});

todosContainer.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("todo-text")) {
        const todoDiv = e.target.closest(".todo-item");
        startEditTodo(todoDiv);
    }
});

function startEditTodo(todoDiv) {
    const textElement = todoDiv.querySelector(".todo-text");
    const editInput = todoDiv.querySelector(".todo-edit-input");
    const actionBtns = todoDiv.querySelectorAll(".btn-edit, .btn-danger");
    const saveCancelBtns = todoDiv.querySelectorAll(".btn-save, .btn-cancel");
    textElement.classList.add("editing");
    editInput.classList.add("active");
    editInput.value = textElement.textContent;
    actionBtns.forEach((btn) => (btn.style.display = "none"));
    saveCancelBtns.forEach((btn) => (btn.style.display = "inline-flex"));
    editInput.focus();
    editInput.select();
}

function cancelEditTodo(todoDiv) {
    const textElement = todoDiv.querySelector(".todo-text");
    const editInput = todoDiv.querySelector(".todo-edit-input");
    const actionBtns = todoDiv.querySelectorAll(".btn-edit, .btn-danger");
    const saveCancelBtns = todoDiv.querySelectorAll(".btn-save, .btn-cancel");
    textElement.classList.remove("editing");
    editInput.classList.remove("active");
    actionBtns.forEach((btn) => (btn.style.display = ""));
    saveCancelBtns.forEach((btn) => (btn.style.display = "none"));
}

async function saveEditTodo(todoDiv, id) {
    const editInput = todoDiv.querySelector(".todo-edit-input");
    const newText = editInput.value.trim();
    if (!newText) {
        showMessage("Todo text cannot be empty", "error");
        return;
    }
    try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ task: newText }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update todo");
        await fetchTodos();
        showMessage("Todo updated!", "success");
    } catch (err) {
        showMessage(err.message, "error");
    }
}

async function toggleTodo(id) {
    try {
        const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
            method: "PATCH",
            headers: { Authorization: token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to toggle todo");
        await fetchTodos();
    } catch (err) {
        showMessage(err.message, "error");
    }
}

async function deleteTodo(id) {
    if (!confirm("Are you sure you want to delete this todo?")) return;
    try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: { Authorization: token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to delete todo");
        await fetchTodos();
        showMessage("Todo deleted!", "success");
    } catch (err) {
        showMessage(err.message, "error");
    }
}

clearCompletedBtn.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to clear all completed todos?")) return;
    try {
        const res = await fetch(`${API_URL}/todos`, {
            method: "DELETE",
            headers: { Authorization: token },
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message || "Failed to clear completed");
        await fetchTodos();
        showMessage(data.message, "success");
    } catch (err) {
        showMessage(err.message, "error");
    }
});

filterBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        await fetchTodos(currentFilter);
    });
});

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// On load: check token, try to fetch todos
window.addEventListener("DOMContentLoaded", async () => {
    if (token) {
        // Try to get username from token (decode payload)
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            username = payload.username;
        } catch {
            username = null;
        }
        setAuthUI(true);
        await fetchTodos(currentFilter);
    } else {
        setAuthUI(false);
    }
});

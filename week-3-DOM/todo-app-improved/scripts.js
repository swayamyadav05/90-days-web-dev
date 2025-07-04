/**
 * Enhanced TODO List Application
 * Features: Create, Read, Update, Delete, Filter, Persist data
 * Uses modern JavaScript practices with proper state management
 */

// Application state management
class TodoApp {
    constructor() {
        // Initialize data structure - array of todo objects
        this.todos = [];
        this.currentFilter = "all";
        this.nextId = 1;

        // DOM element references for better performance
        this.elements = {
            todoInput: document.getElementById("todo-input"),
            addBtn: document.getElementById("add-todo-btn"),
            todosContainer: document.getElementById("todos-container"),
            emptyState: document.getElementById("empty-state"),
            todoCount: document.getElementById("todo-count"),
            filterBtns: document.querySelectorAll(".filter-btn"),
            clearCompletedBtn: document.getElementById("clear-completed-btn"),
        };

        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     * Sets up event listeners and loads saved data
     */
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    /**
     * Set up all event listeners using event delegation
     * Avoids inline onclick handlers for better separation of concerns
     */
    setupEventListeners() {
        // Add todo button click
        this.elements.addBtn.addEventListener("click", () => this.addTodo());

        // Enter key press in input field
        this.elements.todoInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.addTodo();
            }
        });

        // Event delegation for todo actions (edit, delete, toggle)
        this.elements.todosContainer.addEventListener("click", (e) => {
            const todoId = this.getTodoIdFromElement(e.target);
            if (!todoId) return;

            if (e.target.classList.contains("todo-checkbox")) {
                this.toggleTodo(todoId);
            } else if (e.target.classList.contains("btn-edit")) {
                this.editTodo(todoId);
            } else if (e.target.classList.contains("btn-danger")) {
                this.deleteTodo(todoId);
            } else if (e.target.classList.contains("btn-save")) {
                this.saveTodo(todoId);
            } else if (e.target.classList.contains("btn-cancel")) {
                this.cancelEdit(todoId);
            }
        });

        // Filter button clicks
        this.elements.filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed button
        this.elements.clearCompletedBtn.addEventListener("click", () => {
            this.clearCompleted();
        });
    }

    /**
     * Extract todo ID from DOM element
     * Helper function to get todo ID from event target
     */
    getTodoIdFromElement(element) {
        const todoItem = element.closest(".todo-item");
        return todoItem ? parseInt(todoItem.dataset.todoId) : null;
    }

    /**
     * Add a new todo item
     * Validates input and creates new todo object
     */
    addTodo() {
        const text = this.elements.todoInput.value.trim();

        // Input validation
        if (!text) {
            this.showMessage("Please enter a todo item", "error");
            return;
        }

        // Create new todo object with proper data structure
        const newTodo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Add to todos array
        this.todos.push(newTodo);

        // Clear input
        this.elements.todoInput.value = "";

        // Update UI and save to storage
        this.saveToStorage();
        this.render();

        this.showMessage("Todo added successfully!", "success");
    }

    /**
     * Toggle todo completion status
     * Updates the completed property and timestamp
     */
    toggleTodo(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date().toISOString();

            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Delete a todo item
     * Removes todo from array after confirmation
     */
    deleteTodo(id) {
        // Ask for confirmation before deletion
        if (confirm("Are you sure you want to delete this todo?")) {
            this.todos = this.todos.filter((t) => t.id !== id);

            this.saveToStorage();
            this.render();

            this.showMessage("Todo deleted successfully!", "success");
        }
    }

    /**
     * Start editing a todo item
     * Switches todo item to edit mode
     */
    editTodo(id) {
        const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
        if (!todoElement) return;

        const textElement = todoElement.querySelector(".todo-text");
        const editInput = todoElement.querySelector(".todo-edit-input");
        const actionBtns = todoElement.querySelectorAll(
            ".btn-edit, .btn-danger"
        );
        const saveCancelBtns = todoElement.querySelectorAll(
            ".btn-save, .btn-cancel"
        );

        // Switch to edit mode
        textElement.classList.add("editing");
        editInput.classList.add("active");
        editInput.value = textElement.textContent;

        // Hide edit/delete buttons, show save/cancel buttons
        actionBtns.forEach((btn) => (btn.style.display = "none"));
        saveCancelBtns.forEach((btn) => (btn.style.display = "inline-flex"));

        // Focus on input and select all text
        editInput.focus();
        editInput.select();
    }

    /**
     * Save edited todo
     * Updates todo text and switches back to view mode
     */
    saveTodo(id) {
        const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
        const editInput = todoElement.querySelector(".todo-edit-input");
        const newText = editInput.value.trim();

        if (!newText) {
            this.showMessage("Todo text cannot be empty", "error");
            return;
        }

        // Update todo in data structure
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.text = newText;
            todo.updatedAt = new Date().toISOString();

            this.saveToStorage();
            this.render();

            this.showMessage("Todo updated successfully!", "success");
        }
    }

    /**
     * Cancel editing
     * Returns todo to view mode without saving changes
     */
    cancelEdit(id) {
        const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
        if (!todoElement) return;

        const textElement = todoElement.querySelector(".todo-text");
        const editInput = todoElement.querySelector(".todo-edit-input");
        const actionBtns = todoElement.querySelectorAll(
            ".btn-edit, .btn-danger"
        );
        const saveCancelBtns = todoElement.querySelectorAll(
            ".btn-save, .btn-cancel"
        );

        // Switch back to view mode
        textElement.classList.remove("editing");
        editInput.classList.remove("active");

        // Show edit/delete buttons, hide save/cancel buttons
        actionBtns.forEach((btn) => (btn.style.display = ""));
        saveCancelBtns.forEach((btn) => (btn.style.display = "none"));
    }

    /**
     * Set current filter for displaying todos
     * Updates active filter button and re-renders
     */
    setFilter(filter) {
        this.currentFilter = filter;

        // Update active filter button
        this.elements.filterBtns.forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.filter === filter) {
                btn.classList.add("active");
            }
        });

        this.render();
    }

    /**
     * Clear all completed todos
     * Removes all todos with completed: true
     */
    clearCompleted() {
        const completedCount = this.todos.filter((t) => t.completed).length;

        if (completedCount === 0) {
            this.showMessage("No completed todos to clear", "info");
            return;
        }

        if (
            confirm(
                `Are you sure you want to delete ${completedCount} completed todo(s)?`
            )
        ) {
            this.todos = this.todos.filter((t) => !t.completed);

            this.saveToStorage();
            this.render();

            this.showMessage(
                `${completedCount} completed todo(s) cleared!`,
                "success"
            );
        }
    }

    /**
     * Filter todos based on current filter
     * Returns filtered array based on completion status
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case "active":
                return this.todos.filter((t) => !t.completed);
            case "completed":
                return this.todos.filter((t) => t.completed);
            default:
                return this.todos;
        }
    }

    /**
     * Render the entire application UI
     * Updates todo list, stats, and empty state
     */
    render() {
        this.renderTodos();
        this.renderStats();
        this.renderEmptyState();
    }

    /**
     * Render all todo items
     * Creates DOM elements for each todo based on current filter
     */
    renderTodos() {
        const filteredTodos = this.getFilteredTodos();

        // Clear existing todos
        this.elements.todosContainer.innerHTML = "";

        // Create and append todo elements
        filteredTodos.forEach((todo) => {
            const todoElement = this.createTodoElement(todo);
            this.elements.todosContainer.appendChild(todoElement);
        });
    }

    /**
     * Create DOM element for a single todo item
     * Returns a complete todo item element with all functionality
     */
    createTodoElement(todo) {
        // Create main container
        const todoDiv = document.createElement("div");
        todoDiv.className = `todo-item ${todo.completed ? "completed" : ""}`;
        todoDiv.dataset.todoId = todo.id;

        // Format timestamp for display
        const createdDate = new Date(todo.createdAt).toLocaleDateString();
        const updatedDate = new Date(todo.updatedAt).toLocaleDateString();
        const timeDisplay =
            createdDate === updatedDate
                ? `Created: ${createdDate}`
                : `Updated: ${updatedDate}`;

        // Create todo HTML structure
        todoDiv.innerHTML = `
            <div class="todo-content">
                <div class="todo-checkbox ${todo.completed ? "checked" : ""}"
                     aria-label="Toggle todo completion"></div>
                <span class="todo-text ${
                    todo.completed ? "completed" : ""
                }">${this.escapeHtml(todo.text)}</span>
                <input type="text" class="todo-edit-input" value="${this.escapeHtml(
                    todo.text
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

        return todoDiv;
    }

    /**
     * Render statistics (todo count)
     * Updates the todo count display
     */
    renderStats() {
        const totalTodos = this.todos.length;
        const activeTodos = this.todos.filter((t) => !t.completed).length;
        const completedTodos = totalTodos - activeTodos;

        let statsText = "";
        switch (this.currentFilter) {
            case "active":
                statsText = `${activeTodos} active item${
                    activeTodos !== 1 ? "s" : ""
                }`;
                break;
            case "completed":
                statsText = `${completedTodos} completed item${
                    completedTodos !== 1 ? "s" : ""
                }`;
                break;
            default:
                statsText = `${totalTodos} total item${
                    totalTodos !== 1 ? "s" : ""
                }`;
        }

        this.elements.todoCount.textContent = statsText;
    }

    /**
     * Show/hide empty state message
     * Displays message when no todos match current filter
     */
    renderEmptyState() {
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.elements.emptyState.classList.remove("hidden");

            // Update empty state message based on filter
            const emptyMessage = this.elements.emptyState.querySelector("p");
            switch (this.currentFilter) {
                case "active":
                    emptyMessage.textContent = "No active todos. Great job!";
                    break;
                case "completed":
                    emptyMessage.textContent = "No completed todos yet.";
                    break;
                default:
                    emptyMessage.textContent =
                        "No todos yet. Add your first task above!";
            }
        } else {
            this.elements.emptyState.classList.add("hidden");
        }
    }

    /**
     * Save todos to localStorage
     * Persists current state for future sessions
     */
    saveToStorage() {
        try {
            const dataToSave = {
                todos: this.todos,
                nextId: this.nextId,
                lastUpdated: new Date().toISOString(),
            };
            localStorage.setItem("todoApp", JSON.stringify(dataToSave));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            this.showMessage("Error saving data", "error");
        }
    }

    /**
     * Load todos from localStorage
     * Restores previous state if available
     */
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem("todoApp");
            if (savedData) {
                const data = JSON.parse(savedData);
                this.todos = data.todos || [];
                this.nextId = data.nextId || 1;

                // Ensure nextId is always higher than existing IDs
                if (this.todos.length > 0) {
                    const maxId = Math.max(...this.todos.map((t) => t.id));
                    this.nextId = Math.max(this.nextId, maxId + 1);
                }
            }
        } catch (error) {
            console.error("Error loading from localStorage:", error);
            this.showMessage("Error loading saved data", "error");
        }
    }

    /**
     * Show temporary message to user
     * Displays success, error, or info messages
     */
    showMessage(message, type = "info") {
        // Create message element
        const messageDiv = document.createElement("div");
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;

        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch (type) {
            case "success":
                messageDiv.style.backgroundColor = "#10b981";
                break;
            case "error":
                messageDiv.style.backgroundColor = "#ef4444";
                break;
            case "info":
                messageDiv.style.backgroundColor = "#3b82f6";
                break;
        }

        // Add to DOM
        document.body.appendChild(messageDiv);

        // Animate in
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "translateX(0)";
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.opacity = "0";
            messageDiv.style.transform = "translateX(100%)";
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Escape HTML to prevent XSS attacks
     * Sanitizes user input before displaying
     */
    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Create new instance of TodoApp
    const app = new TodoApp();

    // Make app available globally for debugging
    window.todoApp = app;

    console.log("Enhanced TODO App initialized successfully!");
});

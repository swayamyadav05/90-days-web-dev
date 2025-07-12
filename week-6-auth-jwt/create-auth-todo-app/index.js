const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const JWT_SECRET_KEY = "your_secret_key";

// In-memory storage
const users = [];
const todos = [];

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});
app.use("/frontend", express.static(__dirname + "/frontend"));

// Register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password required" });
    }
    if (users.some((u) => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: Date.now(), username, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username }, JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// JWT Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: "Token required" });
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Get todos (with filter)
app.get("/todos", authenticateJWT, (req, res) => {
    const { filter } = req.query; // filter: all|active|completed
    let userTodos = todos.filter((todo) => todo.username === req.user.username);
    if (filter === "active") userTodos = userTodos.filter((t) => !t.completed);
    if (filter === "completed")
        userTodos = userTodos.filter((t) => t.completed);
    res.json(userTodos);
});

// Add todo
app.post("/todos", authenticateJWT, (req, res) => {
    const { task } = req.body;
    if (!task || typeof task !== "string" || !task.trim()) {
        return res.status(400).json({ message: "Task is required" });
    }
    const now = new Date().toISOString();
    const newTodo = {
        id: Date.now(),
        task: task.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now,
        username: req.user.username,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Edit todo (task text)
app.put("/todos/:id", authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const todo = todos.find(
        (t) => t.id === id && t.username === req.user.username
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (!task || typeof task !== "string" || !task.trim()) {
        return res.status(400).json({ message: "Task is required" });
    }
    todo.task = task.trim();
    todo.updatedAt = new Date().toISOString();
    res.json(todo);
});

// Toggle complete
app.patch("/todos/:id/toggle", authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(
        (t) => t.id === id && t.username === req.user.username
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    res.json(todo);
});

// Delete todo
app.delete("/todos/:id", authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(
        (t) => t.id === id && t.username === req.user.username
    );
    if (index === -1)
        return res.status(404).json({ message: "Todo not found" });
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
});

// Clear completed
app.delete("/todos", authenticateJWT, (req, res) => {
    let count = 0;
    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].username === req.user.username && todos[i].completed) {
            todos.splice(i, 1);
            count++;
        }
    }
    res.json({ message: `Cleared ${count} completed todo(s)` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

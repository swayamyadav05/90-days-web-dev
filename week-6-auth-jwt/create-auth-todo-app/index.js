const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors()); // Enable CORS   for frontend requests
app.use(express.json()); // Pasre JSON request bodies

const PORT = 3000;
const JWT_SECRECT_KEY = "your_secrect_key";

// In-memory storage
const users = [];
const todos = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});

// Auth Endpoints
// Register a new user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    if (users.some((u) => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users.push({ id: Date.now(), username, password: hashedPassword });
    res.status(201).send("User created successfully");

    console.log(users);
});

// Login a user
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username }, JWT_SECRECT_KEY, {
            expiresIn: "1h",
        }); // Create JWT
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Middleware to Verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).send("Token required");
    jwt.verify(token, JWT_SECRECT_KEY, (err, user) => {
        if (err) return res.status(401).send("Invalid token");
        req.user = user;
        next();
    });
};

// Get user's to-dos
app.get("/todos", authenticateJWT, (req, res) => {
    const userTodos = todos.filter(
        (todo) => todo.username === req.user.username
    );
    res.json(userTodos);
    console.log(todos);
});

// Add a new to-do
app.post("/todos", authenticateJWT, (req, res) => {
    const { task } = req.body;
    const newTodo = { id: Date.now(), task, username: req.user.username };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    console.log(todos);
});

// Edit a to-do
app.put("/todos/:id", authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const todo = todos.find(
        (todo) => todo.id == id && todo.username === req.user.username
    );
    if (todo) {
        todo.task = task;
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

// Delete a to-do
app.delete("/todos/:id", authenticateJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(
        (todo) => todo.id === id && todo.username === req.user.username
    );
    if (index !== -1) {
        todos.splice(index, 1);
        res.send("Todo deleted");
    } else {
        res.status(404).send("Todo not found");
    }
    console.log(todos);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(cors());

const todos = [
    {
        id: 1,
        description: "Go to gym",
        completed: false,
    },
    {
        id: 2,
        description: "Create todo app using express",
        completed: true,
    },
];

// route handlers
app.get("/", function (req, res) {
    res.send("Todo List Home Page");
});

app.get("/todos", function (req, res) {
    res.json(todos);
});

app.get("/todos/:id", function (req, res) {
    console.log(req.params.id);
    let todo = todos.filter((todo) => todo.id == req.params.id);
    res.json(todo);
});

app.post("/todos", function (req, res) {
    let body = req.body;
    console.log(body);
    todos.push({ id: uuid.v4(), ...body });
    res.json(todos);
});

app.put("/todos/:id", function (req, res) {
    let todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        todo.description = req.body.description;
        todo.completed = req.body.completed;
        res.json(todos);
    } else {
        res.send("Todo with given id doesn't exits!");
    }
});

app.delete("/todos/:id", function (req, res) {
    let index = todos.findIndex((todo) => todo.id == req.params.id);
    console.log(index);
    todos.splice(index, 1);
    res.json(todos);
});

app.listen(port, () => {
    console.log("App listening in PORT:", port);
}); // which port to run on

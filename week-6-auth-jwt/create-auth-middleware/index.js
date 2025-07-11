const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "shshshshiiijjjisjsijs";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/sign-up", logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password,
    });

    res.json({
        message: "You are succeffully signed up",
    });

    console.log(users);
});

app.post("/sign-in", logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRECT
        );

        res.json({
            token: token,
        });

        console.log(users);
    } else {
        res.json({
            message: "Invalide username or password",
        });
    }
});

function auth(req, res, next) {
    const token = req.headers.token;
    const decodeedData = jwt.verify(token, JWT_SECRECT);

    if (decodeedData.username) {
        req.username = decodeedData.username;
        next();
    } else {
        res.json({
            message: "You are not logged in",
        });
    }
}

app.get("/me", logger, auth, (req, res) => {
    const user = users.find((user) => user.username === req.username);
    res.json({
        username: user.username,
        password: user.password,
    });
});

app.listen(3000);

require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");
const { auth, JWT_SECRET_KEY } = require("./auth");

mongoose.connect(process.env.MONGO_URI);
console.log("Connected to mongoose");

const app = express();

app.use(express.json());

app.post("/sign-up", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name,
    });

    res.json({
        message: "You are signed up",
    });
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(user);

    if (user && passwordMatch) {
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
            JWT_SECRET_KEY
        );

        res.json({
            token: token,
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials",
        });
    }
});

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done,
    });

    res.json({
        message: "Todo created",
    });
});

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.findOne({
        userId,
    });

    res.json({
        todos,
    });
});

app.listen(3000);

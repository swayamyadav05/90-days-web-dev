require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");
const { auth, JWT_SECRET_KEY } = require("./auth");
const { z } = require("zod");

mongoose.connect(process.env.MONGO_URI);
console.log("Connected to mongoose");

const app = express();

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(statusCode).json({ error: message });
});

app.post("/sign-up", async (req, res, next) => {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            name: z.string().min(3).max(100),
            password: z.string().min(3).max(30),
        });

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            res.json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error,
            });
            return;
        }

        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        next(error);
    }
});

app.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        res.json({ message: "Login successful", token });
    } catch (err) {
        next(err);
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

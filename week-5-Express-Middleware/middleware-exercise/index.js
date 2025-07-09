const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// This is own middleware. But there are some commonly used middlewares which we can import and use.

// logs the method, timestamp and the url

// function middleware(req, res, next) {
//     const method = req.method;
//     const url = req.originalUrl;

//     console.log(`Method is ${method}`);
//     console.log(`URL is ${url}`);
//     console.log(new Date());

//     next();
// }

app.use(express.json());

app.post("/sum", function (req, res) {
    console.log(req.body);
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b,
    });
});

app.get("/substract", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a - b,
    });
});

app.get("/multiply", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a * b,
    });
});

app.get("/divide", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a - b,
    });
});

app.listen(3000);

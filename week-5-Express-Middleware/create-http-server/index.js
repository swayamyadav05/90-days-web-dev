const express = require("express");

const app = express();
const PORT = 3000;

let requestCount = 0;

function requestIncreaser(req, res, next) {
    requestCount++;
    console.log("Total number of request = " + requestCount);
    next();
}

function realSumHandler(req, res) {
    // main logic
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b,
    });
}

// Always rerun after modifying and saving the file when using 'node index.js' to run

// better routing, add database, middlewares
app.get("/sum/:a/:b", requestIncreaser, realSumHandler);

app.get("/multiply/:a/:b", function (req, res) {
    requestIncreaser();

    // main logic
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a * b,
    });
});

app.get("/subtract/:a/:b", function (req, res) {
    requestIncreaser();

    // main logic
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a - b,
    });
});

app.get("/divide/:a/:b", function (req, res) {
    requestIncreaser();

    // main logic
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a / b,
    });
});

app.listen(PORT);

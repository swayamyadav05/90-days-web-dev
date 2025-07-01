const fs = require("fs");

function print(err, data) {
    if (err) {
        console.error("Error reading file: ", err);
    } else {
        console.log("File content: ", data);
    }
}

const content1 = fs.readFile("./a.txt", "utf-8", print);

const content2 = fs.readFile("./b.txt", "utf-8", print);

console.log("Data!");

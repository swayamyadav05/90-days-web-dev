const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

// Promisified version of reading file using fs
function readFileAsync(path, option = "utf-8") {
    return new Promise((resolve, rejects) => {
        fs.readFile(path, option, (err, data) => {
            if (err) rejects(err);
            else resolve(data);
        });
    });
}

// Promisified version of writing file using fs
function writeFileAsync(path, data, option = "utf-8") {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path, data, option, (err) => {
            if (err) rejects(err);
            else resolve("File written successfully");
        });
    });
}

// Promisified version of trimming the content of a file and writing it back to file
async function trimFileContentAsync(path) {
    try {
        const data = await readFileAsync(path);
        const trimmedData = data.trim();
        await writeFileAsync(path, trimmedData);
        console.log("File content trimmed and written back successfully.");
    } catch (err) {
        console.error("Error during file trimming:", err);
    }
}

trimFileContentAsync("./a.txt")
    .then(() => {
        console.log("Trimming completed.");
    })
    .catch((err) => {
        console.error("Error in trimming file:", err);
    });

// readFileAsync("./a.txt")
//     .then((data) => {
//         console.log("Content of a.txt:", data);
//     })
//     .catch((err) => {
//         console.error("Error reading file:", err);
//     });

// writeFileAsync("./b.txt", "Hello, World")
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((err) => {
//         console.error("Error writing file:", err);
//     });

// readFileAsync("./b.txt")
//     .then((data) => {
//         console.log("Content of b.txt:", data);
//     })
//     .catch((err) => {
//         console.error("Error reading b.txt:", err);
//     });

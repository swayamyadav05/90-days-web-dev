// File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");

function readFileAsync(path, option = "utf-8") {
    return new Promise((resolve, rejects) => {
        fs.readFile(path, option, (err, data) => {
            if (err) rejects(err);
            else resolve(data);
        });
    });
}

function writeFileAsync(path, data, option = "utf-8") {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path, data, option, (err) => {
            if (err) rejects;
            else resolve("Succesfully written to a file!");
        });
    });
}

async function fileCleaner(path) {
    try {
        const data = await readFileAsync(path);
        const cleanedData = data.replace(/\s+/g, " ").trim();
        console.log("Data: ", cleanedData);
        await writeFileAsync(path, cleanedData);
        console.log("File content cleaned and written back succesfully.");
        const newData = await readFileAsync(path);
        console.log("Cleaned Data:", newData);
    } catch (err) {
        console.error("Error duing file trimming:", err);
    }
}

const filePath = path.join(__dirname, "./test.txt");

fileCleaner(filePath)
    .then(() => {
        console.log("Cleaning completed.");
    })
    .catch((err) => {
        console.error("Error in cleaning file:", err);
    });

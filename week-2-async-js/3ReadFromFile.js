// Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

const path = require("path");

const fs = require("fs").promises;

async function readFileAndDoExpensiveWork() {
    try {
        const filePath = path.join(__dirname, "a.txt");
        // Start reading file
        const filePromise = fs.readFile(filePath, "utf-8");

        console.log("Starting expensive operation..");

        // Expensive synchronous operation
        let sum = 0;
        for (let i = 0; i <= 1e9; i++) {
            sum += i;
        }

        console.log("Expensive operation ends!", sum);

        // Await file reading result (only executes after loop finishes.)
        const data = await filePromise;
        console.log("File content:", data);
    } catch (err) {
        console.log("Error:", err);
    }
}

readFileAndDoExpensiveWork();

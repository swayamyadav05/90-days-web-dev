// Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs").promises;
const path = require("path");

async function writeToFile() {
    const filePath = path.join(__dirname, "b.txt");
    const message = "Hey writing to file b.txt";

    await fs.writeFile(filePath, message, "utf-8");
    const data = await fs.readFile(filePath, "utf-8");

    console.log("Content from b.txt:", data);
}

writeToFile();

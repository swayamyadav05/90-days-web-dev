const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
    .name("count")
    .description("CLI to some JavaScript string utilities")
    .version("0.8.0");

program
    .command("count")
    .description("counts the number of lines in a file")
    .argument("<file>", "string to split")
    .action((file) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const lines = data.split("\n").length;
                console.log(`There are ${lines} lies in ${file}`);
            }
        });
    });

program.parse();

const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "randomSwayamKeyToJwt";

const app = express();
app.use(express.json());

// Global in memory location
const users = [];
// it stores
/*
    [{
        username: "swayam", password: "passsssswooorrrrrdd", token: "some_token"
    }]

*/

// function genereateToken() {
//     let options = [
//         "a",
//         "b",
//         "c",
//         "d",
//         "e",
//         "f",
//         "g",
//         "h",
//         "i",
//         "j",
//         "k",
//         "l",
//         "m",
//         "n",
//         "o",
//         "p",
//         "q",
//         "r",
//         "s",
//         "t",
//         "u",
//         "v",
//         "w",
//         "x",
//         "y",
//         "z",
//         "A",
//         "B",
//         "C",
//         "D",
//         "E",
//         "F",
//         "G",
//         "H",
//         "I",
//         "J",
//         "K",
//         "L",
//         "M",
//         "N",
//         "O",
//         "P",
//         "Q",
//         "R",
//         "S",
//         "T",
//         "U",
//         "V",
//         "W",
//         "X",
//         "Y",
//         "Z",
//         "0",
//         "1",
//         "2",
//         "3",
//         "4",
//         "5",
//         "6",
//         "7",
//         "8",
//         "9",
//     ];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

app.post("/sign-up", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // if (users.find((u) => u.username === username)) {
    //     res.json({
    //         message: "You are already signed up",
    //     });
    // }

    users.push({
        username: username,
        password: password,
    });

    res.json({
        message: "You are signed up",
    });
    console.log(users);
});

app.post("/sign-in", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRECT
        );

        // user.token = token;      // We don't need to store the token in database, becasue jwt is stateless

        res.send({
            token,
        });
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invcalid username or psasword",
        });
    }
    console.log(users);
});

app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const decodedInformation = jwt.verify(token, JWT_SECRECT);
    const username = decodedInformation.username;

    let user = users.find((user) => user.username === username);

    if (user) {
        res.json({
            username: user.username,
            password: user.password,
        });
    } else {
        res.json({
            message: "token invalid",
        });
    }
});

app.listen(3000);

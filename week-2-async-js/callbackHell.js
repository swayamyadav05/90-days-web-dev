/*
log 'hi' after 1 second
then log 'hello' after 'hi' is logged and after 3 second
then log 'world' after 'hello' is logged and after 5 second
*/

// // Has callback hell
// setTimeout(function () {
//     console.log("hi");
//     setTimeout(function () {
//         console.log("hello");
//         setTimeout(function () {
//             console.log("world");
//         }, 5000);
//     }, 3000);
// }, 1000);

// // Alt solution, dosen't really have callback hell
// function step3Done() {
//     console.log("world");
// }
// function step2Done() {
//     console.log("hello");
//     setTimeout(step3Done, 5000);
// }
// function step1Done() {
//     console.log("hi");
//     setTimeout(step2Done, 3000);
// }

// setTimeout(step1Done, 1000);

// Promisified version
function setTimeoutPromisified(duration) {
    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
}

// Promise chaining
setTimeoutPromisified(1000)
    .then(function () {
        console.log("hi");
        return setTimeoutPromisified(3000);
    })
    .then(function () {
        console.log("hello");
        return setTimeoutPromisified(5000);
    })
    .then(function () {
        console.log("world");
    });


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
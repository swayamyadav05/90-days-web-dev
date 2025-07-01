/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
    const startTime = new Date(); // Start time

    let sum = 0;
    for (let i = 1; i < n; i++) {
        sum += i;
    }

    // const sum = (n * (n + 1)) / 2;   // here I am practicing performance measurement, so stick to the loop to see how the time increases as n grows.
    // console.log(sum);

    const endTime = new Date(); //End time
    const timeTaken = (endTime - startTime) / 1000;

    return timeTaken;
}

console.log("Time for 1 to 100:", calculateTime(100), "seconds");
console.log("Time for 1 to 100000:", calculateTime(100000), "seconds");
console.log("Time for 1 to 1000000000:", calculateTime(1000000000), "seconds");

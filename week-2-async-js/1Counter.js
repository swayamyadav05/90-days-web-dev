let count = 0;
const intervalId = setInterval(() => {
    console.clear();
    count += 1;
    console.log(`Count: ${count}`);
}, 1000);

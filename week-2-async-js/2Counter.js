// Without setInterval
let count = 0;

function counter() {
    setTimeout(() => {
        console.clear();
        count += 1;
        console.log(`Count: ${count}`);
        counter();
    }, 1000);
}

counter();

function random(resolve) {
    setTimeout(resolve, 3000); // Simulate a delay of 3 seconds
}

let p = new Promise(random);

console.log(p);

function callback() {
    console.log("Callback executed");
}

p.then(callback);

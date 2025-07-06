console.log("This is from client");

let backendData = fetch("http://localhost:3000/todos");

backendData
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    .finally(() => console.log("This is from the finally"));

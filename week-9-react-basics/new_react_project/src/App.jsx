// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

// function App() {
//   let [counterVisible, setCounterVisible] = useState(true);

//   useEffect(() => {
//     setInterval(() => {
//       setCounterVisible((value) => !value);
//     }, 5000);
//   }, []);

//   return <>{counterVisible ? <Counter></Counter> : null}</>;
// }

// // mounting, re-rendering, unmounting
// function Counter() {
//   const [count, setCount] = useState(0);

//   console.log("Inside counter component");
//   // hooking into the lifecycle events of react

//   // guard our setInterval from re-renders
//   useEffect(() => {
//     console.log("mounted");
//     let clock = setInterval(() => {
//       setCount((count) => count + 1);
//     }, 1000);

//     return () => {
//       console.log("unmouted");
//       clearInterval(clock);
//     };
//   }, []);

//   return (
//     <div>
//       <h1 id="text">{count}</h1>
//     </div>
//   );
// }

// export default App;

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function increase() {
    setCount1((c) => c + 1);
  }

  function decrease() {
    setCount2((c) => c - 1);
  }

  return (
    <>
      Hi there
      <Counter count1={count1} count2={count2} />
      <button onClick={increase}>Increase Count</button>
      <button onClick={decrease}>Decrease Count</button>
    </>
  );
}

function Counter(props) {
  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    console.log("count has changed");

    return function () {
      console.log("Cleanup inside second effect(with dependencies)");
    };
  }, [props.count1]);

  return (
    <>
      <div>Counter 1: {props.count1}</div>
      <div>Counter 2: {props.count2}</div>
    </>
  );
}

export default App;

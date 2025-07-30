import "./App.css";
import Card from "./components/Card";

function App() {
  const myobj = {
    username: "swayam",
    age: 21,
  };

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind Css Test
      </h1>
      <Card username="Swayam" someObje={myobj} />
      {/* <Card /> */}
    </>
  );
}

export default App;

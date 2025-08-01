// import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";

const Github = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("https://api.github.com/users/swayamyadav05")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       });
  //   }, []);

  // React-router has a Loader feature which can fetch the api in optimized way. It calls it even before useEffect()

  const data = useLoaderData();
  return (
    <div className="bg-gray-900 text-white p-4 text-xl md:text-3xl flex flex-col items-center min-h-[400px] justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">GitHub Profile</h2>
        <img 
          src={data.avatar_url} 
          alt={`${data.name || data.login} Profile Picture`} 
          width={300} 
          className="rounded-full mx-auto shadow-lg"
        />
        <div className="space-y-2">
          <p className="text-lg md:text-xl">
            <span className="font-semibold">Name:</span> {data.name || data.login}
          </p>
          <p className="text-lg md:text-xl">
            <span className="font-semibold">Followers:</span> {data.followers}
          </p>
          <p className="text-lg md:text-xl">
            <span className="font-semibold">Public Repos:</span> {data.public_repos}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Github;

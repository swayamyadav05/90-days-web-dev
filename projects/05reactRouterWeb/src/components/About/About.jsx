import React from "react";

const About = () => {
  return (
    // ... existing code ...
    <div className="py-16 bg-gray-900 text-white">
      <div className="container m-auto px-6 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-5/12">
            <img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="team collaboration"
              className="rounded-xl shadow-xl"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Crafted by{" "}
              <span className="text-teal-400">
                Passionate Developers
              </span>
            </h2>
            <p className="mt-6 text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Eum omnis voluptatem accusantium nemo perspiciatis
              delectus atque autem! Voluptatum tenetur beatae unde
              aperiam, repellat expedita consequatur! Officiis id
              consequatur atque doloremque!
            </p>
            <p className="mt-4 text-gray-300">
              Nobis minus voluptatibus pariatur dignissimos libero
              quaerat iure expedita at? Asperiores nemo possimus
              nesciunt dicta veniam aspernatur quam mollitia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

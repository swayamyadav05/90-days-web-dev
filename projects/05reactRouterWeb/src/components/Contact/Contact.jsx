import React from "react";

const Contact = () => {
  return (
    // ... existing code ...
    <div className="relative flex items-top justify-center min-h-[700px] bg-gray-900 sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 mr-2 bg-gray-800 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Get in touch
              </h1>
              <p className="text-normal text-lg sm:text-xl font-medium text-gray-400 mt-2">
                Fill in the form to start a conversation
              </p>

              {/* Contact info - changed text colors */}
              <div className="flex items-center mt-8 text-gray-400">
                {/* Icon */}
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  Acme Inc, Street, State, Postal Code
                </div>
              </div>

              {/* Other contact info with same color change */}
            </div>

            <form className="p-6 flex flex-col justify-center bg-gray-800 rounded-lg">
              <div className="flex flex-col">
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-white font-semibold focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-white font-semibold focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-4">
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Telephone Number"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-white font-semibold focus:border-teal-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="md:w-32 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

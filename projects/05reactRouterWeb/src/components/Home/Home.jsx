import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mx-auto w-full bg-gray-900">
      <aside className="relative overflow-hidden rounded-xl sm:mx-16 mx-2 sm:py-16 min-h-[80vh] flex items-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="abstract background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 w-full ">
          <div className="max-w-xl space-y-8 text-left">
            <h2 className="text-4xl font-bold sm:text-5xl text-white">
              Elevate Your Digital Experience
              <span className="block mt-4 text-3xl font-light text-teal-300">
                Premium Solutions for Modern Needs
              </span>
            </h2>

            <p className="text-lg text-gray-300 max-w-md">
              Discover cutting-edge tools designed to transform your
              workflow and boost productivity.
            </p>

            <Link
              className="inline-flex items-center px-6 py-3 font-medium bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-white mt-6"
              to="/">
              <svg
                fill="currentColor"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd">
                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
              </svg>
              &nbsp; Get Started
            </Link>
          </div>
        </div>

        {/* Floating device image */}
        <div className="absolute right-10 bottom-10 hidden lg:block">
          <img
            className="w-64 rounded-xl shadow-2xl transform rotate-6 border-4 border-gray-800"
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="tech device"
          />
        </div>
      </aside>

      <div className="grid place-items-center sm:mt-20 mt-10">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            Powerful Features,{" "}
            <span className="text-teal-400">
              Simplified Experience
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Optimized performance for seamless workflows and
                instant results.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Secure by Design
              </h3>
              <p className="text-gray-400">
                Enterprise-grade security protecting your data at all
                times.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Always Available
              </h3>
              <p className="text-gray-400">
                99.9% uptime guarantee with global infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-900/30 to-gray-900/50 border border-teal-500/20 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-gray-300 mb-6">
                Join thousands of professionals who have
                revolutionized their productivity.
              </p>
              <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors">
                Get Started Today
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                className="w-64 rounded-xl shadow-xl transform -rotate-3"
                src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

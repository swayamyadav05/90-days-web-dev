import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow sticky z-50 top-0 bg-gray-900">
      <nav className="border-gray-800 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12 invert"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="#"
              className="text-gray-300 hover:text-white transition-colors font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
              Log in
            </Link>
            <Link
              to="#"
              className="text-white bg-teal-600 hover:bg-teal-700 transition-colors font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
              Get started
            </Link>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 
                    ${
                      isActive ? "text-white" : "text-gray-400"
                    } hover:text-white text-gray-400`
                  }
                  to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 
                    ${
                      isActive ? "text-white" : "text-gray-400"
                    } hover:text-white text-gray-400`
                  }
                  to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 
                    ${
                      isActive ? "text-white" : "text-gray-400"
                    } hover:text-white text-gray-400`
                  }
                  to="/contact">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 
                    ${
                      isActive ? "text-white" : "text-gray-400"
                    } hover:text-white text-gray-400`
                  }
                  to="/github">
                  Github
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // ... existing code ...
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                className="mr-3 h-16 invert"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Resources
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/swayamyadav05"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noreferrer">
                    Github
                  </a>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Legal
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    to="#"
                    className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-800 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025
            <a
              href="https://github.com/swayamyadav05"
              className="hover:underline ml-1">
              swayamyadav05
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* Social icons - changed colors */}
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors">
              {/* Facebook icon */}
            </Link>
            {/* Other icons with same color change */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

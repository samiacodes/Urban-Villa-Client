import { Link } from "react-router";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Logo color="text-white" />
          <p className="text-sm text-gray-300">
            Providing reliable real estate service since 1992.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/apertment"
                className="hover:underline hover:text-white"
              >
                Apartments
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline hover:text-white">
                About Building
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-6 text-white text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

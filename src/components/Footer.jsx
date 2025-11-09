import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2 w-full mt-auto text-xs">
      <div className="max-w-4xl mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-center sm:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-base font-semibold mb-1">Stock Calculator</h2>
            <p className="text-xs text-gray-400">
              Simplifying stock calculations for smart investments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-base font-semibold mb-1">Quick Links</h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-400 hover:text-white transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h2 className="text-base font-semibold mb-1">Connect With Us</h2>
            <p className="text-xs text-gray-400 mb-1">
              Email:{" "}
              <a
                href="mailto:support@stockcalculator.com"
                className="underline"
              >
                support@stockcalculator.com
              </a>
            </p>
            <div className="flex justify-center sm:justify-start space-x-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-base"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-base"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-base"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition text-base"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-3 pt-2 text-center text-[10px] text-gray-500">
          © {new Date().getFullYear()} Stock Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

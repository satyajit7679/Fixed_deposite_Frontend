import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3001/sign-up", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { path: "/Home", name: "Home" },
    { path: "/FixedDepositPage", name: "Fixed Deposit" },
    { path: "/FDPortfolio", name: "Portfolio" },
    { path: "/Contact", name: "Contact" },
  ];

  const profileLinks = [
    { path: "/FDPortfolio", name: "Dashboard" },
    { path: "/MyProfile", name: "My Profile" },
    { path: "/settings", name: "Account Settings" },
    { path: "/Contact", name: "Help & Support" },
  ];

  return (
    <header
      className={`w-full text-blue-gray-900 dark:text-gray-200 py-3 px-6 fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 shadow-lg backdrop-blur-sm bg-opacity-90"
          : "bg-gradient-to-r from-green-600 via-purple-600 to-blue-600"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/Home">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <span className="bg-white text-indigo-600 px-2 py-1 rounded-lg mr-2">
                DHEERA
              </span>
              <span className="text-white">ONE</span>
            </h1>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className="text-white hover:text-yellow-200 font-medium relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={24} />
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <Avatar
                src={user?.avatar || "https://i.pinimg.com/736x/09/24/a7/0924a7ef295741e916c8f42512bbe5bd.jpg"}
                alt="User Avatar"
                size="sm"
                className="border-2 border-white"
              />
              {user?.name && (
                <Typography className="hidden md:block font-medium text-white">
                  {user.name}
                </Typography>
              )}
              {profileOpen ? (
                <ChevronUp className="text-white" />
              ) : (
                <ChevronDown className="text-white" />
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 border border-gray-200 shadow-xl rounded-md z-50 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <img
                    src={user?.avatar || "https://i.pinimg.com/736x/09/24/a7/0924a7ef295741e916c8f42512bbe5bd.jpg"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-indigo-800">
                      {user?.name || "Guest User"}
                    </h4>
                    <p className="text-xs text-indigo-600">{user?.email}</p>
                  </div>
                </div>
                <div className="py-2">
                  {profileLinks.map((link) => (
                    <div key={link.path}>
                      <Link
                        to={link.path}
                        className="block px-4 py-3 hover:bg-indigo-50 text-indigo-700 font-medium transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className="block py-2 text-indigo-800 font-medium hover:text-indigo-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md px-6 py-3">
          <div className="container mx-auto flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-b-2 border-indigo-300 focus:border-indigo-600 outline-none py-2 px-3 text-gray-700 transition-colors duration-300"
            />
            <button className="ml-2 text-indigo-600">
              <Search size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
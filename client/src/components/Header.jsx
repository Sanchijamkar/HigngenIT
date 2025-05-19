import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import logo from "./logo.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  // Retrieve the user's name from localStorage
  const userName = localStorage.getItem("userName");

  // Course Categories
  const courseCategories = [
    { name: "Frontend", path: "/courses/frontend" },
    { name: "Backend", path: "/courses/backend" },
    { name: "Fullstack", path: "/courses/fullstack" },
    { name: "React", path: "/courses/react" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signOutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const signOutAdmin = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-full mx-auto flex justify-between items-center px-6 py-3 relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="HighGenIT Logo" className="h-12" />
          <Link to="/" className="text-xl font-bold text-gray-800">HighGenIT</Link>
        </div>

        {/* Hamburger (mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="focus:outline-none"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>

          {/* Courses dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="hover:text-blue-600"
              aria-expanded={dropdownOpen ? "true" : "false"}
              aria-controls="courses-dropdown"
            >
              Courses
            </button>
            {dropdownOpen && (
              <div id="courses-dropdown" className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
                {courseCategories.map((course) => (
                  <Link
                    key={course.path}
                    to={course.path}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User and Admin auth links */}
          {userToken ? (
            <>
              <span className="text-gray-800 font-semibold">{userName}</span> {/* Display user's name */}
              <Link to="/profile" className="hover:text-blue-600">Profile</Link>
              <button onClick={signOutUser} className="hover:text-red-600">Sign Out</button>
            </>
          ) : (
            <Link to="/sign-in" className="hover:text-blue-600">User Sign In</Link>
          )}

          {adminToken ? (
            <>
              <Link to="/admin" className="hover:text-blue-600 font-semibold">Admin Panel</Link>
              <button onClick={signOutAdmin} className="hover:text-red-600">Admin Sign Out</button>
            </>
          ) : (
            <Link to="/admin-signin" className="hover:text-blue-600">Admin Sign In</Link>
          )}
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="lg:hidden absolute top-full left-0 w-full bg-white shadow z-30 p-4">
            <Link to="/" className="block py-2">Home</Link>
            <Link to="/about" className="block py-2">About</Link>
            <Link to="/contact" className="block py-2">Contact</Link>

            <div className="py-2 border-t">
              <p className="font-semibold">Courses</p>
              {courseCategories.map((course) => (
                <Link
                  key={course.path}
                  to={course.path}
                  className="block pl-4 py-1"
                >
                  {course.name}
                </Link>
              ))}
            </div>

            <div className="py-2 border-t">
              {userToken ? (
                <>
                  <Link to="/profile" className="block py-2">Profile</Link>
                  <button onClick={signOutUser} className="block py-2 text-red-600 text-left">Sign Out</button>
                </>
              ) : (
                <Link to="/sign-in" className="block py-2">User Sign In</Link>
              )}

              {adminToken ? (
                <>
                  <Link to="/admin" className="block py-2">Admin Panel</Link>
                  <button onClick={signOutAdmin} className="block py-2 text-red-600 text-left">Admin Sign Out</button>
                </>
              ) : (
                <Link to="/admin-signin" className="block py-2">Admin Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
 
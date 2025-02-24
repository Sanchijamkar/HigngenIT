import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from "./logo.png";
import { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef for outside click detection

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux store
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-full mx-auto py-2 px-9">
        {/* Left Section: Logo and Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="EduCode Logo" className="h-16" /> {/* Increased size */}
          <Link to='/'>
            <h1 className='font-bold text-2xl'>EduCode</h1> {/* Increased size */}
          </Link>
        </div>

        {/* Right Section: Navigation Links */}
        <ul className='flex gap-4 items-center'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <li>
            <Link to="/collections">Collections</Link>
          </li>
          <li>
            <Link to="/questions">Feedbacks</Link>
          </li>
          <li className="relative">
            {/* Dropdown for Courses */}
            <button onClick={toggleDropdown} className="focus:outline-none">
              Courses
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <Link
                  to="/courses/c"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)} // Close on click
                >
                  C
                </Link>
                <Link
                  to="/courses/cpp"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)} // Close on click
                >
                  C++
                </Link>
                <Link
                  to="/courses/java"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)} // Close on click
                >
                  Java
                </Link>
                <Link
                  to="/courses/python"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)} // Close on click
                >
                  Python
                </Link>
              </div>
            )}
          </li>

          

          {/* Conditional rendering for the profile picture */}
          {currentUser ? (
            <li>
              <Link to={currentUser.isAdmin ? '/admin-profile' : '/profile'}>
                <img
                  src={currentUser.profilePicture}
                  alt='profile'
                  className='h-8 w-8 rounded-full object-cover'
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/sign-in'>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

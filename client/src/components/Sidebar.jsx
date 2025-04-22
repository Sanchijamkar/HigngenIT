import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  // Don't show the sidebar if no user is logged in
  if (!currentUser) return null;

  return (
    <div className="mt-20 sidebar w-64 h-full bg-gray-800 text-white fixed top-0 left-0">
      <h2 className="text-2xl font-bold p-4">
        {currentUser.isAdmin ? 'Admin Menu' : 'User Menu'}
      </h2>
      <ul className="p-4">
        
        {/* Admin Links */}
        {currentUser.isAdmin && (
          <>
            <li className="mb-4">
              <Link to="/admin-profile" className="hover:text-gray-300">
                Admin Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/manage-users" className="hover:text-gray-300">
                Manage Users
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/exam" className="hover:text-gray-300">
                Exam Management
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/vfeed" className="hover:text-gray-300">
                User Feedbacks
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/add-course" className="hover:text-gray-300">
                Add Courses
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/manage-courses" className="hover:text-gray-300">
                Manage Courses
              </Link>
            </li>
          </>
        )}

        {/* Regular User Links */}
        {!currentUser.isAdmin && (
          <>
            <li className="mb-4">
              <Link to="/profile" className="hover:text-gray-300">
                My Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/feed" className="hover:text-gray-300">
                Feedback
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/quicknote" className="hover:text-gray-300">
                Add Notes
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

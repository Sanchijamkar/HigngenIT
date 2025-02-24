import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ adminOnly = false }) {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();

  // Protect against non-logged-in users
  if (!currentUser) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  // Handle admin-only route protection
  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/profile" state={{ from: location }} />;
  }

  // If the user is logged in and has the correct role, render the requested route
  return <Outlet />;
}

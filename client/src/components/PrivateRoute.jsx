import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute({ adminOnly = false }) {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  if (!currentUser) {
    // If user is not logged in, redirect to admin sign-in page
    return <Navigate to="/admin/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && !currentUser.isAdmin) {
    // If user is not an admin, redirect to their profile page
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  // If the user is authenticated and is an admin (if required), show the protected page
  return <Outlet />;
}

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import Sidebar from '../components/Sidebar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const steps = ['/profile', '/quicknote', '/feed'];
  const currentIndex = steps.indexOf(window.location.pathname);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:5001/api/user/users/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message || 'Delete failed'));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/signin');
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('http://localhost:5001/api/auth/signout');
      dispatch(signOut());
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 flex justify-center items-start">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Web Banner"
            className="w-full h-40 object-contain mb-6 rounded-md"
          />

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Profile</h2>

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">{currentUser?.username}</h3>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>

          {/* Removed form to update username and email */}

          <div className="flex justify-between mt-6 text-sm font-semibold">
            <button onClick={handleDeleteAccount} className="text-red-600 hover:underline">
              Delete Account
            </button>
            <button onClick={handleSignOut} className="text-gray-700 hover:underline">
              Sign Out
            </button>
          </div>

          

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentIndex <= 0}
              className={`flex items-center px-4 py-2 rounded-md text-white ${
                currentIndex <= 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-800'
              }`}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= steps.length - 1}
              className={`flex items-center px-4 py-2 rounded-md text-white ${
                currentIndex >= steps.length - 1
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

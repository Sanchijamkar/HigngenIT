import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import Sidebar from '../components/Sidebar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // For arrow icons

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.username && formData.username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters long';
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/signin');
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  // Function to navigate to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to navigate to the next page
  const handleNext = () => {
    navigate('/next-page'); // Replace '/next-page' with the actual next page route
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Profile</h2>

          <div className="flex flex-col items-center mb-6">
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-slate-300"
            />
            <p className="text-xl font-semibold">{currentUser.username}</p>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="username"
              placeholder="Update Username"
              className="w-full p-3 bg-gray-100 rounded-md"
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}

            <input
              type="email"
              id="email"
              placeholder="Update Email"
              className="w-full p-3 bg-gray-100 rounded-md"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Update Password"
                className="w-full p-3 bg-gray-100 rounded-md"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-sm text-blue-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <div className="flex justify-between mt-6 text-sm text-red-600 font-semibold">
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">Something went wrong!</p>}
          {updateSuccess && <p className="text-green-600 text-center mt-4">Profile updated successfully!</p>}

          {/* Back and Next buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

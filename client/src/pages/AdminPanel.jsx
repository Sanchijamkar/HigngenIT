// AdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/signin");
        return;
      }

      const response = await axios.get("http://localhost:5001/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditedData(user);
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(`http://localhost:5001/api/admin/users/${id}`, editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(user => user._id === id ? res.data : user));
      setEditUserId(null);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5001/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard - User Management</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <table className="w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-purple-600 text-white uppercase">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Qualification</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Training Mode</th>
              <th className="px-4 py-2">Enrolled Courses</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b hover:bg-purple-50">
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="name" value={editedData.name} onChange={handleEditChange} className="border px-2" />
                  ) : user.name}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="email" value={editedData.email} onChange={handleEditChange} className="border px-2" />
                  ) : user.email}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="phone" value={editedData.phone} onChange={handleEditChange} className="border px-2" />
                  ) : user.phone}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="gender" value={editedData.gender} onChange={handleEditChange} className="border px-2" />
                  ) : user.gender}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="address" value={editedData.address} onChange={handleEditChange} className="border px-2" />
                  ) : user.address}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="qualification" value={editedData.qualification} onChange={handleEditChange} className="border px-2" />
                  ) : user.qualification}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="course" value={editedData.course} onChange={handleEditChange} className="border px-2" />
                  ) : user.course}
                </td>
                <td className="px-4 py-2">
                  {editUserId === user._id ? (
                    <input name="trainingMode" value={editedData.trainingMode} onChange={handleEditChange} className="border px-2" />
                  ) : user.trainingMode}
                </td>
                <td className="px-4 py-2">
                  {user.enrolledCourses?.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {user.enrolledCourses.map(course => (
                        <li key={course._id}>{course.title}</li>
                      ))}
                    </ul>
                  ) : 'None'}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editUserId === user._id ? (
                    <button onClick={() => handleSave(user._id)} className="text-green-500 hover:underline">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(user)} className="text-blue-500 hover:underline">Edit</button>
                  )}
                  <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/signin');
            }}
            className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

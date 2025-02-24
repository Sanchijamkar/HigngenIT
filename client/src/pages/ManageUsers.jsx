import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../components/logo.png'; // Import your logo

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // to include cookies if necessary
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete user
  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Function to generate a PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo to the header (ensure your logo is properly imported)
    doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Add title and some information
    doc.setFontSize(18);
    doc.text('EduCode Registered Users Report', 50, 20);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 50, 30);
    doc.text('Total Users: ' + users.length, 50, 35);
    doc.text('EduCode - Your learning platform for coding', 50, 40);

    // Add a table
    const tableColumn = ['Username', 'Email', 'Role'];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [
        user.username,
        user.email,
        user.isAdmin ? 'Admin' : 'User',
      ];
      tableRows.push(userData);
    });

    doc.autoTable({
      startY: 50, // Position the table below the header
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', // Professional look with grid lines
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Save the generated PDF
    doc.save('users_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Profile Picture</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.isAdmin ? 'Admin' : 'User'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate PDF Button centered below the table */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Generate PDF Report
        </button>
      </div>
    </div>
  );
}

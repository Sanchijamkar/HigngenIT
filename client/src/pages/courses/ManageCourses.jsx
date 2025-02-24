import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../components/logo.png'; // Import your logo

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Handle deletion of a course with confirmation
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses(courses.filter(course => course._id !== id)); // Remove deleted course from list
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Filter and search logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === 'All' || course.language === filterLanguage;
    return matchesSearch && matchesLanguage;
  });

  // Generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
  
    // Add logo (adjust the Base64 or image path accordingly)
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Logo at (10, 10), 30x30 size
  
    // Add the report title
    doc.setFontSize(18);
    doc.text('EduCode Course Report', 50, 20); // Title next to the logo
  
    // Add additional header information
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleString(), 50, 30); // Date generated
    doc.text('Total Courses: ' + filteredCourses.length, 50, 35); // Total number of courses
    doc.text('EduCode - Your learning platform for coding', 50, 40); // Optional slogan or tagline
  
    // Prepare table data for the courses
    const tableColumn = ['Title', 'Language', 'Author', 'Created At', 'Updated At'];
    const tableRows = [];
  
    filteredCourses.forEach((course) => {
      const courseData = [
        course.title,
        course.language,
        course.author,
        new Date(course.createdAt).toLocaleDateString(), // Format the date
        new Date(course.updatedAt).toLocaleDateString(),
      ];
      tableRows.push(courseData);
    });
  
    // Add the table to the PDF below the header
    doc.autoTable({
      startY: 50, // Position the table after the header
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', // Professional look with grid lines
      styles: { fontSize: 10, cellPadding: 4 },
    });
  
    // Save the generated PDF
    doc.save('courses_report.pdf');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Courses</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or language..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
      />

      {/* Filter Dropdown */}
      <select
        value={filterLanguage}
        onChange={(e) => setFilterLanguage(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
      >
        <option value="All">All Languages</option>
        <option value="C">C</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
      </select>

      {/* List of Courses */}
      <ul className="space-y-4">
        {filteredCourses.map(course => (
          <li key={course._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-700">Author: {course.author}</p>
            <p className="text-gray-700">Language: {course.language}</p>
            <p className="text-gray-700">Created At: {new Date(course.createdAt).toLocaleString()}</p>
            <p className="text-gray-700">Updated At: {new Date(course.updatedAt).toLocaleString()}</p>
            <div className="mt-4 flex space-x-4">
              <Link to={`/course/${course._id}`} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                View Details
              </Link>
              <button
                onClick={() => navigate(`/edit-course/${course._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Generate PDF Report */}
      <button
        onClick={generateReport}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Generate Report (PDF)
      </button>
    </div>
  );
};

export default ManageCourses;

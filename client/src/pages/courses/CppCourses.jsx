// client/src/pages/CppCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseList from '../../components/CourseList';

const CppCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/language/C++');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching C++ courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">C++ Programming Courses</h1>
      {courses.length > 0 ? (
        <CourseList courses={courses} />
      ) : (
        <p className="text-center text-gray-600">No courses found for C++ programming.</p>
      )}
    </div>
    <footer className="bg-blue-600 text-white py-6 text-center">
    <p>&copy; 2024 EduCode. Empowering the next generation of coders.</p>
  </footer>
</div>
  );
};

export default CppCourses;

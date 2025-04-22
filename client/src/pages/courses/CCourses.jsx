import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CCourses.css';

const CCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy fallback data for courses
  const fallbackCourses = [
    {
      _id: '1',
      title: "MERN Stack Developer",
      description: "Build apps using MongoDB, Express.js, React, and Node.js",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
      rating: 4.5
    },
    {
      _id: '2',
      title: "Java Full Stack",
      description: "Frontend with React/Angular, backend with Spring Boot.",
      image: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
      rating: 4.7
    },
    {
      _id: '3',
      title: "React Native + Firebase",
      description: "Full stack mobile apps with real-time database & auth.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
      rating: 4.3
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/language/C'); // Replace with dynamic language if needed
        setCourses(response.data.courses || []); // Set the courses if successful
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(fallbackCourses); // Fallback to dummy courses in case of an error
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run only once

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is retrieved from localStorage

      if (!token) {
        console.log('No token found in localStorage');
        alert('Please login first.');
        return;
      }

      console.log('Enrolling in course ID:', courseId);

      const response = await axios.post('/api/courses/enroll', { courseId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Enrollment response:', response);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Enrollment failed:', error.response?.data || error.message);
      alert('Enrollment failed. Check console for details.');
    }
  };

  return (
    <div className="course-page">
      <h1 className="course-title">Frontend Programming Courses</h1>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="course-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <h2 className="course-card-title">{course.title}</h2>
              <p className="course-card-desc">{course.description}</p>
              <div className="course-rating">Rating: {course.rating} ⭐</div>
              <button className="enroll-btn" onClick={() => handleEnroll(course._id)}>
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="course-footer">
        <p>&copy; 2024 HighGenIT. Empowering the next generation of coders.</p>
      </footer>
    </div>
  );
};

export default CCourses;

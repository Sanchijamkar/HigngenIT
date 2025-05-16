import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';  // Import the styling file

const CategoryPage = ({ user }) => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses based on the category
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/category/${category}`);
        setCourses(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [category]);

  // Handle enrollment action
  // CategoryPage.jsx (frontend part)
const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem('token'); // Or get token from your user state

  if (!token) {
    alert("You need to be logged in to enroll in a course.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/api/enrollments/enroll', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Successfully enrolled in the course');
    } else {
      alert(`Error: ${data.message}`); // Show the error message returned from the backend
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while enrolling in the course.');
  }
};

  
  // If loading, show a loading message
  if (isLoading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="category-container">
      <h2 className="category-title">{category.toUpperCase()} Courses</h2>
      <div className="courses-grid">
        {courses.length === 0 ? (
          <p className="no-courses">No courses available in this category.</p>
        ) : (
          courses.map(course => (
            <div key={course._id} className="course-card">
              <img src={course.image} alt={course.title} className="course-img" />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <p className="course-rating">Rating: {course.rating} ⭐</p>
                <button className="enroll-btn" onClick={() => enrollInCourse(course._id)}>
                  Enroll
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

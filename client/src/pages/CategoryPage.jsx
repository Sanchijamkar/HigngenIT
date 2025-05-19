import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const enrollInCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login to enroll.");
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
        alert('Successfully enrolled!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="category-container">
      <h2>{category.toUpperCase()} Courses</h2>
      <div className="courses-grid">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map(course => (
            <div key={course._id} className="course-card">
              <img src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Rating: {course.rating} ⭐</p>
              <button onClick={() => enrollInCourse(course._id)}>Enroll</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

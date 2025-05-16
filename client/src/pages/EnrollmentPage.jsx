import React, { useEffect, useState } from 'react';
import axios from 'axios';


const EnrollmentPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  const categorizedCourses = courses.reduce((acc, course) => {
    const { category } = course;
    if (!acc[category]) acc[category] = [];
    acc[category].push(course);
    return acc;
  }, {});

  return (
    <div className="enrollment-container">
      <h1 className="main-heading">Enroll in Courses</h1>
      {Object.entries(categorizedCourses).map(([category, courses]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category} Courses</h2>
          <div className="course-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-details">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p><strong>Rating:</strong> {course.rating} ⭐</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollmentPage;

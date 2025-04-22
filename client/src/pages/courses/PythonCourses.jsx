import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/CourseList.css';

const PythonCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Basics for Beginners",
      description: "Learn the fundamentals of React: components, props, and state",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png", // React-related image
      rating: 4.5,
    },
    {
      id: 2,
      title: "React with Redux",
      description: "Manage complex state in large applications using Redux.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919823.png", // Redux-related image
      rating: 4.7,
    },
    {
      id: 3,
      title: "React + TypeScript",
      description: "Build type-safe React apps with TypeScript integration.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919844.png", // TypeScript-related image
      rating: 4.3,
    },
    {
      id: 4,
      title: "React Hooks Mastery",
      description: "Use useState, useEffect, useContext, and custom hooks effectively.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919847.png", // Hooks-related image
      rating: 4.6,
    },
    {
      id: 5,
      title: "React with Tailwind CSS",
      description: "Design sleek UIs using utility-first Tailwind CSS with React.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919835.png", // Tailwind CSS-related image
      rating: 4.4,
    },
    {
      id: 6,
      title: "React Native Masterclass",
      description: "Master React Native and build cross-platform apps for iOS & Android.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919839.png", // React Native-related image
      rating: 4.8,
    }
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/language/Python');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching Python courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-page">
      <h1 className="course-title">ReactJs Programming Courses</h1>
      <div className="course-grid">
        {courses.slice(0, 6).map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <h2 className="course-card-title">{course.title}</h2>
            <p className="course-card-desc">{course.description}</p>
            <div className="course-rating">Rating: {course.rating} ⭐</div>
          </div>
        ))}
      </div>
      <footer className="course-footer">
        <p>&copy; 2024 HighGenIT. Empowering the next generation of coders.</p>
      </footer>
    </div>
  );
};

export default PythonCourses;

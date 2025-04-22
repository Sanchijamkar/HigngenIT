// client/src/pages/JavaCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/CourseList.css';

const JavaCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "MERN Stack Developer",
      description: "Build apps using MongoDB, Express.js, React, and Node.js",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
      rating: 4.5
    },
    {
      id: 2,
      title: "Java Full Stack",
      description: "Frontend with React/Angular, backend with Spring Boot.",
      image: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
      rating: 4.7
    },
    {
      id: 3,
      title: "React Native + Firebase",
      description: "Full stack mobile apps with real-time database & auth.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
      rating: 4.3
    },
    {
      id: 4,
      title: "REST API with Spring",
      description: "Design and build RESTful APIs using Spring Boot.",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      rating: 4.6
    },
    {
      id: 5,
      title: "Java Web Services",
      description: "Build SOAP and RESTful web services with Java.",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
      rating: 4.4
    },
    {
      id: 6,
      title: "Docker + Kubernetes",
      description: "Deploy Java apps using Docker containers and orchestration with K8s.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919831.png",
      rating: 4.2
    }
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/language/Java');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching Java courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-page">
      <h1 className="course-title">FullStack Programming Courses</h1>
      <div className="course-grid">
        {courses.slice(0, 6).map(course => (
          <div key={course._id || course.id} className="course-card">
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

export default JavaCourses;
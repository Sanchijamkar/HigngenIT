import mongoose from 'mongoose';
import Course from '../models/course.model.js';

mongoose.connect('mongodb://localhost:27017/sanchu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const courses = [
  // Frontend
  {
    title: "HTML & CSS Basics",
    description: "Introduction to web structure and styling.",
    category: "frontend",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    rating: 4.3
  },
  {
    title: "JavaScript Essentials",
    description: "Learn core JavaScript concepts for frontend development.",
    category: "frontend",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    rating: 4.6
  },
  {
    title: "Angular",
    description: "Build powerful web apps using Angular.",
    category: "frontend",
    image: "https://angular.io/assets/images/logos/angular/angular.svg",
    rating: 4.8
  }
  ,
  {
    title: "Bootstrap for Beginners",
    description: "Use Bootstrap to build responsive UIs quickly.",
    category: "frontend",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
    rating: 4.4
  },
  {
    title: "React Basics",
    description: "Learn the fundamentals of React.",
    category: "frontend",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    rating: 4.7
  },
  {
    title: "Advanced CSS Techniques",
    description: "Master complex CSS layouts and animations.",
    category: "frontend",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    rating: 4.5
  },

  // Backend
  {
    title: "Node.js Introduction",
    description: "Learn server-side JavaScript with Node.js.",
    category: "backend",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    rating: 4.6
  },
  {
    title: "Express.js Crash Course",
    description: "Build web APIs using Express.",
    category: "backend",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    rating: 4.5
  },
  {
    title: "Django",
    description: "High-level Python web framework that encourages rapid development.",
    category: "backend",
    image: "https://static.djangoproject.com/img/logos/django-logo-negative.svg",
    rating: 4.8
  },
  {
    title: "Spring Boot",
    description: "Simplifies backend development with Java and Spring framework.",
    category: "backend",
    image: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
    rating: 4.8
  },
  {
    title: "MongoDB",
    description: "A NoSQL database for modern applications.",
    category: "backend",
    image: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    rating: 4.7
  },
  {
    title: "MySQL",
    description: "Open-source relational database management system.",
    category: "backend",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
    rating: 4.6
  },


  // Fullstack
  {
    title: "MERN Stack",
    description: "Full stack JavaScript solution using MongoDB, Express, React, and Node.js.",
    category: "fullstack",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png",
    rating: 4.8
  },
  {
    title: "Angular",
    description: "Build powerful web apps using Angular.",
    category: "fullstack",
    image: "https://angular.io/assets/images/logos/angular/angular.svg",
    rating: 4.8
  }
  ,
  {
    title: "Bootstrap for Beginners",
    description: "Use Bootstrap to build responsive UIs quickly.",
    category: "fullstack",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
    rating: 4.4
  },
  {
    title: "Node.js Introduction",
    description: "Learn server-side JavaScript with Node.js.",
    category: "fullstack",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    rating: 4.6
  },
  {
    title: "Express.js Crash Course",
    description: "Build web APIs using Express.",
    category: "fullstack",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    rating: 4.5
  },
  {
    title: "MySQL",
    description: "Open-source relational database management system.",
    category: "fullstack",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
    rating: 4.6
  },

  
  
  // React
  {
    title: "React Hooks",
    description: "Master useState, useEffect, useContext.",
    category: "react",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    rating: 4.7
  },
  {
    title: "React Router",
    description: "Implement navigation in React apps.",
    category: "react",
    image: "https://www.vectorlogo.zone/logos/reactrouter/reactrouter-icon.svg",
    rating: 4.6
  },
  {
    title: "React + Redux",
    description: "Manage app state using Redux.",
    category: "react",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png",
    rating: 4.5
  },
  {
    "title": "React with TypeScript",
    "description": "Build robust and scalable React applications using TypeScript.",
    "category": "react",
    "image": "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    "rating": 4.6
  },
  {
    title: "Next.js",
    description: "A React framework for server-side rendering and static site generation.",
    category: "react",
    image: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
    rating: 4.9
  },
  {
    "title": "React Native",
    "description": "Learn how to build mobile applications using React Native and leverage your React knowledge for mobile app development.",
    "category": "react",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "rating": 4.7
  },
];

const seedCourses = async () => {
  try {
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log('Courses seeded successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    mongoose.connection.close();
  }

};

seedCourses();
 

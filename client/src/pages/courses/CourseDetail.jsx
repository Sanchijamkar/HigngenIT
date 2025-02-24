// client/src/pages/CourseDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
    <div className="container mx-auto p-8 min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Course Title and Metadata */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
          <div className="text-gray-600 mb-6">
            <p><strong>Language:</strong> {course.language}</p>
            <p><strong>Author:</strong> {course.author}</p> {/* Display author */}
            <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleString()}</p> {/* Display creation date */}
            <p><strong>Updated At:</strong> {new Date(course.updatedAt).toLocaleString()}</p> {/* Display updated date */}
          </div>

          {/* Course Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Course Content Sections */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Course Content</h2>
            {course.content.map((section, index) => (
              <div key={index} className="mb-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{section.sectionTitle}</h3>
                <p className="text-gray-700">{section.sectionContent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <footer className="bg-blue-600 text-white py-6 text-center">
    <p>&copy; 2024 EduCode. Empowering the next generation of coders.</p>
  </footer>
</div>
  );
};

export default CourseDetail;

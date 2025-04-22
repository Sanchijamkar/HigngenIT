// client/src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('C');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState([{ sectionTitle: '', sectionContent: '' }]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        const course = response.data.course;
        setTitle(course.title);
        setLanguage(course.language);
        setDescription(course.description);
        setAuthor(course.author);
        setContent(course.content);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleContentChange = (index, event) => {
    const newContent = [...content];
    newContent[index][event.target.name] = event.target.value;
    setContent(newContent);
  };

  const handleAddSection = () => {
    setContent([...content, { sectionTitle: '', sectionContent: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCourse = {
      title,
      language,
      description,
      author,
      content,
    };

    try {
      await axios.put(`/api/courses/${id}`, updatedCourse);
      navigate('/manage-courses'); // Redirect back to manage courses page after update
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"
          >
            <option value="C">Frontend Technology</option>
            <option value="C++">Backend Technology</option>
            <option value="Java">Full Stack Technology</option>
            <option value="Python">ReactJs</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6">Content Sections</h2>
        {content.map((section, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-6 mb-6 bg-gray-50">
            <label className="block text-gray-700 font-semibold">Section Title</label>
            <input
              type="text"
              name="sectionTitle"
              value={section.sectionTitle}
              onChange={(e) => handleContentChange(index, e)}
              required
              className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            />

            <label className="block text-gray-700 font-semibold">Section Content</label>
            <textarea
              name="sectionContent"
              value={section.sectionContent}
              onChange={(e) => handleContentChange(index, e)}
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Section
        </button>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('C');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState([{ sectionTitle: '', sectionContent: '' }]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      setAuthor(value);
      setErrors((prev) => ({ ...prev, author: '' }));
    } else {
      setErrors((prev) => ({ ...prev, author: 'Only letters and spaces are allowed.' }));
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9\s]*$/;
    if (regex.test(value)) {
      setTitle(value);
      setErrors((prev) => ({ ...prev, title: '' }));
    } else {
      setErrors((prev) => ({ ...prev, title: 'Only letters, numbers, and spaces are allowed.' }));
    }
  };

  const handleContentChange = (index, event) => {
    const newContent = [...content];
    newContent[index][event.target.name] = event.target.value;
    setContent(newContent);
  };

  const handleAddSection = () => {
    setContent([...content, { sectionTitle: '', sectionContent: '' }]);
  };

  const handleRemoveSection = (index) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCourse = { title, language, description, author, content };
    try {
      await axios.post('/api/courses', newCourse);
      navigate('/admin-profile');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">📘 Add New Course</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the course title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the author's name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Programming Language */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Programming Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="C">Frontend Technology</option>
              <option value="C++">Backend Technology</option>
              <option value="Java">Full Stack Technology</option>
              <option value="Python">React JS</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a brief description of the course"
            />
          </div>

          {/* Content Sections */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Content Sections</h2>
            {content.map((section, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
                <label className="block text-lg font-semibold text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  name="sectionTitle"
                  value={section.sectionTitle}
                  onChange={(e) => handleContentChange(index, e)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter section title"
                />
                <label className="block text-lg font-semibold text-gray-700 mb-1">Section Content</label>
                <textarea
                  name="sectionContent"
                  value={section.sectionContent}
                  onChange={(e) => handleContentChange(index, e)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter section content"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove Section
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSection}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              ➕ Add Section
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition duration-300"
            >
              🚀 Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('C');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState(''); // New author state
  const [content, setContent] = useState([{ sectionTitle: '', sectionContent: '' }]);
  const [errors, setErrors] = useState({}); // Error state for validation
  const navigate = useNavigate();

  // Validate the author field
  const handleAuthorChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
    if (regex.test(value)) {
      setAuthor(value);
      setErrors((prev) => ({ ...prev, author: '' }));
    } else {
      setErrors((prev) => ({ ...prev, author: 'Only letters and spaces are allowed.' }));
    }
  };

  // Validate the title field
  const handleTitleChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9\s]*$/; // Only allow letters, numbers, and spaces
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

  // Remove section handler
  const handleRemoveSection = (index) => {
    const newContent = [...content];
    newContent.splice(index, 1); // Remove the section at the specified index
    setContent(newContent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCourse = {
      title,
      language,
      description,
      author, // Include author in the course data
      content,
    };

    try {
      await axios.post('/api/courses', newCourse);
      navigate('/admin-profile'); // Redirect to home or courses page after submission
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter the course title"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter the author's name"
          />
          {errors.author && <p className="text-red-500 mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Programming Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter a brief description of the course"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Sections</h2>
        {content.map((section, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
            <label className="block text-lg font-semibold text-gray-700">Section Title</label>
            <input
              type="text"
              name="sectionTitle"
              value={section.sectionTitle}
              onChange={(e) => handleContentChange(index, e)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter section title"
            />

            <label className="block text-lg font-semibold text-gray-700">Section Content</label>
            <textarea
              name="sectionContent"
              value={section.sectionContent}
              onChange={(e) => handleContentChange(index, e)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter section content"
            />

            {/* Remove Section Button */}
            <button
              type="button"
              onClick={() => handleRemoveSection(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-2 focus:outline-none"
            >
              Remove Section
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSection}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Add Section
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full focus:outline-none"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

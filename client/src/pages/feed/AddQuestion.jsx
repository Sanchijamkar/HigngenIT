import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    errorCode: '',
    notes: '',
    programmingLanguages: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          programmingLanguages: [...formData.programmingLanguages, value],
        });
      } else {
        setFormData({
          ...formData,
          programmingLanguages: formData.programmingLanguages.filter(
            (lang) => lang !== value
          ),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/questions/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Question created:', data);
        navigate('/questions');
      })
      .catch((err) => console.error('Error creating question:', err));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=600)' }}>
        {/* Image will occupy the left half of the screen */}
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center mt-8 justify-center p-6 bg-gray-100">
        <div className="max-w-xl w-full p-8 bg-gray-200 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-zinc-950 mb-6 text-center">Add a New Question</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Form Fields Here */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-950">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-zinc-950">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="errorCode" className="block text-sm font-medium text-zinc-950">Error Code:</label>
              <input
                type="text"
                id="errorCode"
                name="errorCode"
                value={formData.errorCode}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-zinc-950">Notes:</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-950">Programming Languages:</label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="programmingLanguages"
                    value="JavaScript"
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-zinc-950">JavaScript</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="programmingLanguages"
                    value="Python"
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-zinc-950">Python</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="programmingLanguages"
                    value="Java"
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-zinc-950">Java</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="programmingLanguages"
                    value="Java"
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-zinc-950">C++</span>
                </label>
                
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

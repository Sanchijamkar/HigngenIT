import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    descrp: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Name validation: Only allow letters and spaces
    if (name === 'name') {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
      } else {
        setErrorMessage('Name can only contain letters and spaces.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Feedback submitted successfully');
        setFormData({ name: '', email: '', descrp: '' });
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-9 bg-slate-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-black-600 mb-6 text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
          {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="descrp" className="block text-sm font-medium text-black">Feedback:</label>
          <textarea
            name="descrp"
            value={formData.descrp}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your feedback"
            rows="4"
          />
        </div>
        <div className="flex justify-between">
          {/* Back button - navigates to QuickNote page */}
          <button
            type="button"
            onClick={() => navigate('/quicknote')}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={!!errorMessage}
          >
            Submit
          </button>

          {/* Next button - navigates to Profile page */}
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;

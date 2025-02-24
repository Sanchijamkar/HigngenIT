import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation

const AddComment = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate to redirect after adding a comment
  const [commentData, setCommentData] = useState({
    description: '',
    code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/questions/questions/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Comment added:', data);
      navigate(`/questions/${id}`); // Redirect to the question detail page after submitting
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-slate-50 shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={commentData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            placeholder="Write your comment..."
            rows="4"
          />
        </div>

        {/* Code Input */}
        <div className="mb-4">
          <label htmlFor="code" className="block text-base font-medium text-gray-700 mb-2">
            Code (optional):
          </label>
          <textarea
            id="code"
            name="code"
            value={commentData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            placeholder="Optional code snippet"
            rows="4"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold rounded-md text-white transition duration-300 ease-in-out ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {loading ? 'Adding Comment...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default AddComment;

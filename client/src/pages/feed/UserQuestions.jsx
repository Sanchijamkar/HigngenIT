import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

const UserQuestions = ({ userEmail }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions/uquestions`, {
      credentials: "include", // Include credentials for authentication
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, [userEmail]);

  const handleDelete = (id) => {
    fetch(`/api/questions/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter((q) => q._id !== id)))
      .catch((err) => console.error('Error deleting question:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Your Questions</h1>
      <ul className="space-y-4">
        {questions.map((question) => (
          <li key={question._id} className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{question.name}</h3>
              <p className="text-gray-700">{question.description}</p>

              {/* View Button */}
              <button
                onClick={() => navigate(`/questions/${question._id}`)} // Navigate to question details page
                className="mt-2 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
              >
                View
              </button>

              {/* Update Button with blue color */}
              <button
                onClick={() => navigate(`/questions/${question._id}/edit`)} // Updated from history.push to navigate
                className="mt-2 ml-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(question._id)}
                className="mt-2 ml-2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>

            {/* Comment Count Badge */}
            <div className="text-gray-600">
              {question.comments && (
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                  {question.comments.length} {question.comments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserQuestions;

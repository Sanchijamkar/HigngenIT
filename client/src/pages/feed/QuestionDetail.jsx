import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/questions/questions/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched question data:', data); // Debugging: log the fetched data
        setQuestion(data);
      } catch (err) {
        console.error('Error fetching question:', err); // Log detailed error
        setError('Failed to fetch question. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!question) {
    return <div className="text-gray-500">No question found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{question.name}</h1>
      <p className="text-gray-700 mb-4">{question.description}</p>
      {question.errorCode && (
        <p className="text-gray-600 mb-4"><strong>Error Code:</strong> {question.errorCode}</p>
      )}
      {question.notes && (
        <p className="text-gray-600 mb-4"><strong>Notes:</strong> {question.notes}</p>
      )}
      {question.programmingLanguages && question.programmingLanguages.length > 0 && (
        <div className="mb-4">
          <strong>Programming Languages:</strong>
          <ul className="list-disc list-inside ml-4">
            {question.programmingLanguages.map((lang, index) => (
              <li key={index} className="text-gray-700">{lang}</li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-4">
        {question.comments && question.comments.length > 0 ? (
          question.comments.map((comment, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <p className="text-gray-700">{comment.description}</p>
              {comment.code && (
                <pre className="bg-gray-200 p-2 rounded mt-2">
                  <code>{comment.code}</code>
                </pre>
              )}
            </li>
          ))
        ) : (
          <li className="p-4 bg-gray-100 rounded-md shadow-sm">No comments yet.</li>
        )}
      </ul>
      <button
        onClick={() => navigate(`/questions/${id}/comments/new`)}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
};

export default QuestionDetail;

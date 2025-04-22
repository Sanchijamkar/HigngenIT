import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/questions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const questionList = Array.isArray(data) ? data : data.questions;
        setQuestions(questionList);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = filter
    ? questions.filter((q) =>
        Array.isArray(q.programmingLanguages)
          ? q.programmingLanguages.includes(filter)
          : false
      )
    : questions;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">All Questions</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700" htmlFor="languageFilter">
          Filter by Programming Language:
        </label>
        <select
          id="languageFilter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="mt-2 block w-48 p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All</option>
          <option value="JavaScript">Frontend Technology</option>
          <option value="Python">Backend Technology</option>
          <option value="Java">Java</option>
        </select>
      </div>

      {filteredQuestions.length > 0 ? (
        <ul className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <li
              key={question._id || index}
              className="p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {question.name || 'Untitled Question'}
              </h3>
              <p className="text-gray-700">{question.description || 'No description provided.'}</p>
              <p className="text-gray-600">
                Languages:{' '}
                {Array.isArray(question.programmingLanguages)
                  ? question.programmingLanguages.join(', ')
                  : 'N/A'}
              </p>
              <p className="text-gray-500">
                Comments: {question.comments ? question.comments.length : 0}
              </p>
              <button
                onClick={() => navigate(`/questions/${question._id}`)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No questions found.</p>
      )}
    </div>
  );
};

export default QuestionList;

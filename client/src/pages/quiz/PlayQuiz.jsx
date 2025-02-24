import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayQuiz = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const getExams = async () => {
    try {
      const response = await fetch("/api/exams/get-all-exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setExams(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch exams. Please try again later.");
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div>
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* My Results Button at Top Right */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          onClick={() => navigate("/user-exam-report")}
        >
          My Results
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Play Quiz
      </h1>

      {/* Motivational Message */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center mb-8 border border-gray-300">
        <p className="text-lg text-gray-700 mb-4">
          🌟 <strong>Test your programming knowledge!</strong> 📚
        </p>
        <p className="text-md text-gray-600">
          Whether you're a beginner or an expert, these quizzes will help you
          identify your strengths and areas for improvement. Dive in and
          challenge yourself today!
        </p>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-blue-600">{exam.name}</h2>
            <hr className="border-gray-300" />
            <div className="flex flex-col gap-2">
              <p className="text-md text-gray-700">
                Category: <span className="font-medium">{exam.category}</span>
              </p>
              <p className="text-md text-gray-700">
                Total Marks:{" "}
                <span className="font-medium">{exam.totalMarks}</span>
              </p>
              <p className="text-md text-gray-700">
                Passing Marks:{" "}
                <span className="font-medium">{exam.passingMarks}</span>
              </p>
              <p className="text-md text-gray-700">
                Duration:{" "}
                <span className="font-medium">{exam.duration} seconds</span>
              </p>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
              onClick={() => navigate(`/exam-write/${exam._id}`)}
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>

      {/* Footer Section */}

      
    </div>
    <footer className="mt-8 text-center text-blue-800">
        <p className="mb-4">🌟 Keep learning and improving your skills! 🌟</p>{" "}
        {/* Added mb-4 for margin-bottom */}
        <div className="bg-blue-700 text-white py-6 text-center">
          <p>&copy; 2024 EduCode. Empowering the next generation of coders.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlayQuiz;

import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl underline font-semibold text-center mb-4">
          Instructions
        </h1>
        <ul className="flex flex-col gap-2 mb-4">
          <li className="text-lg">
            Exam must be completed in{" "}
            <span className="font-bold">{examData.duration} seconds</span>.
          </li>
          <li className="text-lg">
            Exam will be submitted automatically after{" "}
            <span className="font-bold">{examData.duration} seconds</span>.
          </li>
          <li className="text-lg">
            Once submitted, you cannot change your answers.
          </li>
          <li className="text-lg">Do not refresh the page.</li>
          <li className="text-lg">
            You can use the <span className="font-bold">"Previous"</span> and{" "}
            <span className="font-bold">"Next"</span> buttons to navigate
            through the questions.
          </li>
          <li className="text-lg">
            Total marks for the exam is{" "}
            <span className="font-bold">{examData.totalMarks}</span>.
          </li>
          <li className="text-lg">
            Passing marks for the exam is{" "}
            <span className="font-bold">{examData.passingMarks}</span>.
          </li>
        </ul>
        <button
          className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;

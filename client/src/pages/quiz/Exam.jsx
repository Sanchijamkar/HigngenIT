import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  // API call to delete exam by ID
  const deleteExamById = async (examId) => {
    try {
      const response = await fetch("/api/exams/delete-exam-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // API call to get all exams
  const getAllExams = async () => {
    try {
      const response = await fetch("/api/exams/get-all-exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteExams = async (examId) => {
    try {
      const response = await deleteExamById(examId);
      if (response.success) {
        // Update state to remove the deleted exam
        setExams(exams.filter((exam) => exam._id !== examId));
        alert("Exam deleted successfully!");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Failed to delete exam!");
    }
  };

  const getExamsData = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getExamsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-2">
        <h1 className="text-3xl font-semibold">Exams</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/admin-exam-report")}
        >
          <i className="ri-check-line mr-2"></i>
          Exam Results
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/exam-add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="border-t my-4"></div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-4 border-b text-center">Exam Name</th>
            <th className="py-4 border-b text-center">Duration</th>
            <th className="py-4 border-b text-center">Category</th>
            <th className="py-4 border-b text-center">Total Marks</th>
            <th className="py-4 border-b text-center">Passing Marks</th>
            <th className="py-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} className="hover:bg-gray-50">
              <td className="py-4 border-b text-center">{exam.name}</td>
              <td className="py-4 border-b text-center">{exam.duration}</td>
              <td className="py-4 border-b text-center">{exam.category}</td>
              <td className="py-4 border-b text-center">{exam.totalMarks}</td>
              <td className="py-4 border-b text-center">{exam.passingMarks}</td>
              <td className="py-4 border-b text-center">
                <div className="flex justify-center gap-4">
                  <i
                    className="ri-pencil-line cursor-pointer"
                    onClick={() => navigate(`/exam-add/${exam._id}`)}
                  ></i>
                  <i
                    className="ri-delete-bin-line cursor-pointer"
                    onClick={() => deleteExams(exam._id)}
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

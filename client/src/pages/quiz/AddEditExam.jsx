import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestion";

export default function AddEditExam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [errors, setErrors] = useState({}); // State to manage error messages
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchExamData = async () => {
    try {
      const res = await fetch(`/api/exams/get-exam-by-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examId: id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setExamData(data.data);
    } catch (error) {
      console.error("Error fetching exam data:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExamData();
    }
  }, [id]);

  // Validation function to check field errors
  const validate = (values) => {
    const newErrors = {};

    if (!values.name) {
      newErrors.name = "Exam name is required.";
    }

    if (!values.duration) {
      newErrors.duration = "Exam duration is required.";
    } else if (values.duration < 0) {
      newErrors.duration = "Exam duration cannot be negative.";
    }

    if (!values.totalMarks) {
      newErrors.totalMarks = "Total marks are required.";
    } else if (values.totalMarks < 0) {
      newErrors.totalMarks = "Total marks cannot be negative.";
    }

    if (!values.passingMarks) {
      newErrors.passingMarks = "Passing marks are required.";
    } else if (values.passingMarks < 0) {
      newErrors.passingMarks = "Passing marks cannot be negative.";
    } else if (parseInt(values.passingMarks) > parseInt(values.totalMarks)) {
      newErrors.passingMarks =
        "Passing marks cannot be greater than total marks.";
    }

    if (!values.category) {
      newErrors.category = "Exam category is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Validate the form values
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      return;
    }

    try {
      const res = await fetch(`/api/exams/${id ? "edit-exam-by-id" : "add"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, examId: id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        navigate("/exam");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error saving exam data:", error.message);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      const res = await fetch("/api/exams/delete-question-in-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId, examId: id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setExamData((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q._id !== questionId),
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Exam" : "Add Exam"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={examData?.name || ""}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Duration
            </label>
            <input
              type="number"
              name="duration"
              defaultValue={examData?.duration || ""}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              defaultValue={examData?.category || ""}
              className="p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Marks
            </label>
            <input
              type="number"
              name="totalMarks"
              defaultValue={examData?.totalMarks || ""}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.totalMarks && (
              <p className="text-red-500 text-sm">{errors.totalMarks}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passing Marks
            </label>
            <input
              type="number"
              name="passingMarks"
              defaultValue={examData?.passingMarks || ""}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.passingMarks && (
              <p className="text-red-500 text-sm">{errors.passingMarks}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={() => navigate("/admin/exams")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>

      {id && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
            onClick={() => setShowAddEditQuestionModal(true)}
          >
            Add Questions
          </button>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Option
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examData?.questions.map((question) => (
                <tr key={question._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {question.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Object.keys(question.options).map((key) => (
                      <div key={key}>
                        {key}: {question.options[key]}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {question.options
                      ? `${question.correctOption} : ${
                          question.options[question.correctOption]
                        }`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <i
                        className="ri-pencil-line cursor-pointer"
                        onClick={() => {
                          setSelectedQuestion(question);
                          setShowAddEditQuestionModal(true);
                        }}
                      ></i>
                      <i
                        className="ri-delete-bin-line cursor-pointer"
                        onClick={() => deleteQuestion(question._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          showAddEditQuestionModal={showAddEditQuestionModal}
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          examId={id}
          refreshData={() => {
            if (id) fetchExamData();
          }}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

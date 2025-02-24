import React, { useState, useEffect } from "react";

export default function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}) {
  const [question, setQuestion] = useState({
    name: "",
    correctOption: "",
    A: "",
    B: "",
    C: "",
    D: "",
  });

  useEffect(() => {
    if (selectedQuestion) {
      setQuestion({
        name: selectedQuestion.name,
        correctOption: selectedQuestion.correctOption,
        A: selectedQuestion.options?.A,
        B: selectedQuestion.options?.B,
        C: selectedQuestion.options?.C,
        D: selectedQuestion.options?.D,
      });
    } else {
      setQuestion({
        name: "",
        correctOption: "",
        A: "",
        B: "",
        C: "",
        D: "",
      });
    }
  }, [selectedQuestion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check: Ensure all fields are filled
    if (
      !question.name ||
      !question.correctOption ||
      !question.A ||
      !question.B ||
      !question.C ||
      !question.D
    ) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      name: question.name,
      correctOption: question.correctOption,
      options: {
        A: question.A,
        B: question.B,
        C: question.C,
        D: question.D,
      },
      exam: examId,
    };

    try {
      let url = "/api/exams/add-questions-to-exam";
      let method = "POST";

      if (selectedQuestion) {
        url = `/api/exams/edit-question-in-exam`; // Removed the dynamic _id from the URL
        method = "PUT"; // Update method should be PUT
        payload.questionId = selectedQuestion._id;
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        alert(data.message);
      }

      setSelectedQuestion(null);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!showAddEditQuestionModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedQuestion ? "Edit Question" : "Add Question"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <textarea
              name="name"
              value={question.name}
              onChange={handleChange}
              className="p-2 w-full rounded-lg border border-gray-400"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correct Option
            </label>
            <select
              name="correctOption"
              value={question.correctOption}
              onChange={handleChange}
              className="p-2 w-full rounded-lg border border-gray-400"
            >
              <option value="">Select correct option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="mb-4 flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Option A
              </label>
              <input
                type="text"
                name="A"
                value={question.A}
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-gray-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Option B
              </label>
              <input
                type="text"
                name="B"
                value={question.B}
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-gray-400"
              />
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Option C
              </label>
              <input
                type="text"
                name="C"
                value={question.C}
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-gray-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Option D
              </label>
              <input
                type="text"
                name="D"
                value={question.D}
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setShowAddEditQuestionModal(false);
                setSelectedQuestion(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Instructions from "./Instruct";
import { useSelector } from "react-redux";

function WriteExam() {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("instructions");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        clearInterval(intervalId);
        calculateResults();
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, [params.id]);

  useEffect(() => {
    // This useEffect will trigger when secondsLeft reaches 0 to ensure the latest selectedOptions are used
    if (secondsLeft === 0) {
      clearInterval(intervalId);
      calculateResults();
    }
  }, [secondsLeft, selectedOptions]);

  const getExamById = async (payload) => {
    try {
      const res = await fetch("/api/exams/get-exam-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const getExamData = async () => {
    try {
      const response = await getExamById({ examId: params.id });
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setSecondsLeft(response.data.duration);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const calculateResults = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = { correctAnswers, wrongAnswers, verdict };
      setResult(tempResult);
      setView("results");

      const payload = {
        exam: params.id,
        result: tempResult,
        user: currentUser._id,
      };

      const res = await fetch("/api/examsReport/add-exam-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!responseData.success) {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error saving results:", error.message);
    }
  };

  if (!examData || questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 min-h-screen">
      <div className="border-b border-gray-300 mb-4"></div>
      <h1 className="text-center text-3xl font-semibold mb-4">
        {examData.name}
      </h1>
      <div className="border-b border-gray-300 my-4"></div>

      {view === "instructions" && (
        <Instructions
          examData={examData}
          view={view}
          setView={setView}
          startTimer={startTimer}
        />
      )}

      {view === "questions" && questions[selectedQuestionIndex] && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">
              {selectedQuestionIndex + 1}:{" "}
              {questions[selectedQuestionIndex].name}
            </h1>
            <div className="flex items-center justify-center bg-orange-500 text-white rounded-full h-16 w-16 shadow-lg">
              <span className="text-3xl font-semibold">{secondsLeft}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {Object.entries(questions[selectedQuestionIndex].options).map(
              ([key, value], index) => {
                const isSelected =
                  selectedOptions[selectedQuestionIndex] === key;

                return (
                  <div
                    key={index}
                    className={`border p-6 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: key,
                      });
                    }}
                  >
                    <h1 className="text-lg font-medium">
                      {key}: {value}
                    </h1>
                  </div>
                );
              }
            )}
          </div>

          <div className="flex justify-between mt-4">
            {selectedQuestionIndex > 0 && (
              <button
                className="bg-white border border-blue-500 text-blue-500 px-6 py-3 rounded-md shadow-md transition duration-200 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  setSelectedQuestionIndex(selectedQuestionIndex - 1);
                }}
              >
                Previous
              </button>
            )}
            {selectedQuestionIndex < questions.length - 1 && (
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition duration-200 hover:bg-blue-600"
                onClick={() => {
                  setSelectedQuestionIndex(selectedQuestionIndex + 1);
                }}
              >
                Next
              </button>
            )}
            {selectedQuestionIndex === questions.length - 1 && (
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition duration-200 hover:bg-blue-600"
                onClick={() => {
                  clearInterval(intervalId);
                  calculateResults();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      {view === "results" && (
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="bg-blue-700 p-4 text-white rounded-lg shadow-lg w-full max-w-xs text-center">
            <h1 className="text-2xl font-bold mb-3">Results</h1>
            <div className="space-y-1">
              <h2 className="text-lg font-medium">
                Total Marks:{" "}
                <span className="font-semibold">{examData.totalMarks}</span>
              </h2>
              <h2 className="text-lg font-medium">
                Obtained Marks:{" "}
                <span className="font-semibold">
                  {result.correctAnswers.length}
                </span>
              </h2>
              <h2 className="text-lg font-medium">
                Wrong Answers:{" "}
                <span className="font-semibold">
                  {result.wrongAnswers.length}
                </span>
              </h2>
              <h2 className="text-lg font-medium">
                Passing Marks:{" "}
                <span className="font-semibold">{examData.passingMarks}</span>
              </h2>
              <h2 className="text-lg font-medium">
                Verdict:{" "}
                <span
                  className={`font-semibold ${
                    result.verdict === "Pass"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {result.verdict}
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-4">
            {result.verdict === "Pass" && (
              <lottie-player
                src="https://lottie.host/b4c34eb7-009c-4254-abc1-6a2c34ebf066/d5KXJsgkxE.json"
                background="#FFFFFF"
                speed="1"
                loop
                autoplay
                direction="1"
                mode="normal"
                style={{ height: "250px" }}
              ></lottie-player>
            )}
            {result.verdict === "Fail" && (
              <lottie-player
                src="https://lottie.host/d8b86fd6-3a83-4aa5-9cf8-953f1f6f930c/MTkxSNDfTK.json"
                background="#fff"
                speed="1"
                loop
                autoplay
                direction="1"
                mode="normal"
                style={{ height: "200px" }}
              ></lottie-player>
            )}
          </div>

          <div className="mt-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition  " // Added 'ml-2' for left margin
              onClick={() => navigate("/play-quiz")} // Replace with the actual path of your PlayQuiz page
            >
              Return to Play Quiz
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ml-3"
              onClick={() => navigate("/user-exam-report")}
            >
              View My Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteExam;

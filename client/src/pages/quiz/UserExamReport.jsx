import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserExamReport = () => {
  const [reportsData, setReportData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  const getAllReportByUser = async () => {
    try {
      const res = await fetch("/api/examsReport/get-attempts-by-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      const responseData = await res.json();

      if (!responseData.success) {
        throw new Error(responseData.message);
      }
      return responseData;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getData = async () => {
    const response = await getAllReportByUser();
    if (response && response.success) {
      setReportData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => navigate("/play-quiz")}
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-700 text-center w-full">
          My Results
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-6 border-b text-center">Exam Name</th>
              <th className="py-3 px-6 border-b text-center">Date</th>
              <th className="py-3 px-6 border-b text-center">Total Marks</th>
              <th className="py-3 px-6 border-b text-center">Passing Marks</th>
              <th className="py-3 px-6 border-b text-center">Obtained Marks</th>
              <th className="py-3 px-6 border-b text-center">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b text-center ">
                  {record.exam ? record.exam.name : "Exam Not Available"}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {formatDate(record.createdAt)}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {record.exam ? record.exam.totalMarks : "N/A"}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {record.exam ? record.exam.passingMarks : "N/A"}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {record.result.correctAnswers.length}
                </td>
                <td
                  className={`py-3 px-6 border-b text-center font-semibold ${
                    record.result.verdict === "Pass"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {record.result.verdict}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserExamReport;

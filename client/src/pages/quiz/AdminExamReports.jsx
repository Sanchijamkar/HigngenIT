import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../components/logo.png";

function AdminExamReports() {
  const [reportsData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected exam category
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
      const res = await fetch("/api/examsReport/get-all-attempts", {
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

  // Function to delete report by ID
  const deleteReportById = async (reportId) => {
    try {
      const res = await fetch("/api/examsReport/delete-exam-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId }),
      });

      const responseData = await res.json();
      if (!responseData.success) {
        throw new Error(responseData.message);
      }

      // Remove deleted report from the UI
      setReportData((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      );
      alert("Report deleted successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error deleting the report!");
    }
  };

  // Filter reports based on search term, selected date, and selected category
  const filteredReports = reportsData.filter((record) => {
    const recordDate = new Date(record.createdAt);
    const isSameDate =
      !selectedDate ||
      (recordDate.getFullYear() === new Date(selectedDate).getFullYear() &&
        recordDate.getMonth() === new Date(selectedDate).getMonth() &&
        recordDate.getDate() === new Date(selectedDate).getDate());
    const matchesSearch =
      (record.user &&
        record.user.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (record.exam &&
        record.exam.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      (record.exam && record.exam.category === selectedCategory);

    return isSameDate && matchesSearch && matchesCategory;
  });

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Logo dimensions
    const logoWidth = 50; // Adjust as necessary
    const logoHeight = 50; // Adjust as necessary
    const pageWidth = doc.internal.pageSize.getWidth();

    // Center logo
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, "PNG", logoX, 10, logoWidth, logoHeight);

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Users Exams Results", pageWidth / 2, 60, { align: "center" });

    const tableColumn = [
      "Exam Name",
      "Date",
      "User",
      "Total Marks",
      "Passing Marks",
      "Obtained Marks",
      "Verdict",
    ];

    const tableRows = [];

    filteredReports.forEach((record) => {
      const rowData = [
        record.exam ? record.exam.name : "Exam Not Available",
        formatDate(record.createdAt),
        record.user ? record.user.username : "Unknown User",
        record.exam ? record.exam.totalMarks : "null",
        record.exam ? record.exam.passingMarks : "null",
        record.result.correctAnswers.length,
        record.result.verdict,
      ];
      tableRows.push(rowData);
    });

    // Use autoTable with custom styles
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70, // Adjust to give space below the title
      headStyles: {
        fillColor: [173, 216, 230], // Light blue header background color
        textColor: [0, 0, 0], // Header text color
        fontSize: 12, // Header font size
        font: "helvetica",
        halign: "center",
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Body background color
        textColor: [0, 0, 0], // Body text color
        fontSize: 10, // Body font size
        font: "helvetica",
        halign: "center",
        valign: "middle",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Alternate row color
      },
      theme: "grid", // Use a grid theme
      margin: { top: 30 }, // Adjust margin for the table
    });

    doc.save("examResults.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Users Exams Results
      </h1>
      <div className="flex justify-between mt-2">
        {/* Back Button */}
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => navigate("/exam")}
        >
          Back
        </button>

        {/* Download PDF Button */}
        <button
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          onClick={downloadPDF}
        >
          Download Result Sheet
        </button>
      </div>

      {/* Filter Options in a Flex Container */}
      <div className="flex flex-wrap mb-4 space-x-4">
        {/* Search Field */}
        <div className="flex items-center">
          <label htmlFor="search" className="mr-2 text-gray-700">
            Search (Username/Exam Name):
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-64 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Date Picker for Specific Date */}
        <div className="flex items-center">
          <label htmlFor="date" className="mr-2 text-gray-700">
            Select Date:
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Dropdown for Exam Category Filtering */}
        <div className="flex items-center">
          <label htmlFor="category" className="mr-2 text-gray-700">
            Exam Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center">Exam Name</th>
              <th className="py-2 px-4 border-b text-center">Date</th>
              <th className="py-2 px-4 border-b text-center">User</th>
              <th className="py-2 px-4 border-b text-center">Total Marks</th>
              <th className="py-2 px-4 border-b text-center">Passing Marks</th>
              <th className="py-2 px-4 border-b text-center">Obtained Marks</th>
              <th className="py-2 px-4 border-b text-center">Verdict</th>
              <th className="py-2 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  {record.exam ? record.exam.name : "Exam Not Available"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {formatDate(record.createdAt)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {record.user ? record.user.username : "Unknown User"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {record.exam ? record.exam.totalMarks : "null"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {record.exam ? record.exam.passingMarks : "null"}
                </td>
                <td className="py-2 px-4 border-b text-center">
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
                <td className="py-2 px-4 border-b text-center">
                  <i
                    className="ri-delete-bin-line cursor-pointer"
                    onClick={() => deleteReportById(record._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminExamReports;

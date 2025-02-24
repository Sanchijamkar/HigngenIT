import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin for table generation
//import logo from '../path/to/logo.png'; // Make sure to adjust this path to your logo image

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // PDF Generation Function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo to the header (make sure the logo path is valid)
    //doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Add title and some information
    doc.setFontSize(18);
    doc.text('Feedback Report', 50, 20);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 50, 30);
    doc.text('Total Feedbacks: ' + feedbacks.length, 50, 35);

    // Prepare table columns and rows
    const tableColumn = ['Name', 'Email', 'Feedback', 'Date'];
    const tableRows = [];

    feedbacks.forEach((feedback) => {
      const feedbackData = [
        feedback.name,
        feedback.email,
        feedback.descrp,
        new Date(feedback.createdAt).toLocaleDateString(), // Format the date
      ];
      tableRows.push(feedbackData);
    });

    // Generate the table
    doc.autoTable({
      startY: 50, // Position the table below the header
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', // Grid style for professional look
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Save the generated PDF
    doc.save('feedback_report.pdf');
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-black-600 mb-6 text-center">All Feedback</h1>
      {feedbacks.length === 0 ? (
        <div className="text-center text-gray-500">No feedback available.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-blue-400 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Feedback</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id} className="hover:bg-blue-100 transition duration-300">
                    <td className="py-3 px-6 border-b border-gray-200">{feedback.name}</td>
                    <td className="py-3 px-6 border-b border-gray-200">{feedback.email}</td>
                    <td className="py-3 px-6 border-b border-gray-200">{feedback.descrp}</td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download PDF Button */}
          <div className="mt-6 text-center">
            <button
              onClick={generatePDF}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Download Report (PDF)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewFeedback;

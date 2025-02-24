import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [searchLanguage, setSearchLanguage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Used to retrieve state passed from UpdateNote

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/create/notes', {
          credentials: "include", // Include credentials for authentication
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };

    fetchNotes();

    // Check if there's a success message in the location state
    if (location.state?.successMessage) {
      setShowSuccessMessage(true);

      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clean up the timer when the component unmounts or the effect re-runs
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/create/note/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchLanguage(e.target.value);
  };

  const generatePDF = (note) => {
    const doc = new jsPDF();
    doc.text(`Title: ${note.Title}`, 10, 10);
    doc.text(`Course: ${note.Course}`, 10, 20);
    doc.text(`Date: ${new Date(note.Date).toLocaleDateString()}`, 10, 30);
    doc.text(`Language: ${note.Language}`, 10, 40);
    doc.text(`Important: ${note.Important}`, 10, 50);
    doc.text(`Content:`, 10, 60);
    doc.text(note.Content, 10, 70);
    doc.save(`${note.Title}.pdf`);
  };

  const filteredNotes = notes.filter(note => 
    note.Language.toLowerCase().includes(searchLanguage.toLowerCase())
  );

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3">My Notes</h1>

      {/* Display success message if it exists and is visible */}
      {showSuccessMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {location.state.successMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Search by language"
        value={searchLanguage}
        onChange={handleSearchChange}
        className="p-2 w-full rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-col gap-4 p-5">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note._id} className="bg-slate-100 p-3 rounded-lg shadow-md">
              <h2 className="text-xl font-medium">{note.Title}</h2>
              <p className="text-sm text-gray-600">Course: {note.Course}</p>
              <p className="text-sm text-gray-600">Date: {new Date(note.Date).toLocaleDateString()}</p>
              <p className="mt-2">{note.Content}</p>
              <p className="mt-2 text-red-500 font-semibold">Important: {note.Important}</p>
              <p className="text-sm text-gray-600">Language: {note.Language}</p>

              <div>
                <button
                  onClick={() => navigate(`/update/${note._id}`)}
                  className="bg-yellow-500 text-white p-2 rounded-lg mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 text-white p-2 rounded-lg mt-2 ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => generatePDF(note)}
                  className="bg-green-500 text-white p-2 rounded-lg mt-2 ml-2"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notes available</p>
        )}
      </div>

      {/* Plus Button for adding a new note */}
      <button
        onClick={() => navigate('/quicknote')}
        className="fixed bottom-10 right-10 bg-blue-500 text-white rounded-md p-4 shadow-lg"
        style={{ fontSize: '24px' }}
      >
        +
      </button>
    </div>
  );
}

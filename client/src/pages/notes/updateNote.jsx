import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    Course: '',
    Date: '',
    Title: '',
    Language: '',
    Content: '',
    Important: ''
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/create/note/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error.message);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/create/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Course: note.Course,
          Title: note.Title,
          Language: note.Language,
          Content: note.Content,
          Important: note.Important
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      navigate('/mynotes', { state: { successMessage: 'Update was successful!' } });
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };
  
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold p-3">Update Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="Title"
            value={note.Title}
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <input
            type="text"
            name="Course"
            value={note.Course}
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="Date"
            value={note.Date ? new Date(note.Date).toISOString().split('T')[0] : ''} // Check if note.Date exists and is valid
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-gray-400"
          />

        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
                name="Language"
                value={note.Language}
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-gray-400"
            >
                <option value="">Select a language</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                {/* Add more options as needed */}
            </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="Content"
            value={note.Content}
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-gray-400"
            rows="10"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Important</label>
          <input
            type="text"
            name="Important"
            value={note.Important}
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-gray-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const UpdateQuestion = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    errorCode: '',
    notes: '',
    programmingLanguages: [],
  });
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetch(`http://localhost:3000/api/questions/questions/${id}`) // Ensure you're using the correct backend port (3000)
      .then((res) => {
        console.log("Full response from server:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setFormData(data.question || data); // Set the formData based on the backend response
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching question:', err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          programmingLanguages: [...formData.programmingLanguages, value],
        });
      } else {
        setFormData({
          ...formData,
          programmingLanguages: formData.programmingLanguages.filter(
            (lang) => lang !== value
          ),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/questions/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }
        return res.json();
      })
      .then((data) => {
        console.log('Question updated:', data);
        navigate(`/questions/${id}`); // Navigate to the question details page
      })
      .catch((err) => console.error('Error updating question:', err.message));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Update Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData?.name || ''} // Use optional chaining here
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData?.description || ''} // Optional chaining here too
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="errorCode" className="block text-sm font-medium text-gray-700">
            Error Code:
          </label>
          <input
            type="text"
            id="errorCode"
            name="errorCode"
            value={formData?.errorCode || ''} // Optional chaining for errorCode
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes:
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData?.notes || ''} // Optional chaining for notes
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Programming Languages:</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="programmingLanguages"
                value="JavaScript"
                checked={formData?.programmingLanguages?.includes('JavaScript')} // Optional chaining here
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">JavaScript</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="programmingLanguages"
                value="Python"
                checked={formData?.programmingLanguages?.includes('Python')} // Optional chaining
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Python</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="programmingLanguages"
                value="Java"
                checked={formData?.programmingLanguages?.includes('Java')} // Optional chaining
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Java</span>
            </label>
            {/* Add other languages similarly */}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestion;

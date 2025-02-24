import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  const [selectedLanguage, setSelectedLanguage] = useState(""); // State for the selected language filter
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/project/projects", {
      credentials: "include", // Include credentials for authentication
    })
      .then((response) => {
        if (response.status === 401) {
          console.error("Unauthorized access, please log in.");
          return [];
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`http://localhost:3000/project/projects/${id}`, {
        method: "DELETE",
        credentials: "include", // Include credentials for authentication
      })
        .then(() => {
          setProjects(projects.filter((project) => project._id !== id));
        })
        .catch((error) => console.error("Error deleting project:", error));
    }
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  // Filter projects based on search term (matches both name and language) and selected language
  const filteredProjects = projects.filter((project) =>
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.language.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLanguage === "" || project.language === selectedLanguage)
  );

  // Get unique languages for the filter dropdown
  const uniqueLanguages = [...new Set(projects.map((project) => project.language))];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-black text-center mb-6">Project List</h1>

      {/* Filter and Search Bar Container */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Dropdown (Left) */}
        <div className="w-full md:w-1/4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">All Languages</option>
            {uniqueLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar (Right) */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search projects by name or language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <li
              key={project._id}
              className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {project.name}
              </h2>
              <p className="text-sm text-gray-400 mb-4">Language: {project.language}</p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(project._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-center">No projects found. Save your first project!</p>
      )}
    </div>
  );
};

export default ProjectList;

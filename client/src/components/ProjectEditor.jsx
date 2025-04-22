import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [outputLogs, setOutputLogs] = useState("");
  const [status, setStatus] = useState("Run");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/project/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch project: " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          const { name, code, language } = data;
          setProjectName(name || "");
          setCode(code || "");
          setLanguage(language || "java");
        })
        .catch((error) => console.error("Error fetching project:", error));
    }
  }, [id]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const runCode = async () => {
    setStatus("Loading...");
    try {
      const response = await fetch("http://localhost:3000/ide/runCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await response.json();
      setOutputLogs(data.output || "No output or error occurred.");
      setStatus("Run");
    } catch (error) {
      setOutputLogs("Execution error occurred.");
      setStatus("Run");
    }
  };

  const saveProject = async () => {
    if (!projectName) {
      alert("Project name is required.");
      return;
    }

    const projectData = {
      name: projectName,
      code,
      language,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/project/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        navigate("/projects");
      } else {
        const errorData = await response.json();
        console.error("Error updating project:", errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <header
        className={`py-4 mb-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          }`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <input
              type="text"
              placeholder="Project Name"
              className={`border ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} px-4 py-2 rounded w-48`}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <select
              onChange={(e) => setLanguage(e.target.value)}
              className={`border ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} px-4 py-2 rounded w-48`}
              value={language}
            >
              <option value="java">Frontend Technology</option>
              <option value="python">Backend Technology</option>
              <option value="cpp17">FullStack Technology</option>
            </select>
            <button
              onClick={runCode}
              disabled={status !== "Run"}
              className={`${
                status === "Run"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105`}
            >
              {status}
            </button>
            <button
              onClick={saveProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Save Changes
            </button>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`bg-${isDarkMode ? "yellow" : "gray"}-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105`}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <div className="w-2/3 pr-4">
          <div
            className={`border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} rounded-lg shadow-lg p-4`}
            style={{ height: "720px" }}
          >
            <h3 className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"} mb-2`}>Editor</h3>
            <MonacoEditor
              height="90%"
              defaultLanguage={language}
              value={code}
              theme={isDarkMode ? "vs-dark" : "vs-light"}
              onChange={(newValue) => setCode(newValue)}
            />
          </div>
        </div>

        <div className="w-1/3 flex flex-col space-y-4" style={{ height: "600px" }}>
          <div
            className={`border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} rounded-lg shadow-lg p-4`}
            style={{ height: "350px" }}
          >
            <h3 className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"} mb-2`}>Input Parameters</h3>
            <MonacoEditor
              height="90%"
              defaultLanguage="text"
              value={input}
              theme={isDarkMode ? "vs-dark" : "vs-light"}
              onChange={(newValue) => setInput(newValue)}
            />
          </div>

          <div
            className={`border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} rounded-lg shadow-lg p-4`}
            style={{ height: "350px" }}
          >
            <h3 className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"} mb-2`}>Output Logs</h3>
            <MonacoEditor
              height="90%"
              defaultLanguage="text"
              value={outputLogs}
              theme={isDarkMode ? "vs-dark" : "vs-light"}
              options={{ readOnly: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;

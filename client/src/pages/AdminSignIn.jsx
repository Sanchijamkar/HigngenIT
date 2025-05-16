import React, { useState } from "react";
import "./AdminSignIn.css";
import { useNavigate } from "react-router-dom"; // Correct hook for React Router v6
import { useDispatch } from "react-redux"; // Import dispatch to dispatch actions
import { loginSuccess } from "../redux/user/userSlice"; // Import loginSuccess action

const AdminSignIn = () => {
  const [email, setEmail] = useState("");  // State to store the email input
  const [password, setPassword] = useState("");  // State to store the password input
  const [error, setError] = useState("");  // State to handle errors
  const [loading, setLoading] = useState(false); // New loading state to show a loading indicator during login

  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const dispatch = useDispatch(); // Initialize dispatch for Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset any previous error messages
    setLoading(true); // Set loading to true when the request starts

    try {
      // Make a POST request to the backend to sign in the admin
      const res = await fetch("http://localhost:5001/api/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail: email, adminPassword: password }), // Correct key names (adminEmail and adminPassword)
      });

      setLoading(false); // Set loading to false once the response is received

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to login");
        return;
      }

      const data = await res.json();  // Get the response data
      console.log("Server Response:", data); // Log the entire response to check

      const token = data.token;  // Get the token from the response

      if (!token) {
        setError("Token not received. Please check the server response.");
        return;
      }

      // Store the token in localStorage for persistent login state
      localStorage.setItem("adminToken", token);

      // Dispatch the loginSuccess action with the user data (including isAdmin flag)
      dispatch(loginSuccess(data.user));

      // Redirect to appropriate page based on the admin status
      if (data.user && data.user.isAdmin) {
        navigate("/admin/dashboard");  // Admins go to the Admin Panel
      } else {
        navigate("/profile");  // Non-admin users go to their profile page
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false); // Stop loading in case of error
      setError("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="admin-signin-container">
      <form className="admin-signin-form" onSubmit={handleSubmit}>
        <h2>Admin Sign In</h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminSignIn;

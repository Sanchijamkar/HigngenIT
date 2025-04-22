import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error message states for each field
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'name') {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (!nameRegex.test(value)) {
        setNameError('Only letters and spaces are allowed.');
        return;
      } else {
        setNameError(''); // Clear error if valid
      }
    }

    if (id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError(''); // Clear error if valid
      }
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    // Validate name
    if (!nameRegex.test(formData.name)) {
      setNameError('Please enter a valid name. Only letters and spaces are allowed.');
      valid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate message
    if (formData.message.trim() === '') {
      setMessageError('Please enter a message.');
      valid = false;
    } else {
      setMessageError('');
    }

    // Stop submission if any validation fails
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        }); // Clear the form after submission
      } else {
        setStatusMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatusMessage('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section with Background Image */}
      <section
        className=" text-white py-20 relative"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/portrait-asian-girl-works-cafe-uses-laptop-sits-outdoors-street-digital-nomad_1258-189137.jpg?t=st=1728108437~exp=1728112037~hmac=fd9bbfd89fa7808af77e99050830efecb773aa94fd797bbe673822f1ee58f7d7&w=996')`, // Add your background image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '700px',
        }}
      >
        <div className="absolute inset-0 bg-opacity-70"></div> {/* Blue overlay for better readability */}
        <div className="container mx-auto px-5 text-center relative z-10"> {/* Text should be in front of the image */}
          <h1 className="text-6xl font-bold mb-4 mt-44">Contact HighGenIT</h1>
          <p className="text-2xl mb-8">
            Have any questions? We're here to help you on your coding journey!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-20 px-5">
        <h2 className="text-3xl font-bold text-center mb-10">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 mb-2">Your Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter your message"
                required
              ></textarea>
              {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Message */}
            {statusMessage && (
              <p className="text-blue-700 mt-5">{statusMessage}</p>
            )}
          </form>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h3>
            <ul className="text-gray-600">
              <li className="mb-4">
                <i className="fas fa-envelope mr-2"></i>
                <strong>Email:</strong> contact@HighGenIT.com
              </li>
              <li className="mb-4">
                <i className="fas fa-phone mr-2"></i>
                <strong>Phone:</strong> +1 (234) 567-8900
              </li>
              <li className="mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <strong>Address:</strong> 123 Coding Street, Tech City, USA
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Optional Map Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-6">Find Us on the Map</h2>
          <iframe
            className="w-full h-64 md:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.64950429343!2d79.95685583717757!3d6.914787775601566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2509e6697b437%3A0x789b1eebd58930a2!2sSLIIT%20Main%20Campus!5e0!3m2!1sen!2slk!4v1695845554815!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            title="EduCode Location at SLIIT"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; 2024 HighGenIT. Empowering the next generation of coders.</p>
      </footer>
    </div>
  );
}

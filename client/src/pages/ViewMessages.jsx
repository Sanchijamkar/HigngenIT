import React, { useState, useEffect } from 'react';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/contact/messages');
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Contact Messages</h2>
      <div className="grid grid-cols-1 gap-5">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">{message.name}</h3>
              <p className="text-sm text-gray-600">{message.email}</p>
              <p className="mt-2">{message.message}</p>
              <p className="text-xs text-gray-500 mt-2">Submitted on {new Date(message.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
}

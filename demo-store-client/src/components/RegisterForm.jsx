import React, { useState } from 'react';
// import api from '../api/client';
import api from "../api/axios";

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', { username, password });
      setMessage(`✅ Registered as ${res.data.username}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Registration failed'}`);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
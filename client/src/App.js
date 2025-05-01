import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { phone, location });
      setMessage("You've been registered for rain alerts!");
      setMessageType('success');
    } catch (error) {
      setMessage("Failed to register for rain alerts.");
      setMessageType('error');
    }
  };

  const handleTestAlert = async () => {
    try {
      const response = await axios.post('/api/test-alert', { phone, location });
      setMessage(response.data.message);
      setMessageType('success');
    } catch (error) {
      setMessage("Failed to send test alert.");
      setMessageType('error');
    }
  };

  return (
    <div className="app-layout">
      <div className="container">
        <h2>🌧️ Rain Alert Signup</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="📱 WhatsApp Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="📍 Location (City)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />
          <div className="btn-group">
            <button type="submit" className="btn primary">Register</button>
            <button type="button" onClick={handleTestAlert} className="btn secondary">
              Test Alert
            </button>
          </div>
        </form>
        {message && (
          <p className={`message ${messageType}`}>{message}</p>
        )}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Rain Alert Service. All rights reserved. This Project is made with ❤️ by Madhav Tiwari</p>
      </footer>
    </div>
  );
}

export default App;

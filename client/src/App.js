import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Add this line if you place the styles in App.css

function App() {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { phone, location });
      alert("You've been registered for rain alerts!");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register for rain alerts.");
    }
  };

  const handleTestAlert = async () => {
    try {
      const response = await axios.post('/api/test-alert', { phone, location });
      setMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending test alert:", error);
      alert("Failed to send test alert.");
    }
  };

  return (
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
        <button type="submit" className="btn primary">Register</button>
        <button type="button" onClick={handleTestAlert} className="btn secondary">
          Send Test Alert
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;

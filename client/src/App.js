// // client/src/App.js
// import { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('/api/register', { phone, location });
//     alert("You've been registered for rain alerts!");
//   };

//   const handleTestAlert = async () => {
//     try {
//       await axios.post('/api/test-alert', { phone, location });
//       alert("Test rain alert sent!");
//     } catch (error) {
//       console.error("Error sending test alert:", error);
//       alert("Failed to send test alert.");
//     }
//   };
  

//   return (
//     <div className="App">
//       <h2>🌧️ Rain Alert Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="WhatsApp Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
//         <input placeholder="Location (City)" value={location} onChange={(e) => setLocation(e.target.value)} />
//         <button type="submit">Register</button>
//         <button type="button" onClick={handleTestAlert}>Send Test Alert</button>

//       </form>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import axios from 'axios';

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
      setMessage(response.data.message); // Set response message to display in UI
      alert(response.data.message); // Alert user with the response message
    } catch (error) {
      console.error("Error sending test alert:", error);
      alert("Failed to send test alert.");
    }
  };

  return (
    <div className="App">
      <h2>🌧️ Rain Alert Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="WhatsApp Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (City)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <button type="button" onClick={handleTestAlert}>
        Send Test Alert
      </button>

      {message && <p>{message}</p>} {/* Display the message if available */}
    </div>
  );
}

export default App;

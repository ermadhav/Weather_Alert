// // server/index.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cron = require('node-cron');
// const axios = require('axios');
// const twilio = require('twilio');
// const User = require('./models/User');

// const app = express();
// app.use(express.json());

// // Twilio config
// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// // Connect to MongoDB
// console.log("MONGO_URI =", process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI);

// // POST route to save user info
// // app.post('/api/register', async (req, res) => {
// //   const { phone, location } = req.body;
// //   const user = new User({ phone, location });
// //   await user.save();
// //   res.send('Registered for rain alerts!');
// // });  

// // Check weather every hour
// cron.schedule('0 * * * *', async () => {
//   const users = await User.find();
//   for (const user of users) {
//     const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${process.env.WEATHER_API}`);
//     const description = weatherRes.data.weather[0].description;
//     if (description.includes("rain")) {
//       await client.messages.create({
//         body: `🌧️ Alert: It's going to rain in ${user.location}!`,
//         from: 'whatsapp:' + process.env.TWILIO_NUMBER,
//         to: 'whatsapp:' + user.phone,
//       });
//     }
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const twilio = require('twilio');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Twilio config
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Connect to MongoDB
console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

// POST route to save user info
app.post('/api/register', async (req, res) => {
  const { phone, location } = req.body;
  const user = new User({ phone, location });
  await user.save();
  res.send('Registered for rain alerts!');
});

// Test route to trigger a manual rain alert
app.post('/api/test-alert', async (req, res) => {
  const { phone, location } = req.body;

  console.log('Test Alert received:', { phone, location });

  if (!phone || !location) {
    console.error('Phone number or location missing');
    return res.status(400).json({ message: 'Phone number and location are required.' });
  }

  try {
    // Make weather API call to check rain status for the given location
    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API}`);
    
    console.log("Weather API response:", weatherRes.data); // Debugging response

    const description = weatherRes.data.weather[0].description;

    if (description.includes("rain")) {
      // Send a test rain alert via Twilio
      console.log('Sending rain alert via Twilio...');
      const message = await client.messages.create({
        body: `🌧️ Test Alert: It's going to rain in ${location}!`,
        from: 'whatsapp:' + process.env.TWILIO_NUMBER,
        to: 'whatsapp:' + phone,
      });

      console.log('Message sent successfully:', message.sid);
      res.json({ message: 'Test rain alert sent!' });
    } else {
      console.log('No rain in the forecast for the given location.');
      res.json({ message: 'No rain in the forecast for the given location.' });
    }
  } catch (error) {
    console.error("Error with weather API or Twilio:", error);
    res.status(500).json({ message: 'Error sending test alert.', error: error.message });
  }
});

// Check weather every hour
cron.schedule('0 * * * *', async () => {
  const users = await User.find();
  for (const user of users) {
    try {
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${process.env.WEATHER_API}`);
      const description = weatherRes.data.weather[0].description;

      if (description.includes("rain")) {
        await client.messages.create({
          body: `🌧️ Alert: It's going to rain in ${user.location}!`,
          from: 'whatsapp:' + process.env.TWILIO_NUMBER,
          to: 'whatsapp:' + user.phone,
        });
      }
    } catch (error) {
      console.error("Error checking weather for user:", user.phone, error);
    }
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

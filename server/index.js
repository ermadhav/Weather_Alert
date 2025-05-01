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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Helper function to validate phone numbers
const formatPhone = (phone) => {
  if (!phone.startsWith('+')) {
    return '+91' + phone; // Default to India if missing country code (customize if needed)
  }
  return phone;
};

// POST route to register user for alerts
app.post('/api/register', async (req, res) => {
  const { phone, location } = req.body;

  if (!phone || !location) {
    return res.status(400).json({ message: 'Phone number and location are required.' });
  }

  try {
    const user = new User({ phone: formatPhone(phone), location });
    await user.save();
    res.send('✅ Registered for rain alerts!');
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Route to trigger a manual test alert
app.post('/api/test-alert', async (req, res) => {
  const { phone, location } = req.body;
  const formattedPhone = formatPhone(phone);

  if (!formattedPhone || !location) {
    return res.status(400).json({ message: 'Phone number and location are required.' });
  }

  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API}`
    );

    console.log("Weather API response:", weatherRes.data);

    const description = weatherRes.data.weather[0].description;

    if (description.includes("rain")) {
      console.log('🌧️ Sending rain alert via Twilio...');
      const message = await client.messages.create({
        body: `🌧️ Test Alert: It's going to rain in ${location}!`,
        from: 'whatsapp:' + process.env.TWILIO_NUMBER,
        to: 'whatsapp:' + formattedPhone
      });

      console.log('Message sent:', message.sid);
      res.json({ message: '✅ Test rain alert sent!' });
    } else {
      res.json({ message: '🌤️ No rain in the forecast for the given location.' });
    }
  } catch (error) {
    console.error("Test alert error:", error);
    res.status(500).json({
      message: 'Error sending test alert.',
      error: error.message
    });
  }
});

// Cron job to check weather hourly and send alerts
cron.schedule('0 * * * *', async () => {
  console.log("🔁 Running hourly weather check...");
  const users = await User.find();

  for (const user of users) {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${process.env.WEATHER_API}`
      );

      const description = weatherRes.data.weather[0].description;

      if (description.includes("rain")) {
        await client.messages.create({
          body: `🌧️ Alert: It's going to rain in ${user.location}!`,
          from: 'whatsapp:' + process.env.TWILIO_NUMBER,
          to: 'whatsapp:' + user.phone
        });

        console.log(`✔️ Alert sent to ${user.phone}`);
      }
    } catch (error) {
      console.error(`❌ Error sending alert to ${user.phone}:`, error.message);
    }
  }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

Here's a complete **`README.md`** file for your Rain Alert WhatsApp project, formatted for GitHub:

---

```markdown
# 🌧️ Rain Alert WhatsApp Bot

This project sends automated **rain alerts via WhatsApp** using:

- 🌦️ [OpenWeatherMap](https://openweathermap.org/api) API for real-time weather data
- 📲 [Twilio WhatsApp API](https://www.twilio.com/whatsapp) for messaging
- 🛢️ MongoDB for storing registered users
- 🕒 Node.js `cron` jobs for hourly weather checks
- ⚛️ React frontend for user registration

---

## 📦 Features

- Users can register with phone number & city
- Hourly weather checks for rain in registered cities
- WhatsApp message sent automatically if rain is forecasted
- Manual test alert feature to simulate and verify functionality

---

## 🛠️ Tech Stack

| Technology     | Usage                          |
|----------------|--------------------------------|
| React          | Frontend user registration     |
| Express.js     | Backend API                    |
| MongoDB        | User data storage              |
| Mongoose       | MongoDB ODM                    |
| Axios          | HTTP requests                  |
| Twilio         | WhatsApp messaging             |
| OpenWeatherMap | Weather forecast               |
| node-cron      | Scheduled tasks                |

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/rain-alert-whatsapp.git
cd rain-alert-whatsapp
```

### 2. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rainalert
WEATHER_API=your_openweathermap_api_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth_token
TWILIO_NUMBER=+14155238886  # Twilio sandbox number for WhatsApp
```

> 💡 Get your OpenWeatherMap API key from [here](https://openweathermap.org/api), and Twilio credentials from your [Twilio Console](https://www.twilio.com/console).

### 4. Join Twilio Sandbox (once)

Send the code shown in your [Twilio WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox) to:

```
📲 +14155238886 (Twilio Sandbox Number)
```

---

## 🚀 Running the App

### Start Backend

```bash
cd server
node index.js
```

### Start Frontend

```bash
cd client
npm start
```

Visit: `http://localhost:3000`

---

## ✅ Testing a Rain Alert

1. Enter a **WhatsApp number** and a **location** (e.g., `Nagasaki`)
2. Click **Register**
3. Click the **"Send Test Alert"** button to simulate a rain event
4. Check your WhatsApp for the alert message

> ⚠️ Ensure you're still connected to Twilio's sandbox.

---

## 🗓️ Scheduled Alerts

- The backend checks for rain **every hour**
- If it detects rain in a registered user's location, it sends a WhatsApp alert

---

## 📌 Notes

- You must use the **Twilio Sandbox number** in development.
- Twilio limits apply in the free tier — only sandbox-approved numbers can receive messages.

---

## 📄 License

This project is open-source and free to use.

---

## 💬 Contact

For help or suggestions, open an issue or connect on [LinkedIn](https://www.linkedin.com/).

```

---

Let me know if you'd like me to generate a `README.md` file directly for download.

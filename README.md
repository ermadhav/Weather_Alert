Here’s a professional and complete `README.md` file for your **Rain Alert WhatsApp Bot** project:

---


### 🌧️ Rain Alert WhatsApp Bot

Automatically receive WhatsApp notifications when it's about to rain in your area! This full-stack web application allows users to register their location and phone number to get timely rain alerts via WhatsApp.

---

## 🚀 Features

- 🌍 User registration with location and phone number via a React frontend  
- ☁️ Periodic weather checks using the OpenWeatherMap API  
- 📦 Backend built with Node.js and Express, using MongoDB for data storage  
- 📲 WhatsApp alerts delivered via Twilio when rain is forecasted  
- 🕒 Hourly cron job to check and notify all affected users  
- 🔔 Manual test alert trigger to verify notification setup  

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- Axios  

**Backend:**  
- Node.js  
- Express  
- MongoDB (Mongoose)  
- Twilio API  
- OpenWeatherMap API  
- node-cron  

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/rain-alert-whatsapp-bot.git
cd rain-alert-whatsapp-bot
```

### 2. Setup environment variables

Create a `.env` file in the root of the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweathermap_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 3. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the App

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd ../frontend
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## 🧪 Testing Alerts

You can trigger a manual test alert using the following endpoint:

```http
POST /api/test-alert
```

Include a JSON body with a registered user’s phone number or location.

---

## 📅 Cron Job

A background cron job runs **every hour** to:

1. Fetch weather data for each registered user’s location.
2. If rain is detected, send a WhatsApp alert via Twilio.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your idea.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

Created by [Your Name](https://github.com/yourusername)  
For any questions, feel free to open an issue or contact directly.

```

---

Would you like me to generate a logo or diagram to include in the README as well?

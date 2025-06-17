# 🌤️ Weather Journal App

A simple full-stack JavaScript weather journal app that fetches weather data based on user-entered ZIP code and country, then displays the data along with how the user is feeling. The project integrates with the [OpenWeatherMap API](https://openweathermap.org/api) and demonstrates front-end and back-end communication.

---

## 🚀 Live Demo

> _This project is currently not hosted. Follow the steps below to run it locally._

---

## 🧠 Skills & Concepts Learned

- ✅ Modern JavaScript (ES6+)
- ✅ Asynchronous programming with `fetch`, Promises, and `async/await`
- ✅ REST API integration (OpenWeatherMap)
- ✅ Front-end development using HTML, CSS, and Bootstrap
- ✅ Node.js and Express.js for backend
- ✅ Local server setup and route handling
- ✅ User input handling and dynamic UI updates

---

## 📁 Project Structure

weather-journal-app/
│
├── server.js # Express backend
├── package.json # Node dependencies
├── package-lock
├── README.md
├── public/
│ ├── index.html # Main UI
│ ├── app.js # Front-end logic
│ ├── style.css # Custom styling
│ ├── normalize.css # CSS reset
│ └── images/ # Weather icons (optional)


---

## 🛠️ Getting Started Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/weather-journal-app.git
cd weather-journal-app

2️⃣ Install the required packages
npm install

3️⃣ Add your API Key
In the website/app.js file, replace the placeholder key with your actual OpenWeatherMap API key:
const key = "&appid=YOUR_API_KEY&units=metric";
Get your key from https://openweathermap.org/appid

4️⃣ Run the server
node server.js

5️⃣ Open the app in your browser
http://localhost:3000

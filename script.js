// Weather API (OpenWeather - you can use your own API key)
const apiKey = "YOUR_API_KEY"; // Replace with your API key from https://openweathermap.org/

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city!");

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await res.json();

  if (data.cod === "404") {
    document.getElementById("weather").innerHTML = "<p>❌ City not found!</p>";
    return;
  }

  document.getElementById("weather").innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡 Temp: ${data.main.temp} °C</p>
    <p>🌥 Condition: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;

  // Dynamic background
  let condition = data.weather[0].main.toLowerCase();
  if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(to right, #d1d5db, #e5e7eb)";
  } else if (condition.includes("rain")) {
    document.body.style.background = "linear-gradient(to right, #3b82f6, #1e3a8a)";
  } else {
    document.body.style.background = "linear-gradient(to right, #fef08a, #fde68a)";
  }
}

// Carousel Logic
function startCarousel() {
  let tips = document.querySelectorAll("#tips-carousel p");
  let i = 0;
  setInterval(() => {
    tips[i].classList.remove("active");
    i = (i + 1) % tips.length;
    tips[i].classList.add("active");
  }, 3000);
}

// Quiz Logic
const quizQuestions = [
  { q: "Is the sun a star?", a: true },
  { q: "Does it snow in deserts?", a: false },
  { q: "Is wind caused by air pressure differences?", a: true }
];

let currentQ = 0;
document.getElementById("question").innerText = quizQuestions[currentQ].q;

function checkAnswer(ans) {
  let result = document.getElementById("result");
  if(ans === quizQuestions[currentQ].a) {
    result.innerText = "✅ Correct!";
  } else {
    result.innerText = "❌ Wrong!";
  }
  currentQ = (currentQ + 1) % quizQuestions.length;
  setTimeout(() => {
    document.getElementById("question").innerText = quizQuestions[currentQ].q;
    result.innerText = "";
  }, 1000);
}

// Start carousel when page loads
startCarousel();
// --- Vérification du token (connexion obligatoire)
const token = localStorage.getItem('token');
if (!token) {
  alert("Veuillez vous connecter d'abord.");
  window.location.href = "login.html";
}

const questions = [
  {
    text: "Quelle est la capitale de l’Espagne ?",
    choices: ["Madrid", "Barcelone", "Valence"],
    answer: "Madrid"
  },
  {
    text: "2 + 3 × 4 = ?",
    choices: ["14", "20", "24"],
    answer: "14"
  },
  {
    text: "Le HTML est un langage de...",
    choices: ["Programmation", "Marquage", "Compilation"],
    answer: "Marquage"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedAnswer = null;

// --- Démarrer la géolocalisation
function startGeolocation() {
  if (!navigator.geolocation) {
    alert("La géolocalisation n'est pas supportée.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);

      document.getElementById("geo-section").classList.add("hidden");
      document.getElementById("exam-section").classList.remove("hidden");
      showQuestion();
    },
    () => alert("La géolocalisation est requise pour démarrer l'examen.")
  );
}

// --- Afficher une question
function showQuestion() {
  selectedAnswer = null;
  const question = questions[currentQuestion];
  document.getElementById("question-title").textContent = `Question ${currentQuestion + 1}`;
  document.getElementById("question-text").textContent = question.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  question.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      selectedAnswer = choice;
      document.querySelectorAll("#choices button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    choicesDiv.appendChild(btn);
  });

  startTimer();
}

// --- Timer 10s/question
function startTimer() {
  timeLeft = 10;
  document.getElementById("time").textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// --- Passer à la question suivante
function nextQuestion() {
  clearInterval(timer);

  if (selectedAnswer === questions[currentQuestion].answer) {
    score += Math.floor(100 / questions.length);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// --- Affichage du score final
function showResult() {
  document.getElementById("exam-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
  document.getElementById("score").textContent = score;
}

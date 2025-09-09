const questions = [
    { id: 1, text: "Combien y a-t-il de fenêtres sur la façade avant de la chapelle ?", answer: "7" },
    { id: 2, text: "Le coeur de la vierge marie cache un code", answer: "1309" },
    { id: 3, text: "Je suis là quand tu veux t’asseoir et rêver un peu. Que suis-je ?", answer: "banc" },
    { id: 4, text: "Je coule sans jamais m’arrêter et traverse la sortie de la forêt. Que suis-je ?", answer: "rivière" },
    { id: 5, text: "Quelle est la couleur du champignon d’or ?", answer: "or" },
    { id: 6, text: "Quel est le prénom du champignon gardien ?", answer: "champillou" },
    { id: 7, text: "Combien de runes faut-il trouver pour ouvrir la boîte ?", answer: "8" },
    {
        id: 8,
        text: `Additionne les temps pour Ventron Centre et Cornimont Voie Verte. Quel chiffre obtiens-tu (somme des chiffres) ?<br><br>
        <img src="lampe.jpg" alt="Photo d'indice" style="max-width: 100%; border-radius: 10px; box-shadow: 0 0 10px rgba(255,255,255,0.2);">`,
        answer: "2h05"
    }
];

let correctAnswers = 0;
let currentQuestionIndex = 0;
let time = 1800;
let timerInterval;

function createQuestion(index) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";
  const q = questions[index];
  const block = document.createElement("div");
  block.className = "question-block";
  block.id = `question-${q.id}`;
  block.innerHTML = `
    <p><strong>Énigme ${q.id} :</strong> ${q.text}</p>
    <input type="text" id="answer-${q.id}" placeholder="Ta réponse">
    <button onclick="checkAnswer(${q.id})">Valider</button>
    <p id="result-${q.id}"></p>
  `;
  container.appendChild(block);
}

function checkAnswer(id) {
  const question = questions.find(q => q.id === id);
  const input = document.getElementById(`answer-${id}`);
  const userInput = input.value.trim().toLowerCase();
  const resultEl = document.getElementById(`result-${id}`);
  const block = document.getElementById(`question-${id}`);

  if (userInput === question.answer.toLowerCase()) {
    if (!resultEl.classList.contains("validated")) {
      resultEl.innerHTML = "✅ Bonne réponse !";
      resultEl.classList.add("validated");
      input.disabled = true;
      block.classList.add("correct");
      correctAnswers++;
      updateCounter();
      if (correctAnswers === questions.length) {
        document.getElementById("final-code").classList.remove("hidden");
      } else {
        currentQuestionIndex++;
        setTimeout(() => createQuestion(currentQuestionIndex), 500);
      }
    }
  } else {
    resultEl.innerHTML = "❌ Essaie encore...";
  }
}

function updateCounter() {
  const counter = document.getElementById("counter");
  counter.textContent = `Runes trouvées : ${correctAnswers} / ${questions.length}`;
}

function resetGame() {
  correctAnswers = 0;
  currentQuestionIndex = 0;
  document.getElementById("final-code").classList.add("hidden");
  updateCounter();
  time = 1800;
  clearInterval(timerInterval);
  startTimer();
  createQuestion(currentQuestionIndex);
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (time === 0) {
      clearInterval(timerInterval);
      alert("⏰ Temps écoulé !");
    }
    time--;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  createQuestion(currentQuestionIndex);
  startTimer();
});

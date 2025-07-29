
const questions = [
    { id: 1, text: "Combien y a-t-il de fenêtres sur la façade avant de la chapelle ?", answer: "7" },
    { id: 2, text: "Quel est le code magique si tu ajoutes 2h30 et 2h00 ?", answer: "9" },
    { id: 3, text: "Je suis là quand tu veux t’asseoir et rêver un peu. Que suis-je ?", answer: "banc" },
    { id: 4, text: "Je coule sans jamais m’arrêter et traverse la sortie de la forêt. Que suis-je ?", answer: "rivière" },
    { id: 5, text: "Quelle est la couleur du champignon d’or ?", answer: "jaune" },
    { id: 6, text: "Quel est le prénom du champignon gardien ?", answer: "Champillou" },
    { id: 7, text: "Combien de runes faut-il trouver pour ouvrir la boîte ?", answer: "8" },
    { id: 8, text: "Additionne les temps pour Ventron Centre et Cornimont Voie Verte. Quel chiffre obtiens-tu (somme des chiffres) ?", answer: "8" }
];

let correctAnswers = 0;
const totalQuestions = questions.length;

function createQuestions() {
    const container = document.getElementById("questions-container");
    questions.forEach(q => {
        const block = document.createElement("div");
        block.className = "question-block";
        block.innerHTML = `
            <p><strong>Énigme ${q.id} :</strong> ${q.text}</p>
            <input type="text" id="answer-${q.id}" placeholder="Ta réponse">
            <button onclick="checkAnswer(${q.id})">Valider</button>
            <p id="result-${q.id}"></p>
        `;
        container.appendChild(block);
    });
}

function checkAnswer(id) {
    const question = questions.find(q => q.id === id);
    const userInput = document.getElementById("answer-" + id).value.trim().toLowerCase();
    if (userInput === question.answer.toLowerCase()) {
        document.getElementById("result-" + id).innerHTML = "✅ Bonne réponse !";
        document.getElementById("answer-" + id).disabled = true;
        correctAnswers++;
        if (correctAnswers === totalQuestions) {
            document.getElementById("final-code").classList.remove("hidden");
        }
    } else {
        document.getElementById("result-" + id).innerHTML = "❌ Essaie encore...";
    }
}

// Timer 30 minutes
let time = 1800;
const timerElement = document.getElementById("timer");

function startTimer() {
    const timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.innerText = \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
        if (time === 0) {
            clearInterval(timer);
            alert("⏰ Temps écoulé !");
        }
        time--;
    }, 1000);
}

window.onload = () => {
    createQuestions();
    startTimer();
};


function switchTab(tab) {
  const tabs = ['create', 'view', 'manage'];
  tabs.forEach(t => {
    document.getElementById('tab-' + t).classList.add('hidden');
    document.querySelector(`.tab-button[onclick="switchTab('${t}')"]`).classList.remove('active-tab');
  });
  document.getElementById('tab-' + tab).classList.remove('hidden');
  document.querySelector(`.tab-button[onclick="switchTab('${tab}')"]`).classList.add('active-tab');

  if (tab === 'view') {
    displayExams();
  }
}


document.getElementById('exam-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const publicTarget = document.getElementById('public').value;

  const uniqueLink = `https://examplatform.com/exam/${Date.now()}`;
  document.getElementById('link').value = uniqueLink;
  document.getElementById('exam-link').classList.remove('hidden');
  document.getElementById('question-section').classList.remove('hidden');

  const exam = {
    id: Date.now(),
    title,
    description,
    publicTarget,
    link: uniqueLink,
    questions: []
  };

  localStorage.setItem('currentExam', JSON.stringify(exam));
});


function copyLink() {
  const linkInput = document.getElementById('link');
  linkInput.select();
  document.execCommand('copy');
  alert('Lien copié dans le presse-papiers.');
}

function showQuestionForm(type) {
  const container = document.getElementById('question-form-container');
  container.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'question-form';

  form.innerHTML = `
    <label>Énoncé de la question :</label>
    <textarea id="enonce" required></textarea>
    <label>Joindre un média :</label>
    <input type="file" id="media">
    <label>Note pour cette question :</label>
    <input type="number" id="note" required>
    <label>Durée (en secondes) :</label>
    <input type="number" id="duree" required>
  `;

  if (type === 'qcm') {
    form.innerHTML += `
      <label>Options (séparées par des points-virgules) :</label>
      <input type="text" id="options" required>
      <label>Réponses correctes (indices séparés par des virgules) :</label>
      <input type="text" id="correct" required>
    `;
  } else if (type === 'direct') {
    form.innerHTML += `
      <label>Réponse attendue :</label>
      <input type="text" id="reponse" required>
      <label>Taux de tolérance (%) :</label>
      <input type="number" id="tolerance" value="0">
    `;
  }

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Ajouter la question';
  form.appendChild(submitButton);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const enonce = document.getElementById('enonce').value;
    const note = parseFloat(document.getElementById('note').value);
    const duree = parseInt(document.getElementById('duree').value);
    const mediaFile = document.getElementById('media').files[0];
    const media = mediaFile ? mediaFile.name : null;

    let question = { type, enonce, note, duree, media };

    if (type === 'qcm') {
      const options = document.getElementById('options').value.split(';').map(o => o.trim());
      const correct = document.getElementById('correct').value.split(',').map(i => parseInt(i.trim()));
      question.options = options;
      question.correct = correct;
    } else if (type === 'direct') {
      const reponse = document.getElementById('reponse').value;
      const tolerance = parseFloat(document.getElementById('tolerance').value);
      question.reponse = reponse;
      question.tolerance = tolerance;
    }

    const exam = JSON.parse(localStorage.getItem('currentExam'));
    exam.questions.push(question);
    localStorage.setItem('currentExam', JSON.stringify(exam));
    updateQuestionList();
    container.innerHTML = '';
  });

  container.appendChild(form);
}


function updateQuestionList() {
  const exam = JSON.parse(localStorage.getItem('currentExam'));
  const list = document.getElementById('question-list');
  list.innerHTML = '';

  exam.questions.forEach((q, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${q.enonce} (${q.type.toUpperCase()}) - Note: ${q.note}, Durée: ${q.duree}s`;
    list.appendChild(li);
  });
}


document.getElementById('save-exam').addEventListener('click', async () => {
  const currentExam = JSON.parse(localStorage.getItem('currentExam'));
  if (!currentExam || currentExam.questions.length === 0) {
    alert("Ajoutez au moins une question avant d'enregistrer.");
    return;
  }

 
  let exams = JSON.parse(localStorage.getItem('exams')) || [];
  exams.push(currentExam);
  localStorage.setItem('exams', JSON.stringify(exams));

  try {
    const response = await fetch('http://localhost:3000/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentExam)
    });

    if (!response.ok) throw new Error("Erreur serveur");

    alert("Examen enregistré sur le serveur !");
    localStorage.removeItem('currentExam');
    window.location.href = 'mes_examens.html';
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'enregistrement.");
  }
});


function displayExams() {
  const exams = JSON.parse(localStorage.getItem('exams')) || [];
  const examList = document.getElementById('exam-list');
  examList.innerHTML = '';

  exams.forEach((exam, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${exam.title}</strong> - ${exam.publicTarget} <br> <a href="${exam.link}" target="_blank">${exam.link}</a>`;
    examList.appendChild(li);
  });
}

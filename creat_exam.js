document.getElementById('exam-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const publicTarget = document.getElementById('public').value;

  // Simuler la génération d'un lien unique
  const uniqueLink = `https://examplatform.com/exam/${Date.now()}`;
  document.getElementById('link').value = uniqueLink;
  document.getElementById('exam-link').classList.remove('hidden');
  document.getElementById('question-section').classList.remove('hidden');

  // Stocker les informations de l'examen (peut être adapté pour un backend)
  localStorage.setItem('currentExam', JSON.stringify({ title, description, publicTarget, link: uniqueLink, questions: [] }));
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

  const enonceLabel = document.createElement('label');
  enonceLabel.textContent = 'Énoncé de la question :';
  const enonceInput = document.createElement('textarea');
  enonceInput.id = 'enonce';
  enonceInput.required = true;

  const mediaLabel = document.createElement('label');
  mediaLabel.textContent = 'Joindre un média (image, audio, vidéo) :';
  const mediaInput = document.createElement('input');
  mediaInput.type = 'file';
  mediaInput.id = 'media';

  const noteLabel = document.createElement('label');
  noteLabel.textContent = 'Note pour cette question :';
  const noteInput = document.createElement('input');
  noteInput.type = 'number';
  noteInput.id = 'note';
  noteInput.required = true;

  const dureeLabel = document.createElement('label');
  dureeLabel.textContent = 'Durée (en secondes) :';
  const dureeInput = document.createElement('input');
  dureeInput.type = 'number';
  dureeInput.id = 'duree';
  dureeInput.required = true;

  form.appendChild(enonceLabel);
  form.appendChild(enonceInput);
  form.appendChild(mediaLabel);
  form.appendChild(mediaInput);
  form.appendChild(noteLabel);
  form.appendChild(noteInput);
  form.appendChild(dureeLabel);
  form.appendChild(dureeInput);

  if (type === 'qcm') {
    const optionsLabel = document.createElement('label');
    optionsLabel.textContent = 'Options (séparez par des points-virgules) :';
    const optionsInput = document.createElement('input');
    optionsInput.type = 'text';
    optionsInput.id = 'options';
    optionsInput.required = true;

    const correctLabel = document.createElement('label');
    correctLabel.textContent = 'Réponses correctes (indices des options, séparés par des virgules) :';
    const correctInput = document.createElement('input');
    correctInput.type = 'text';
    correctInput.id = 'correct';
    correctInput.required = true;

    form.appendChild(optionsLabel);
    form.appendChild(optionsInput);
    form.appendChild(correctLabel);
    form.appendChild(correctInput);
  } else if (type === 'direct') {
    const reponseLabel = document.createElement('label');
    reponseLabel.textContent = 'Réponse attendue :';
    const reponseInput = document.createElement('input');
    reponseInput.type = 'text';
    reponseInput.id = 'reponse';
    reponseInput.required = true;

    const toleranceLabel = document.createElement('label');
    toleranceLabel.textContent = 'Taux de tolérance (%) :';
    const toleranceInput = document.createElement('input');
    toleranceInput.type = 'number';
    toleranceInput.id = 'tolerance';
    toleranceInput.value = 0;

    form.appendChild(reponseLabel);
    form.appendChild(reponseInput);
    form.appendChild(toleranceLabel);
    form.appendChild(toleranceInput);
  }

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Ajouter la question';
  form.appendChild(submitButton);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const enonce = enonceInput.value;
    const note = parseFloat(noteInput.value);
    const duree = parseInt(dureeInput.value);
    const media = mediaInput.files[0] ? mediaInput.files[0].name : null;

    let question = { type, enonce, note, duree, media };

    if (type === 'qcm') {
      const options = document.getElementById('options').value.split(';').map(opt => opt.trim());
      const correct = document.getElementById('correct').value.split(',').map(idx => parseInt(idx.trim()));
      question.options = options;
      question.correct = correct;
    } else if (type === 'direct') {
      const reponse = document.getElementById('reponse').value;
      const tolerance = parseFloat(document.getElementById('tolerance').value);
      question.reponse = reponse;
      question.tolerance = tolerance;
    }

    // Ajouter la question à l'examen en cours
    const exam = JSON.parse(localStorage.getItem('currentExam'));
    exam.questions.push(question);
    localStorage.setItem('currentExam', JSON.stringify(exam));

    // Mettre à jour la liste des questions
    updateQuestionList();

    // Réinitialiser le formulaire
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


const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');  
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

const dbPath = path.join(__dirname, 'db.json');


function readExams() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function saveExams(exams) {
  fs.writeFileSync(dbPath, JSON.stringify(exams, null, 2));
}
app.use(express.static(path.join(__dirname, '../frontend')));
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;

  if (
    (email === 'test@example.com' && password === '1234' && role === 'etudiant') ||
    (email === 'prof@example.com' && password === 'abcd' && role === 'enseignant')
  ) {
    return res.json({ token: 'abc123' });
  }

  res.status(401).json({ message: 'Identifiants ou rôle incorrects' });
});

/*app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'test@example.com' && password === '1234') {
    return res.json({ token: 'abc123' });
  }

  res.status(401).json({ message: 'Identifiants invalides' });
});*/

app.post('/api/exams', (req, res) => {
  const exams = readExams();
  const newExam = { id: crypto.randomUUID(), ...req.body };
  exams.push(newExam);
  saveExams(exams);
  res.status(201).json(newExam);
});

app.get('/api/exams', (req, res) => {
  const exams = readExams();
  res.json(exams);
});


app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});







document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!role) {
      document.getElementById('error-message').textContent = 'Veuillez sélectionner un rôle.';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', role);

       
        if (role === 'etudiant') {
          window.location.href = 'exam.html';
        } else if (role === 'enseignant') {
          window.location.href = 'creat_exam.html';
        }
      } else {
        document.getElementById('error-message').textContent = data.message || 'Erreur de connexion';
      }
    } catch (err) {
      console.error('Erreur de connexion au serveur', err);
      document.getElementById('error-message').textContent = 'Erreur de connexion au serveur';
    }
  });
});




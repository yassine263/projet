document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        window.location.href = 'exam.html'; 
      } else {
        document.getElementById('error-message').textContent = data.message || 'Erreur de connexion';
      }
    } catch (err) {
      console.error('Erreur de connexion au serveur', err);
      document.getElementById('error-message').textContent = 'Erreur de connexion au serveur';
    }
  });
});



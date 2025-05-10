document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem('token', data.token); 
      window.location.href = '/dashboard.html'; 
    } else {
      document.getElementById('error-message').textContent = data.message || 'Erreur de connexion';
      setTimeout(() => {
      window.location.href = "login.html"; 
      }, 1000);
    }
  });

  
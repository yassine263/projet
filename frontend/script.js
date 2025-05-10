document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const data = new FormData(this);
    const values = Object.fromEntries(data.entries());
  
    console.log("Form data:", values);
  
    
    alert("Inscription réussie !");
    setTimeout(() => {
    window.location.href = "login.html"; 
    }, 1000);

    

  });
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    birthdate: document.getElementById("birthdate").value,
    gender: document.getElementById("gender").value,
    school: document.getElementById("school").value,
    field: document.getElementById("field").value,
    role: document.getElementById("role").value
  };

  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    alert("Inscription réussie !");
    window.location.href = "login.html"; 
  } else {
    const error = await response.json();
    alert("Erreur : " + (error.message || "Échec de l'inscription"));
  }
});















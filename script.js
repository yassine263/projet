document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const data = new FormData(this);
    const values = Object.fromEntries(data.entries());
  
    console.log("Form data:", values);
  
    
    alert("Inscription réussie!");
  });  












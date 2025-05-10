document.addEventListener("DOMContentLoaded", async function () {
  const examForm = document.getElementById("examForm");
  const examListBody = document.getElementById("examListBody");
  const accessLink = document.getElementById("accessLink");

 
  const response = await fetch("http://localhost:3000/api/exams");
  const examList = await response.json();
  renderExamList(examList);

  examForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("examTitle").value;
    const description = document.getElementById("examDescription").value;
    const audience = document.getElementById("examAudience").value;
    const duration = document.getElementById("examDuration").value;
    const grade = document.getElementById("examGrade").value;

    if (!title || !description || !audience || !duration || !grade) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, audience, duration, grade })
    });

    const newExam = await response.json();

    accessLink.href = `exam.html?examId=${newExam.id}`;
    accessLink.textContent = accessLink.href;
    accessLink.target = "_blank";

    renderExamList([newExam], true);
    examForm.reset();
  });

  function renderExamList(exams, append = false) {
    exams.forEach((exam, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${exam.title}</td>
        <td>${exam.description}</td>
        <td>${exam.audience}</td>
        <td>${exam.duration} min</td>
        <td>${exam.grade}</td>
        <td><a href="add_question.html?examId=${exam.id}" class="btn">Ajouter des questions</a></td>
      `;
      if (append) {
        examListBody.appendChild(row);
      } else {
        examListBody.innerHTML += row.outerHTML;
      }
    });
  }
});

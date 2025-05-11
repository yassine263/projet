
document.addEventListener('DOMContentLoaded', () => {
  const examList = document.getElementById('exam-list');
  const noExamMessage = document.getElementById('no-exam');

  const exams = JSON.parse(localStorage.getItem('exams')) || [];

  if (exams.length === 0) {
    noExamMessage.classList.remove('hidden');
    return;
  }

  exams.forEach((exam, index) => {
    const li = document.createElement('li');

    const title = document.createElement('h3');
    title.textContent = exam.title;

    const desc = document.createElement('p');
    desc.textContent = exam.description;

    const link = document.createElement('a');
    link.href = exam.link;
    link.target = "_blank";
    link.textContent = "Accéder à l'examen";

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(link);

    examList.appendChild(li);
  });
});
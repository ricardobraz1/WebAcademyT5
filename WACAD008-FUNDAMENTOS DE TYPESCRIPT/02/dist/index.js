// scripts/index.ts
import { Class } from './models';
const classList = [];
let classCounter = 0;
document.addEventListener('DOMContentLoaded', () => {
    const classForm = document.getElementById('class-form');
    const classListElement = document.getElementById('class-list');
    // Criar turma
    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const className = document.getElementById('class-name').value;
        if (className) {
            const newClass = new Class(classCounter++, className);
            classList.push(newClass);
            displayClasses();
            classForm.reset();
        }
    });
    // Exibir turmas
    function displayClasses() {
        classListElement.innerHTML = '';
        classList.forEach((classItem) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = classItem.name;
            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-primary btn-sm';
            viewButton.textContent = 'Visualizar';
            viewButton.addEventListener('click', () => {
                window.location.href = `home.html?classId=${classItem.id}`;
            });
            li.appendChild(viewButton);
            classListElement.appendChild(li);
        });
    }
    // Carregar turmas existentes (se necessário)
    displayClasses();
});

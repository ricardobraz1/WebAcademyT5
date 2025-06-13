"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Classroom {
    constructor() {
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
        this.updateStatistics();
    }
    removeStudent(id) {
        this.students = this.students.filter((student) => student.id !== id);
        this.updateStatistics();
    }
    editStudent(id, updatedStudent) {
        const index = this.students.findIndex((student) => student.id === id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.updateStatistics();
        }
    }
    getNumStudents() {
        return this.students.length;
    }
    getAverageAge() {
        return this.students.reduce((acc, student) => acc + student.age, 0) / this.getNumStudents();
    }
    getAverageHeight() {
        return this.students.reduce((acc, student) => acc + student.height, 0) / this.getNumStudents();
    }
    getAverageWeight() {
        return this.students.reduce((acc, student) => acc + student.weight, 0) / this.getNumStudents();
    }
    updateStatistics() {
        document.getElementById('num-students').textContent = this.getNumStudents().toString();
        document.getElementById('average-age').textContent = this.getAverageAge().toFixed(2);
        document.getElementById('average-height').textContent = this.getAverageHeight().toFixed(2);
        document.getElementById('average-weight').textContent = this.getAverageWeight().toFixed(2);
    }
}
const classroom = new Classroom();
function addNewStudent() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (name && age && height && weight) {
        const newStudent = {
            id: Date.now(),
            name: name,
            age: age,
            height: height,
            weight: weight
        };
        classroom.addStudent(newStudent);
        renderStudents();
    }
}
function generateRandomStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://randomuser.me/api/');
            const data = yield response.json();
            const user = data.results[0];
            const name = `${user.name.first} ${user.name.last}`;
            const age = user.dob.age;
            const height = Math.floor(Math.random() * (200 - 150 + 1)) + 150; // Gera uma altura aleatória entre 150 e 200 cm
            const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Gera um peso aleatório entre 50 e 100 kg
            const randomStudent = {
                id: Date.now(),
                name: name,
                age: age,
                height: height,
                weight: weight
            };
            fillStudentForm(randomStudent);
        }
        catch (error) {
            console.error('Erro ao gerar aluno:', error);
        }
    });
}
function renderStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    classroom.students.forEach((student) => {
        const studentRow = document.createElement('tr');
        // Coluna de Nome
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        studentRow.appendChild(nameCell);
        // Coluna de Idade
        const ageCell = document.createElement('td');
        ageCell.textContent = student.age.toString();
        studentRow.appendChild(ageCell);
        // Coluna de Altura
        const heightCell = document.createElement('td');
        heightCell.textContent = student.height.toString();
        studentRow.appendChild(heightCell);
        // Coluna de Peso
        const weightCell = document.createElement('td');
        weightCell.textContent = student.weight.toString();
        studentRow.appendChild(weightCell);
        // Coluna de Ações (Editar e Remover)
        const actionCell = document.createElement('td');
        // Botão de Editar
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mr-2');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            fillStudentForm(student);
        };
        actionCell.appendChild(editButton);
        // Botão de Remover
        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-sm', 'btn-danger');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            classroom.removeStudent(student.id);
            renderStudents();
        };
        actionCell.appendChild(removeButton);
        studentRow.appendChild(actionCell);
        studentList.appendChild(studentRow);
    });
}
function fillStudentForm(student) {
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age.toString();
    document.getElementById('height').value = student.height.toString();
    document.getElementById('weight').value = student.weight.toString();
    const saveButton = document.getElementById('save-btn');
    saveButton.onclick = () => {
        const updatedStudent = {
            id: student.id,
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value)
        };
        classroom.editStudent(student.id, updatedStudent);
        renderStudents();
        resetForm();
    };
}
function resetForm() {
    document.getElementById('student-form').reset();
}
const studentForm = document.getElementById('student-form');
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewStudent();
    studentForm.reset();
});
const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', generateRandomStudent);
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    logoutUser();
});
const userNameDisplay = document.getElementById('user-name');
if (isAuthenticated()) {
    const userName = getUser();
    userNameDisplay.textContent = `Olá, ${userName}`;
}
else {
    window.location.href = '../pages/login.html';
}
classroom.updateStatistics();

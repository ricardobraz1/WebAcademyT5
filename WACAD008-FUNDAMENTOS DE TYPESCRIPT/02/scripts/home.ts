interface Student {
    id: number;
    name: string;
    age: number;
    height: number;
    weight: number;
}

class Classroom {
    students: Student[] = [];

    addStudent(student: Student) {
        this.students.push(student);
        this.updateStatistics();
    }

    removeStudent(id: number) {
        this.students = this.students.filter((student) => student.id !== id);
        this.updateStatistics();
    }

    editStudent(id: number, updatedStudent: Student) {
        const index = this.students.findIndex((student) => student.id === id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.updateStatistics();
        }
    }

    getNumStudents(): number {
        return this.students.length;
    }

    getAverageAge(): number {
        return this.students.reduce((acc, student) => acc + student.age, 0) / this.getNumStudents();
    }

    getAverageHeight(): number {
        return this.students.reduce((acc, student) => acc + student.height, 0) / this.getNumStudents();
    }

    getAverageWeight(): number {
        return this.students.reduce((acc, student) => acc + student.weight, 0) / this.getNumStudents();
    }

    updateStatistics() {
        (document.getElementById('num-students') as HTMLElement).textContent = this.getNumStudents().toString();
        (document.getElementById('average-age') as HTMLElement).textContent = this.getAverageAge().toFixed(2);
        (document.getElementById('average-height') as HTMLElement).textContent = this.getAverageHeight().toFixed(2);
        (document.getElementById('average-weight') as HTMLElement).textContent = this.getAverageWeight().toFixed(2);
    }
}

const classroom = new Classroom();

function addNewStudent() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const age = parseInt((document.getElementById('age') as HTMLInputElement).value);
    const height = parseFloat((document.getElementById('height') as HTMLInputElement).value);
    const weight = parseFloat((document.getElementById('weight') as HTMLInputElement).value);

    if (name && age && height && weight) {
        const newStudent: Student = {
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

async function generateRandomStudent() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        
        const name = `${user.name.first} ${user.name.last}`;
        const age = user.dob.age;
        const height = Math.floor(Math.random() * (200 - 150 + 1)) + 150; // Gera uma altura aleatória entre 150 e 200 cm
        const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Gera um peso aleatório entre 50 e 100 kg

        const randomStudent: Student = {
            id: Date.now(),
            name: name,
            age: age,
            height: height,
            weight: weight
        };

        fillStudentForm(randomStudent);
    } catch (error) {
        console.error('Erro ao gerar aluno:', error);
    }
}

function renderStudents() {
    const studentList = document.getElementById('student-list') as HTMLElement;
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

function fillStudentForm(student: Student) {
    (document.getElementById('name') as HTMLInputElement).value = student.name;
    (document.getElementById('age') as HTMLInputElement).value = student.age.toString();
    (document.getElementById('height') as HTMLInputElement).value = student.height.toString();
    (document.getElementById('weight') as HTMLInputElement).value = student.weight.toString();

    const saveButton = document.getElementById('save-btn') as HTMLButtonElement;
    saveButton.onclick = () => {
        const updatedStudent: Student = {
            id: student.id,
            name: (document.getElementById('name') as HTMLInputElement).value,
            age: parseInt((document.getElementById('age') as HTMLInputElement).value),
            height: parseFloat((document.getElementById('height') as HTMLInputElement).value),
            weight: parseFloat((document.getElementById('weight') as HTMLInputElement).value)
        };

        classroom.editStudent(student.id, updatedStudent);
        renderStudents();
        resetForm();
    };
}

function resetForm() {
    (document.getElementById('student-form') as HTMLFormElement).reset();
}

const studentForm = document.getElementById('student-form') as HTMLFormElement;
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewStudent();
    studentForm.reset();
});

const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
generateBtn.addEventListener('click', generateRandomStudent);

const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
logoutBtn.addEventListener('click', () => {
    logoutUser();
});

const userNameDisplay = document.getElementById('user-name') as HTMLElement;
if (isAuthenticated()) {
    const userName = getUser();
    userNameDisplay.textContent = `Olá, ${userName}`;
} else {
    window.location.href = '../pages/login.html';
}

classroom.updateStatistics();

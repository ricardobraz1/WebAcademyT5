// scripts/models.ts
export class Student {
    constructor(id, name, age, height, weight) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
}
export class Class {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    removeStudent(studentId) {
        this.students = this.students.filter((student) => student.id !== studentId);
    }
    editStudent(updatedStudent) {
        const index = this.students.findIndex((student) => student.id === updatedStudent.id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
        }
    }
    getStudents() {
        return this.students;
    }
    getNumStudents() {
        return this.students.length;
    }
    getAverageAge() {
        return this.students.reduce((sum, student) => sum + student.age, 0) / this.getNumStudents();
    }
    getAverageHeight() {
        return this.students.reduce((sum, student) => sum + student.height, 0) / this.getNumStudents();
    }
    getAverageWeight() {
        return this.students.reduce((sum, student) => sum + student.weight, 0) / this.getNumStudents();
    }
}

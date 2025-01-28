interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "Yona",
    lastName: "Rose",
    age: 16,
    location: "Lille",
}

const student2: Student = {
    firstName: "John",
    lastName: "Cross",
    age: 20,
    location: "Lille",
}

let studentsList: Student[] = [student1, student2]

const table = document.createElement('table');
const tbody = document.createElement('tbody')

studentsList.forEach((student) => {
    const tr = document.createElement('tr');

    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = student.firstName;
    tr.append(tdFirstName);

    const tdLocation = document.createElement('td');
    tdLocation.textContent = student.location;
    tr.append(tdLocation);

    tbody.append(tr);
})

table.append(tbody);
document.body.append(table);

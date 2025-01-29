/* Task 5 */
interface DirectorInterface {
    workOnHomework(): string;
    getCoffeeBreak(): string;
    workDirectorTasks(): string;
}

interface TeacherInterface {
    workOnHomework(): string;
    getCoffeeBreak(): string;
    workTeacherTasks(): string;
}

class Director implements DirectorInterface {
    workOnHomework(): string {
        return "Working from home";
    }
    getCoffeeBreak(): string {
        return "Getting a coffee break";
    }
    workDirectorTasks(): string {
        return "Getting to director tasks";
    }
}

class Teacher implements TeacherInterface {
    workOnHomework(): string {
        return "Cannot work from home";
    }
    getCoffeeBreak(): string {
        return "Cannot have a break";
    }
    workTeacherTasks(): string {
        return "Getting to work";
    }
}

function createEmployee(salary: number | string): Director | Teacher {
    if (typeof salary === 'number' && salary < 500) {
        return new Teacher();
    } else {
        return new Director();
    }
}

console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee('$500'));

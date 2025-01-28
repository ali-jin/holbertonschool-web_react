/* Task 1 */
interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;
    [propName: string]: any;
}

/* Task 2 */
interface Directors extends Teacher {
    numberOfReports: number;
}

/* Task 3 */
interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

function printFullName(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}. ${lastName}`;
}

export const printTeacher: printTeacherFunction = printFullName;

/* Task 4 */
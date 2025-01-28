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


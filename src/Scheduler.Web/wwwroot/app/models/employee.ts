import { Position }             from '../models/schedule';

export class EmployeeList {
    availablePositions: Position[];
    employees: Employee[];
}

export class Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
    phoneNumber: string;
    isActive: boolean;

    employeePositionIds: number[];
}


export class CreateEmployeeAccess {
    phoneNumber: string;
    employeeId: number;
    password: string;
}

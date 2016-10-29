export class EmployeeSchedule {
    startDate: Date;
    endDate: Date;
    availableShifts: ShiftDisplay[];
    availableEmployees: EmployeeDisplay[];
    employeeShifts: EmployeeShift[];
}

export class EmployeeShift {
    employeeId: number;
    shiftId: number;
}

export class ShiftDisplay {
    shiftId: number;
    positionId: number;
    positionName: string;
    positionCategory: string;
    shiftDay: string;
    shiftTime: string;
}

export class EmployeeDisplay {
    employeeId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    positionIds: number[];
}

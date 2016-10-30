﻿export class EmployeeSchedule {
    startDate: Date;
    endDate: Date;
    shifts: ShiftDisplay[];
    employees: EmployeeDisplay[];
    employeeShifts: EmployeeShift[];
    positionCategories: string[];
}

export class EmployeeShift {
    employeeShiftId: number;
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
    shiftStartMinute: number;
    shiftEndMinute: number;
}

export class EmployeeDisplay {
    employeeId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    positionIds: number[];
}

export class AddEmployeeShift {
    employeeId: number;
    shiftId: number;
    shiftDate: Date;
}

export class CancelEmployeeShift {
    employeeShiftId: number;
    reason: string;
}


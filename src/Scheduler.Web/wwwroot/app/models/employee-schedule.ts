﻿export class EmployeeSchedule {
    startDate: Date;
    endDate: Date;
    shifts: ShiftDisplay[];
    employees: EmployeeDisplay[];
    employeeShifts: EmployeeShift[];
    employeeConflicts: EmployeeConflict[];
    positionCategories: string[];
}

export class EmployeeShift {
    employeeShiftId: number;
    employeeId: number;
    shiftId: number;
    canceled: boolean;
    reason: string;
    shiftStartTime: Date;
    shiftEndTime: Date;
    adjustedStartTime: Date;
    adjustedEndTime: Date;
    localShiftStartTime: Date;
    localShiftEndTime: Date;
    localAdjustedStartTime: Date;
    localAdjustedEndTime: Date;
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
    conflictSummary?: string;
    conflicts?: EmployeeConflict[];
    positionIds: number[];
}

export class AddEmployeeShift {
    employeeId: number;
    shiftId: number;
    shiftDate: Date;
}

export class CopyWeek {
    startDate: Date;
}

export class CopyDay {
    scheduleDate: Date;
    fromDay: string;
}

export class SendSMS {
    scheduleDate: Date;
}

export class ModifyEmployeeShift {
    employeeShiftId: number;
    startTime: Date;
    endTime: Date;
}

export class CancelEmployeeShift {
    employeeShiftId: number;
    reason: string;
}

export class EmployeeDetails {
    organizationId: number;
    organizationMessage: string;
    employeeName: string;
    employeeDetails: string;
    conflicts: EmployeeConflict[];
    shifts: EmployeeShiftDisplay[];
}

export class EmployeeConflict {
    employeeConflictId: number;
    employeeId: number;
    conflictDate: Date;
    startHour: number;
    endHour: number;
    reason: string;
}

export class EmployeeShiftDisplay {
    employeeShiftId: number;
    shiftId: number;
    positionName: string;
    positionCategory: string;
    shiftStartTime: string;
    shiftEndTime: string;
    cancelled: boolean;
    cancelReason: string;
}
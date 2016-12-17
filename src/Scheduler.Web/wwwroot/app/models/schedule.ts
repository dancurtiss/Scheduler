export class Schedule {
    scheduleId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}

export class ScheduleDetails {
    organizationId: number;
    scheduleId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    shifts: Shift[];
    positions: Position[];
}

export class Shift {
    shiftId: number;
    day: string;
    startTime: Date;
    startTimeDisplay?: string;
    endTime: Date;
    endTimeDisplay?: string;
    positionId: number;
}

export class Position {
    positionId: number;
    name: string;
    category: string;
}

export class SelectedPosition extends Position {
    checked: boolean;
}



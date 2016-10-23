export class Schedule {
    scheduleId: number;
    name: string;
}

export class ScheduleDetails {
    scheduleId: number;
    name: string;
    shifts: Shift[];
    positions: Position[];
}

export class Shift {
    shiftId: number;
    startTime: string;
    endTime: string;
    positionId: number;
}

export class Position {
    positionId: number;
    name: string;
    category: string;
}


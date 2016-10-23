export class Schedule {
    scheduleId: number;
    name: string;
    shifts: Shift[];
}

export class Shift {
    shiftId: number;
    startTime: string;
    endTime: string;
    positions: Position[];
}

export class Position {
    positionId: number;
    name: string;
    category: string;
}


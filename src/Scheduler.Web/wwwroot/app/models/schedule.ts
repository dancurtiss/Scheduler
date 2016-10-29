﻿export class Schedule {
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
    day: string;
    startHour: number;
    startMinute: number;
    isStartAM: boolean;
    endHour: number;
    endMinute: number;
    isEndAM: boolean;
    positionId: number;
}

export class Position {
    positionId: number;
    name: string;
    category: string;
}

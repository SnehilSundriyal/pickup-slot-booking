export interface Slot {
    id: number;
    label: string;
    date: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    bookedCount: number;
    available: number;
    blocked: boolean;
}
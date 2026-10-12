export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';

export interface Reservation {
    id: string;
    workshopId: string;
    userName: string;
    userEmail: string;
    date: string;
    time: string;
    guests: number;
    totalPrice: number;
    status: ReservationStatus;
    rejectReason?: string;
    createdAt: string;
}

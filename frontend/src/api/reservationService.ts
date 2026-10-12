import { Reservation, ReservationStatus } from '@/types/reservation';

const RESERVATIONS_KEY = 'HONG_CRAFT_DAY_RESERVATIONS';

export const reservationService = {
    // 모든 예약 가져오기 (사용자용)
    getUserReservations: (): Reservation[] => {
        const saved = localStorage.getItem(RESERVATIONS_KEY);
        if (!saved) return [];
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse reservations', e);
            return [];
        }
    },

    // 예약 추가하기
    addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
        const reservations = reservationService.getUserReservations();
        const newReservation: Reservation = {
            ...reservation,
            id: `res-${Date.now()}`,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        };
        
        const updated = [newReservation, ...reservations];
        localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
        
        // 특정 공방별 예약 목록에도 동기화 (관리자용 페이지 호환)
        const wsKey = `RESERVATIONS_${reservation.workshopId}`;
        const wsSaved = localStorage.getItem(wsKey);
        const wsReservations = wsSaved ? JSON.parse(wsSaved) : [];
        localStorage.setItem(wsKey, JSON.stringify([newReservation, ...wsReservations]));

        return newReservation;
    },

    // 예약 취소하기 (사용자용)
    cancelReservation: (id: string): void => {
        const reservations = reservationService.getUserReservations();
        const updated = reservations.map(res => 
            res.id === id ? { ...res, status: 'REJECTED' as ReservationStatus, rejectReason: '사용자 취소' } : res
        );
        localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    }
};

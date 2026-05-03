import api from '../api';

const reservationServices = {
    approveReservation : async (id) => {
            const response = await api.put(`/reservations/${id}/approve`);
            return response.data;
    },

    refuseReservation : async (id) => {
        const response = await api.put(`/reservations/${id}/refuse`);
        return response.data;
    },

    getMyReservations : async () => {
        const response = await api.get(`/reservations/promoteur`);
        return response.data;
    }
}

export default reservationServices;
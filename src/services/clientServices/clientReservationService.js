import api from '../api';

const clientReservationService = {
    createReservation: async (id) => {
        const response = await api.post(`/reservations/${id}`);
        return response.data;
    },

    getMyReservation: async () => {
        const response = await api.get(`/reservations/my`);
        return response.data;
    }

}

export default clientReservationService;
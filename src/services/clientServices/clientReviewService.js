import api from './api';

const clientReviewService = {
    createReview: async(projectId, stars) => {
        const response = await api.post(`/reviews/${projectId}`, {stars});
        return response.data;
    }
}

export default clientReviewService;
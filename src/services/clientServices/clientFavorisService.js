import api from './api';

const clientFavorisService = {
    addFavoris: async (projectId) => {
        const response = await api.post('/favoris', {projectId});
        return response.data;
    },
    
    getMyFavoris: async () => {
        const response = await api.get('/favoris');
        return response.data;
    },

    removeFavoris: async (projectId) => {
        const response = await api.delete(`/favoris/${projectId}`);
        return response.data;
    }

}

export default clientFavorisService;
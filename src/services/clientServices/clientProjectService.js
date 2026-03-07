import api from './api';

const clientProjectService = {
    getAllProjects : async () => {
        const response = await api.get('/client-projects');
        return response.data;
    },

    getProjectById: async (id) => {
        const response = api.get(`/client-projects/${id}`);
        return response.data;
    }
}

export default clientProjectService;
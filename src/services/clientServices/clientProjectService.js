import api from '../api';

const clientProjectService = {
    getAllProjects : async () => {
        const response = await api.get('/client-projects');
        return response.data;
    },

    getProjectById: async (id) => {
        const response = await api.get(`/client-projects/${id}`);
        console.log('data of a project ',response.data);
        return response.data;
    }
}

export default clientProjectService;